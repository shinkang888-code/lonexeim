const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { SyncClient } = require('./sync-client');
const { LogshieldBridge } = require('./logshield-bridge');

const store = new Store({ name: 'lonex-workforce-config' });
const isDev = process.argv.includes('--dev');

let mainWindow = null;
let tray = null;
let syncClient = null;
let logshieldBridge = null;

const HUB_URL = process.env.LONEX_HUB_URL || (isDev ? 'http://localhost:3000' : 'https://lonex-hub.vercel.app');

function getConfig() {
  return {
    hqServerUrl: store.get('hqServerUrl', 'https://lonex-hub.vercel.app'),
    apiKey: store.get('apiKey', ''),
    employeeId: store.get('employeeId', ''),
    endpointId: store.get('endpointId', ''),
    endpointHostname: store.get('endpointHostname', require('os').hostname()),
    syncEnabled: store.get('syncEnabled', true),
    logshieldEnabled: store.get('logshieldEnabled', true),
  };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: 'LONEX Workforce',
    backgroundColor: '#f5f5f5',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const cfg = getConfig();
  if (!cfg.apiKey) {
    mainWindow.loadFile(path.join(__dirname, 'enrollment.html'));
  } else {
    mainWindow.loadURL(`${HUB_URL}?workforce=1`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setToolTip('LONEX Workforce');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Lonex Hub 열기', click: () => mainWindow?.show() },
      { label: '본사 동기화', click: () => syncClient?.flushNow() },
      { type: 'separator' },
      { label: '종료', click: () => app.quit() },
    ])
  );
}

function startServices() {
  const cfg = getConfig();
  if (!cfg.apiKey) return;

  syncClient = new SyncClient(cfg, store);
  syncClient.start();

  if (cfg.logshieldEnabled) {
    logshieldBridge = new LogshieldBridge(cfg, syncClient);
    logshieldBridge.start();
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  startServices();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  syncClient?.stop();
  logshieldBridge?.stop();
});

// ── IPC ──────────────────────────────────────────
ipcMain.handle('workforce:getConfig', () => {
  const cfg = getConfig();
  return { ...cfg, apiKey: cfg.apiKey ? `${cfg.apiKey.slice(0, 16)}…` : '' };
});

ipcMain.handle('workforce:saveEnrollment', async (_e, payload) => {
  const hqUrl = payload.hqServerUrl.replace(/\/$/, '');
  const apiKey = payload.apiKey.trim();

  try {
    const http = require('http');
    const https = require('https');
    const { URL } = require('url');
    const url = new URL('/api/hq/ingest', hqUrl);
    const lib = url.protocol === 'https:' ? https : http;
    const testBody = JSON.stringify({
      endpoint_id: `EP-${require('os').hostname()}`,
      items: [{ data_type: 'other', title: '등록 검증', body_text: 'enrollment ping', source_module: 'workforce' }],
    });
    await new Promise((resolve, reject) => {
      const req = lib.request(
        {
          hostname: url.hostname,
          port: url.port || (url.protocol === 'https:' ? 443 : 80),
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(testBody),
            'X-Lonex-Api-Key': apiKey,
          },
        },
        (res) => {
          let raw = '';
          res.on('data', (c) => (raw += c));
          res.on('end', () => {
            if (res.statusCode >= 400) reject(new Error(raw || `HTTP ${res.statusCode}`));
            else resolve(raw);
          });
        }
      );
      req.on('error', reject);
      req.write(testBody);
      req.end();
    });
  } catch (err) {
    return { ok: false, error: err.message || 'API Key 검증 실패' };
  }

  store.set('hqServerUrl', hqUrl);
  store.set('employeeId', payload.employeeId || '');
  store.set('endpointId', payload.endpointId || `EP-${require('os').hostname()}`);
  store.set('endpointHostname', require('os').hostname());
  store.set('syncEnabled', true);
  store.set('logshieldEnabled', true);

  startServices();
  if (mainWindow) mainWindow.loadURL(`${HUB_URL}?workforce=1`);
  return { ok: true };
});

ipcMain.handle('workforce:queueIngest', async (_e, items) => {
  if (!syncClient) return { ok: false, error: 'NOT_ENROLLED' };
  syncClient.queueItems(items);
  return { ok: true, queued: items.length };
});

ipcMain.handle('workforce:reportSecurity', async (_e, event) => {
  if (!syncClient) return { ok: false, error: 'NOT_ENROLLED' };
  return syncClient.postSecurityEvent(event);
});

ipcMain.handle('workforce:flushSync', async () => {
  if (!syncClient) return { ok: false };
  return syncClient.flushNow();
});
