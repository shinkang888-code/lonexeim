const { app, BrowserWindow, Menu, shell, session, nativeImage, Tray, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const { registerLicenseIpc, ensureLicensedStartup } = require('./license/licenseManager');
const { replaceLegacyGrendPaths } = require('./lib/path-alias');

registerLicenseIpc(ipcMain, 'CDMS');

// ── Config ──
const APP_NAME = 'LONEX CDMS';
const API_HOST = replaceLegacyGrendPaths(
  process.env.LONEX_API_HOST || (process.env.NODE_ENV === 'development' ? 'dx.lonex.kr' : 'x.lonex.kr')
);
const API_ORIGIN = `https://${API_HOST}`;
const LOCAL_PORT = 14837; // 로컬 서버 포트 (충돌 가능성 낮은 번호)
const STATIC_DIR = path.join(__dirname, 'app'); // Vite build 결과물

let mainWindow = null;
let tray = null;
let localServer = null;

// ══════════════════════════════════════════════════
// ── 로컬 HTTP 서버 (정적 파일 + API 프록시) ──
// ══════════════════════════════════════════════════

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.apk': 'application/vnd.android.package-archive',
  '.exe': 'application/x-msdownload',
};

function startLocalServer() {
  return new Promise((resolve) => {
    localServer = http.createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${LOCAL_PORT}`);

      // ── /API/* → 원격 서버로 프록시 ──
      if (url.pathname.startsWith('/API/')) {
        proxyToRemote(req, res, url);
        return;
      }
      // ── /s3/* /core/* → 원격 서버로 프록시 ──
      if (url.pathname.startsWith('/s3/') || url.pathname.startsWith('/core/')) {
        proxyToRemote(req, res, url);
        return;
      }
      // ── /downloads/* → 원격 서버로 프록시 ──
      if (url.pathname.startsWith('/downloads/')) {
        proxyToRemote(req, res, url);
        return;
      }

      // ── 정적 파일 서빙 ──
      serveStatic(res, url.pathname);
    });

    localServer.listen(LOCAL_PORT, '127.0.0.1', () => {
      console.log(`[CDMS] Local server: http://127.0.0.1:${LOCAL_PORT}`);
      resolve(LOCAL_PORT);
    });
  });
}

function serveStatic(res, pathname) {
  let filePath = path.join(STATIC_DIR, pathname);

  // SPA 폴백: 파일이 없으면 index.html (React Router)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(STATIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    res.writeHead(404);
    res.end('Not Found');
  });
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': contentType });
    stream.pipe(res);
  });
}

function proxyToRemote(clientReq, clientRes, url) {
  const options = {
    method: clientReq.method,
    hostname: API_HOST,
    port: 443,
    path: `${url.pathname}${url.search || ''}`,
    headers: { ...clientReq.headers, host: API_HOST },
    rejectAuthorized: false, // 자체서명 인증서 허용
  };

  const proxyReq = https.request(options, (proxyRes) => {
    // Set-Cookie 도메인 재작성: .lonex.kr → 제거 (localhost에서 작동하도록)
    const headers = { ...proxyRes.headers };
    if (headers['set-cookie']) {
      headers['set-cookie'] = (Array.isArray(headers['set-cookie']) ? headers['set-cookie'] : [headers['set-cookie']])
        .map(c => c
          .replace(/;\s*Domain=[^;]*/gi, '')   // Domain 제거
          .replace(/;\s*Secure/gi, '')          // Secure 제거 (HTTP라서)
          .replace(/;\s*SameSite=[^;]*/gi, '')  // SameSite 제거
        );
    }
    clientRes.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(clientRes);
  });

  proxyReq.on('error', (err) => {
    console.error('[CDMS] Proxy error:', err.message);
    if (!clientRes.headersSent) {
      clientRes.writeHead(502);
      clientRes.end('Proxy Error');
    }
  });

  // 요청 본문 스트리밍 (POST, 대용량 업로드 지원)
  clientReq.pipe(proxyReq);
}

// ══════════════════════════════════════════════════
// ── Electron Window ──
// ══════════════════════════════════════════════════

function createWindow() {
  const iconPath = path.join(__dirname, 'assets', 'icon.ico');

  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1024,
    minHeight: 700,
    title: APP_NAME,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      devTools: !app.isPackaged,
    },
    show: false,
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadURL(`http://127.0.0.1:${LOCAL_PORT}/cdms`);

  // 외부 링크 → 기본 브라우저
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(`http://127.0.0.1:${LOCAL_PORT}`)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(`http://127.0.0.1:${LOCAL_PORT}`)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // /dashboard로 이동 시 /cdms로 강제 리다이렉트
  mainWindow.webContents.on('did-navigate-in-page', (event, url) => {
    const u = new URL(url);
    if (u.pathname === '/dashboard' || u.pathname === '/dashboardQuitter' || u.pathname === '/') {
      mainWindow.loadURL(`http://127.0.0.1:${LOCAL_PORT}/cdms`);
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  // ── Tray ──
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  tray.setToolTip(APP_NAME);
  tray.on('click', () => {
    if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); }
  });

  // ── 메뉴 ──
  Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: APP_NAME,
    submenu: [
      { label: '새로고침', accelerator: 'CmdOrCtrl+R', click: () => mainWindow?.webContents.reload() },
      { label: '강제 새로고침', accelerator: 'CmdOrCtrl+Shift+R', click: () => mainWindow?.webContents.reloadIgnoringCache() },
      { type: 'separator' },
      { label: '뒤로', accelerator: 'Alt+Left', click: () => mainWindow?.webContents.canGoBack() && mainWindow.webContents.goBack() },
      { label: '앞으로', accelerator: 'Alt+Right', click: () => mainWindow?.webContents.canGoForward() && mainWindow.webContents.goForward() },
      { type: 'separator' },
      { label: '개발자 도구', accelerator: 'F12', click: () => mainWindow?.webContents.toggleDevTools() },
      { type: 'separator' },
      { label: '종료', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
    ],
  }]));
}

// ══════════════════════════════════════════════════
// ── Recording IPC ──
// ══════════════════════════════════════════════════

const fileStreams = {};
const recSessions = {};

ipcMain.on('recording:start', (event, { sessionId, sources }) => {
  const saveDir = path.join(app.getPath('videos'), 'LONEX-CDMS', sessionId);
  fs.mkdirSync(saveDir, { recursive: true });
  recSessions[sessionId] = { saveDir, startedAt: Date.now() };

  sources.forEach(sourceId => {
    const filePath = path.join(saveDir, `${sessionId}_${sourceId}.webm`);
    fileStreams[`${sessionId}_${sourceId}`] = fs.createWriteStream(filePath, { flags: 'a' });
  });

  event.reply('recording:started', { sessionId, saveDir });
});

ipcMain.on('recording:chunk', (event, { sessionId, sourceId, chunk }) => {
  const key = `${sessionId}_${sourceId}`;
  const stream = fileStreams[key];
  if (stream) stream.write(Buffer.from(chunk));
});

ipcMain.on('recording:stop', (event, { sessionId }) => {
  const sess = recSessions[sessionId];
  const files = {};

  Object.keys(fileStreams).forEach(key => {
    if (key.startsWith(sessionId + '_')) {
      fileStreams[key].end();
      const sourceId = key.replace(sessionId + '_', '');
      if (sess) files[sourceId] = path.join(sess.saveDir, `${sessionId}_${sourceId}.webm`);
      delete fileStreams[key];
    }
  });

  delete recSessions[sessionId];
  event.reply('recording:stopped', { sessionId, files });
});

ipcMain.handle('recording:listFiles', async (event, { sessionId }) => {
  const saveDir = path.join(app.getPath('videos'), 'LONEX-CDMS', sessionId);
  if (!fs.existsSync(saveDir)) return [];
  return fs.readdirSync(saveDir).map(f => ({
    name: f,
    path: path.join(saveDir, f),
    size: fs.statSync(path.join(saveDir, f)).size,
  }));
});

ipcMain.handle('recording:getFileBuffer', async (event, { filePath }) => {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath);
});

ipcMain.handle('recording:deleteFile', async (event, { filePath }) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  return true;
});

ipcMain.handle('recording:getSaveDir', async () => {
  const dir = path.join(app.getPath('videos'), 'LONEX-CDMS');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
});

ipcMain.handle('recording:listSessions', async () => {
  const baseDir = path.join(app.getPath('videos'), 'LONEX-CDMS');
  if (!fs.existsSync(baseDir)) return [];
  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const sessionDir = path.join(baseDir, d.name);
      const files = fs.readdirSync(sessionDir);
      const totalSize = files.reduce((sum, f) => sum + fs.statSync(path.join(sessionDir, f)).size, 0);
      return { sessionId: d.name, fileCount: files.length, totalSize };
    })
    .sort((a, b) => b.sessionId.localeCompare(a.sessionId));
});

// ══════════════════════════════════════════════════
// ── 권한 ──
// ══════════════════════════════════════════════════

app.on('ready', () => {
  const allowed = ['media', 'mediaKeySystem', 'geolocation', 'notifications'];
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(allowed.includes(perm)));
  session.defaultSession.setPermissionCheckHandler((wc, perm) => allowed.includes(perm));
});

// ── 앱 라이프사이클 ──
app.whenReady().then(async () => {
  const licensed = await ensureLicensedStartup('CDMS');
  if (!licensed) return;
  await startLocalServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (localServer) localServer.close();
  app.quit();
});
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
