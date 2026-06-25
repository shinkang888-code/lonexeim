const { app, BrowserWindow, Menu, shell, session, nativeImage, Tray, Notification, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const { registerLicenseIpc, ensureLicensedStartup } = require('./license/licenseManager');

registerLicenseIpc(ipcMain, 'ERP');

// ── Config ──
const APP_URL = 'https://x.lonex.kr';
const APP_NAME = 'LONEX';

let mainWindow = null;
let tray = null;
let unreadCount = 0;
let isQuitting = false;   // 트레이 상주: 진짜 종료(트레이 메뉴/Cmd+Q)와 창 닫기 구분

function createWindow() {
  const iconPath = path.join(__dirname, 'assets', 'icon.ico');

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: APP_NAME,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      partition: 'persist:lonexerp',
      backgroundThrottling: false,   // 트레이로 숨겨도 알림 WS/타이머가 정상 동작
      devTools: !app.isPackaged,
    },
    show: false,
  });

  // 자동시작(--hidden)으로 켜지면 트레이에만 상주(창 표시 안 함) → 알림은 계속 수신
  const startHidden = process.argv.includes('--hidden');
  mainWindow.once('ready-to-show', () => { if (!startHidden) mainWindow.show(); });
  mainWindow.loadURL(APP_URL);

  // 외부 링크 → 기본 브라우저
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(APP_URL)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(APP_URL) && !url.startsWith('https://x.lonex.kr')) {
      event.preventDefault(); shell.openExternal(url);
    }
  });

  // ── 페이지 로드 시 알림 WebSocket 주입 ──
  mainWindow.webContents.on('did-finish-load', () => {
    injectNotificationListener();
  });
  // SPA 내부 네비게이션 시에도 재주입
  mainWindow.webContents.on('did-navigate-in-page', () => {
    injectNotificationListener();
  });

  // ── 창 닫기 = 트레이로 숨김(앱 유지 → 알림 WS 계속 동작). 진짜 종료는 isQuitting 때만 ──
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();   // 종료하지 않고 트레이에 상주
      return;
    }
    persistCookies();      // 실제 종료 시 세션 쿠키 영구화
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  // ── 포커스 → 배지 초기화 ──
  mainWindow.on('focus', () => {
    unreadCount = 0;
    updateOverlayIcon();
    if (mainWindow) mainWindow.flashFrame(false);
  });

  // ── Tray ──
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  tray.setToolTip(APP_NAME);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: '열기', click: () => showWindow() },
    { type: 'separator' },
    { label: '종료', click: () => { isQuitting = true; app.quit(); } },
  ]));
  tray.on('click', () => showWindow());
  tray.on('double-click', () => showWindow());

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

// ── 창 표시(트레이/알림 클릭 시) ──
function showWindow() {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  } else {
    createWindow();
  }
}

// ── 세션 쿠키 영구화 (실제 종료 시) ──
async function persistCookies() {
  try {
    if (!mainWindow) return;
    const ses = mainWindow.webContents.session;
    const cookies = await ses.cookies.get({});
    for (const cookie of cookies) {
      if (!cookie.expirationDate && cookie.domain?.includes('lonex.kr')) {
        const expiry = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
        await ses.cookies.set({
          url: `https://${cookie.domain.replace(/^\./, '')}${cookie.path || '/'}`,
          name: cookie.name, value: cookie.value, domain: cookie.domain,
          path: cookie.path, secure: cookie.secure, httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite || 'no_restriction', expirationDate: expiry,
        });
      }
    }
    await ses.cookies.flushStore();
  } catch {}
}

// ── 알림 WebSocket 주입 스크립트 ──
function injectNotificationListener() {
  if (!mainWindow) return;
  mainWindow.webContents.executeJavaScript(`
    (function() {
      // 중복 방지
      if (window.__lonex_notif_ws) return;

      function getUid() {
        // 1. 쿠키에서 _hid
        const m = document.cookie.match(/(?:^|;)\\s*_hid=([^;]+)/);
        if (m) return m[1];
        // 2. localStorage (chatApi 백업)
        try {
          const h = localStorage.getItem('chat_user_hid');
          if (h) return h;
        } catch {}
        return null;
      }

      function formatTime() {
        return new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' });
      }

      var _retryDelay = 3000;
      var _lastConnectedAt = null;
      var _pingTimer = null;

      function showNotif(data) {
        const msg = data.message || {};
        const senderName = msg.sender_name || '';
        const roomName = data.room_name || '채팅';
        const roomType = data.room_type;
        const content = (msg.content || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\\s+/g, ' ').trim().substring(0, 100) || '새 메시지';
        const time = formatTime();
        let title = roomName;
        if (roomType === 'direct') title = senderName || '새 메시지';
        else if (senderName) title = roomName + ' - ' + senderName;
        const roomId = data.room_id || (msg && msg.room_id) || '';
        // 딥링크 메타 — 클릭 시 정확한 메일/메시지/답글 위치로 이동
        var meta;
        if (roomType === 'mail') {
          meta = { kind: 'mail', emailId: data.email_id || '' };
        } else {
          meta = { kind: 'chat', roomId: roomId, msgId: (msg && msg.id) || '', parentId: (msg && msg.thread_parent_id) || '' };
        }
        if (window.__electronAPI) {
          window.__electronAPI.showNotification(title, content + '  (' + time + ')', meta);
          window.__electronAPI.updateBadge(1);
        }
      }

      function fetchMissed() {
        if (!_lastConnectedAt) return;
        const since = _lastConnectedAt;
        fetch('/API/chat/notifications/missed?since=' + encodeURIComponent(since), { credentials: 'include' })
          .then(function(r) { return r.json(); })
          .then(function(d) {
            if (d.notifications && d.notifications.length > 0) {
              console.log('[LONEX] Fetched ' + d.notifications.length + ' missed notifications');
              d.notifications.forEach(function(n) { showNotif(n); });
            }
          }).catch(function() {});
      }

      function connect() {
        const uid = getUid();
        if (!uid) { console.log('[LONEX] No uid yet, retrying in 3s...'); setTimeout(connect, 3000); return; }
        console.log('[LONEX] Connecting notification WS, uid=' + uid.substring(0,8) + '...');

        const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = proto + '//' + location.host + '/API/chat/ws/notifications?uid=' + uid;
        const ws = new WebSocket(wsUrl);
        window.__lonex_notif_ws = ws;

        ws.onopen = function() {
          console.log('[LONEX] ✅ Notification WS connected');
          _retryDelay = 3000; // 성공 시 backoff 리셋
          fetchMissed(); // 재연결 시 놓친 알림 조회
          _lastConnectedAt = new Date().toISOString();
        };

        ws.onmessage = function(event) {
          try {
            const parsed = JSON.parse(event.data);
            if (parsed.event === 'ping') { ws.send('pong'); return; } // 서버 ping 응답
            if (parsed.event === 'notification' && parsed.data) {
              showNotif(parsed.data);
            }
          } catch {}
        };

        ws.onclose = function() {
          window.__lonex_notif_ws = null;
          if (_pingTimer) { clearInterval(_pingTimer); _pingTimer = null; }
          console.log('[LONEX] WS closed, reconnecting in ' + (_retryDelay/1000) + 's...');
          setTimeout(connect, _retryDelay);
          _retryDelay = Math.min(_retryDelay * 1.5, 60000); // exponential backoff, max 60s
        };
        ws.onerror = function() {};

        // 클라이언트 ping (25초)
        if (_pingTimer) clearInterval(_pingTimer);
        _pingTimer = setInterval(function() {
          if (ws.readyState === WebSocket.OPEN) ws.send('ping');
        }, 25000);
      }

      // Notification API 오버라이드 (다른 곳에서 호출 시에도 네이티브 알림)
      window.Notification = function(title, options) {
        if (window.__electronAPI) {
          window.__electronAPI.showNotification(title, (options && options.body) || '');
          window.__electronAPI.updateBadge(1);
        }
      };
      window.Notification.permission = 'granted';
      window.Notification.requestPermission = function(cb) {
        if (cb) cb('granted');
        return Promise.resolve('granted');
      };

      connect();
    })();
  `);
}

// ── IPC: 네이티브 알림 ──
ipcMain.on('show-notification', (event, { title, body, meta }) => {
  if (!Notification.isSupported()) return;
  // 하위호환: 예전 호출은 3번째 인자가 roomId 문자열이었음
  const m = (typeof meta === 'string') ? { kind: 'chat', roomId: meta } : (meta || {});
  const notif = new Notification({
    title: title || APP_NAME,
    body: body || '',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    silent: false,
  });
  notif.on('click', () => {
    showWindow();
    if (!mainWindow) return;
    // 알림 클릭 → 정확한 위치로 (창은 MemoryRouter 라 훅+localStorage 로 연다)
    if (m.kind === 'mail') {
      const eid = m.emailId || '';
      mainWindow.webContents.executeJavaScript(`
        (function(){
          try { localStorage.setItem('lonex_pending_mail', ${JSON.stringify(eid)}); } catch(e){}
          if (window.__lonexOpenMail) window.__lonexOpenMail(${JSON.stringify(eid)});
        })(); true;
      `).catch(() => {});
    } else if (m.roomId) {
      const mid = m.msgId || '', pid = m.parentId || '';
      mainWindow.webContents.executeJavaScript(`
        (function(){
          try {
            localStorage.setItem('lonex_pending_room', ${JSON.stringify(m.roomId)});
            ${mid ? `localStorage.setItem('lonex_pending_msg', ${JSON.stringify(mid)});` : `localStorage.removeItem('lonex_pending_msg');`}
            ${pid ? `localStorage.setItem('lonex_pending_parent', ${JSON.stringify(pid)});` : `localStorage.removeItem('lonex_pending_parent');`}
          } catch(e){}
          if (window.__lonexOpenChatRoom) window.__lonexOpenChatRoom(${JSON.stringify(m.roomId)}, ${JSON.stringify(mid)}, ${JSON.stringify(pid)});
        })(); true;
      `).catch(() => {});
    }
  });
  notif.show();
});

// ── IPC: 배지 업데이트 ──
ipcMain.on('update-badge', (event, count) => {
  if (!mainWindow) return;
  unreadCount += (count || 1);
  updateOverlayIcon();
  if (!mainWindow.isFocused()) mainWindow.flashFrame(true);
});

async function updateOverlayIcon() {
  if (!mainWindow) return;
  if (unreadCount <= 0) {
    mainWindow.setOverlayIcon(null, '');
    mainWindow.setTitle(`(0) ${APP_NAME}`);
    if (tray) {
      tray.setToolTip(APP_NAME);
      const iconPath = path.join(__dirname, 'assets', 'icon.ico');
      tray.setImage(nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 }));
    }
    return;
  }
  const badgeText = unreadCount > 99 ? '99+' : String(unreadCount);

  // 타이틀바에 숫자 표시
  mainWindow.setTitle(`(${badgeText}) ${APP_NAME}`);

  // 작업표시줄 오버레이 배지 — renderer에서 canvas로 생성
  try {
    const dataUrl = await mainWindow.webContents.executeJavaScript(`
      (function() {
        const c = document.createElement('canvas');
        c.width = 32; c.height = 32;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(16, 16, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold ${badgeText.length > 2 ? '12' : '18'}px Arial';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('${badgeText}', 16, 17);
        return c.toDataURL('image/png');
      })()
    `);
    const badge = nativeImage.createFromDataURL(dataUrl);
    mainWindow.setOverlayIcon(badge, `${unreadCount}개 안 읽은 메시지`);
  } catch (e) {
    console.error('Badge error:', e);
  }

  // 트레이 아이콘 + 툴팁
  if (tray) {
    tray.setToolTip(`${APP_NAME} - ${unreadCount}개 안 읽은 메시지`);
    // 트레이 아이콘에도 배지 표시
    try {
      const trayDataUrl = await mainWindow.webContents.executeJavaScript(`
        (function() {
          const c = document.createElement('canvas');
          c.width = 16; c.height = 16;
          const ctx = c.getContext('2d');
          // 원본 아이콘 배경 (간단한 원)
          ctx.fillStyle = '#333';
          ctx.fillRect(0, 0, 16, 16);
          // 빨간 배지
          ctx.fillStyle = '#ef4444';
          ctx.beginPath(); ctx.arc(12, 4, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 7px Arial';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('${badgeText.length > 1 ? '!' : badgeText}', 12, 4);
          return c.toDataURL('image/png');
        })()
      `);
      tray.setImage(nativeImage.createFromDataURL(trayDataUrl));
    } catch {}
  }
}

// ── 자동 업데이트 (electron-updater) ──
// 렌더러(웹앱, x.lonex.kr)에 안전하게 메시지 전달
function sendToRenderer(channel, payload) {
  try {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, payload);
    }
  } catch {}
}

let _updaterReady = false;
let _lastUpdateVersion = null;

function downloadUrlFor(version) {
  return `${APP_URL}/downloads/Lonex-Setup_v${version}.exe`;
}

function setupAutoUpdater() {
  // 패키징된 프로덕션 빌드에서만 동작 (개발 모드는 latest.yml 부재로 에러)
  if (!app.isPackaged || _updaterReady) return;
  _updaterReady = true;

  autoUpdater.autoDownload = false;          // 사용자 확인 후 다운로드
  autoUpdater.autoInstallOnAppQuit = true;   // 받아두면 종료 시 자동 설치
  try { autoUpdater.disableWebInstaller = true; } catch {}

  autoUpdater.on('update-available', (info) => {
    _lastUpdateVersion = info && info.version;
    sendToRenderer('updater:available', {
      version: info && info.version,
      releaseNotes: typeof (info && info.releaseNotes) === 'string' ? info.releaseNotes : '',
      downloadUrl: downloadUrlFor(info && info.version),
    });
  });
  autoUpdater.on('update-not-available', () => {
    sendToRenderer('updater:not-available', {});
  });
  autoUpdater.on('download-progress', (p) => {
    sendToRenderer('updater:progress', {
      percent: Math.round((p && p.percent) || 0),
      bytesPerSecond: (p && p.bytesPerSecond) || 0,
      transferred: (p && p.transferred) || 0,
      total: (p && p.total) || 0,
    });
  });
  autoUpdater.on('update-downloaded', (info) => {
    sendToRenderer('updater:downloaded', {
      version: (info && info.version) || _lastUpdateVersion || '',
    });
  });
  autoUpdater.on('error', (err) => {
    sendToRenderer('updater:error', {
      message: String((err && err.message) || err || 'update error'),
      version: _lastUpdateVersion || '',
      downloadUrl: _lastUpdateVersion ? downloadUrlFor(_lastUpdateVersion) : '',
    });
  });

  const check = () => { try { autoUpdater.checkForUpdates().catch(() => {}); } catch {} };
  setTimeout(check, 8000);                       // 시작 8초 후 1차 체크
  setInterval(check, 6 * 60 * 60 * 1000);        // 이후 6시간마다
}

// ── IPC: 버전 조회 (동기) ──
ipcMain.on('app:get-version', (event) => {
  try { event.returnValue = app.getVersion(); } catch { event.returnValue = ''; }
});

// ── IPC: 업데이트 제어 ──
ipcMain.on('updater:check', () => {
  if (!app.isPackaged) return;
  try { autoUpdater.checkForUpdates().catch(() => {}); } catch {}
});
ipcMain.on('updater:download', () => {
  if (!app.isPackaged) return;
  try { autoUpdater.downloadUpdate().catch(() => {}); } catch {}
});
ipcMain.on('updater:install', () => {
  if (!app.isPackaged) return;
  try {
    isQuitting = true;   // 트레이 상주 close 가드 우회 → 실제 종료 후 설치
    autoUpdater.quitAndInstall(false, true);
  } catch {}
});
ipcMain.on('updater:open-external', (event, url) => {
  if (typeof url === 'string' && url.startsWith('https://x.lonex.kr')) {
    shell.openExternal(url);
  }
});

// ── 권한 ──
app.on('ready', () => {
  const allowed = ['media', 'mediaKeySystem', 'geolocation', 'notifications'];
  const ses = session.fromPartition('persist:lonexerp');
  ses.setPermissionRequestHandler((wc, perm, cb) => cb(allowed.includes(perm)));
  ses.setPermissionCheckHandler((wc, perm) => allowed.includes(perm));
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(allowed.includes(perm)));
  session.defaultSession.setPermissionCheckHandler((wc, perm) => allowed.includes(perm));
});

// ── 앱 라이프사이클 ──
// 단일 인스턴스 보장 (트레이 상주 + 자동시작 시 중복 실행 방지)
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => showWindow());   // 이미 실행 중이면 기존 창을 앞으로
  app.whenReady().then(async () => {
    const licensed = await ensureLicensedStartup('ERP');
    if (!licensed) return;
    // 부팅 시 자동 시작 (트레이로 떠서 알림 수신)
    try { app.setLoginItemSettings({ openAtLogin: true, args: ['--hidden'] }); } catch {}
    createWindow();
    setupAutoUpdater();   // 자동 업데이트 체크 시작
  });
  // 트레이 상주 — 창을 닫아도 종료하지 않음 (알림 WS 유지)
  app.on('window-all-closed', () => { /* no-op: 트레이 상주 */ });
  app.on('before-quit', () => { isQuitting = true; });
  app.on('activate', () => { showWindow(); });
}

// ── SSL 인증서 에러 (자체서명) ──
app.on('certificate-error', (event, wc, url, err, cert, cb) => {
  if (url.startsWith('https://x.lonex.kr')) { event.preventDefault(); cb(true); }
  else cb(false);
});
