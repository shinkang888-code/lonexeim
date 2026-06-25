'use strict';

const https = require('https');
const { URL } = require('url');
const { BrowserWindow, dialog, app } = require('electron');
const path = require('path');

const { PRODUCT, PUBLISHER, licenseApiOrigin, licenseArtifactTtlSec } = require('./licenseConfig');
const { validateLicenseKey, normalizeManagementNumber, licensePlanCodeForMgmt } = require('./LicenseKeyValidator');
const { signLicenseArtifact } = require('./LicenseSigner');
const { buildProductId } = require('./productId');
const { getInstallId, getDeviceFingerprint, verifyInstallBinding } = require('./installProfile');
const { loadLicenseRecord, saveLicenseRecord, clearLicenseRecord, evaluateStoredLicense } = require('./licenseStore');
const { verifyInstallIntegrity } = require('./integrityGuard');

function getProductConfig(productKind) {
  return PRODUCT[productKind] || PRODUCT.CDMS;
}

function buildArtifactToken({ managementNumber, licenseKey, productCode, installId, deviceFingerprint }) {
  const now = Math.floor(Date.now() / 1000);
  return signLicenseArtifact({
    mn: managementNumber,
    lk: licenseKey,
    pc: productCode,
    iid: installId,
    df: deviceFingerprint,
    iat: now,
    exp: now + licenseArtifactTtlSec(),
    pub: PUBLISHER.company,
    dev: PUBLISHER.developer,
  });
}

function postJson(urlString, body) {
  return new Promise((resolve) => {
    try {
      const url = new URL(urlString);
      const payload = JSON.stringify(body);
      const req = https.request(
        {
          hostname: url.hostname,
          port: url.port || 443,
          path: url.pathname + url.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'User-Agent': 'LonexDesktop/1.0',
          },
          timeout: 8000,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: JSON.parse(data || '{}') });
            } catch {
              resolve({ ok: false, status: res.statusCode, data: {} });
            }
          });
        }
      );
      req.on('error', () => resolve({ ok: false, status: 0, data: {} }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, status: 0, data: {}, offline: true });
      });
      req.write(payload);
      req.end();
    } catch {
      resolve({ ok: false, status: 0, data: {} });
    }
  });
}

async function verifyOnline({ managementNumber, licenseKey, productCode, installId, deviceFingerprint }) {
  const origin = licenseApiOrigin();
  const result = await postJson(`${origin}/API/license/verify`, {
    managementNumber,
    licenseKey,
    productCode,
    installId,
    deviceFingerprint,
  });
  return result;
}

async function activateOnline({ managementNumber, licenseKey, productCode, installId, deviceFingerprint }) {
  const origin = licenseApiOrigin();
  return postJson(`${origin}/API/license/activate`, {
    managementNumber,
    licenseKey,
    productCode,
    installId,
    deviceFingerprint,
  });
}

function evaluateLocalLicense(productKind) {
  const cfg = getProductConfig(productKind);
  const record = loadLicenseRecord();
  const evaluated = evaluateStoredLicense(record, cfg.code);
  if (!evaluated.allowed) return evaluated;

  const binding = verifyInstallBinding(record.deviceFingerprint, getDeviceFingerprint());
  if (!binding.ok) return { allowed: false, code: binding.code };

  const integrity = verifyInstallIntegrity();
  if (!integrity.ok) return { allowed: false, code: integrity.code, message: integrity.message };

  return { allowed: true, record, integrity };
}

async function activateLicense({ managementNumber, licenseKey, productKind }) {
  const cfg = getProductConfig(productKind);
  const mn = normalizeManagementNumber(managementNumber);
  const key = String(licenseKey || '').trim().toUpperCase();
  const keyCheck = validateLicenseKey(key, mn);
  if (!keyCheck.valid) return { ok: false, code: keyCheck.code };

  const userData = app.getPath('userData');
  const installId = getInstallId(userData);
  const deviceFingerprint = getDeviceFingerprint();
  const plan = licensePlanCodeForMgmt(mn);
  const productId = buildProductId(mn, plan, cfg.root);
  const artifactToken = buildArtifactToken({
    managementNumber: mn,
    licenseKey: key,
    productCode: cfg.code,
    installId,
    deviceFingerprint,
  });

  const online = await activateOnline({
    managementNumber: mn,
    licenseKey: key,
    productCode: cfg.code,
    installId,
    deviceFingerprint,
  });

  if (!online.ok && !online.offline) {
    // Server explicitly rejected
    if (online.status === 403 || online.status === 401) {
      return { ok: false, code: online.data?.code || 'SERVER_DENIED' };
    }
  }

  const record = {
    managementNumber: mn,
    licenseKey: key,
    productCode: cfg.code,
    productId,
    planTier: plan,
    status: 'active',
    installId,
    deviceFingerprint,
    artifactToken,
    publisher: PUBLISHER.company,
    developer: PUBLISHER.developer,
    activatedAt: new Date().toISOString(),
    beta: true,
  };

  saveLicenseRecord(record);
  verifyInstallIntegrity();
  return { ok: true, record };
}

function showActivationWindow(productKind) {
  return new Promise((resolve) => {
    const cfg = getProductConfig(productKind);
    const win = new BrowserWindow({
      width: 520,
      height: 620,
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      title: `${cfg.name} License Activation`,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'licensePreload.js'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    win.setMenu(null);
    win.loadFile(path.join(__dirname, 'licenseActivation.html'), {
      query: { product: cfg.code, name: cfg.name },
    });

    const done = (result) => {
      if (!win.isDestroyed()) win.close();
      resolve(result);
    };

    win.webContents.on('ipc-message', (_event, channel, payload) => {
      if (channel === 'license:cancel') done({ ok: false, cancelled: true });
    });
  });
}

async function assertLicenseOrExit(productKind) {
  const cfg = getProductConfig(productKind);
  const local = evaluateLocalLicense(productKind);
  if (local.allowed) {
    if (local.record) {
      await verifyOnline({
        managementNumber: local.record.managementNumber,
        licenseKey: local.record.licenseKey,
        productCode: cfg.code,
        installId: local.record.installId,
        deviceFingerprint: getDeviceFingerprint(),
      }).catch(() => {});
    }
    return true;
  }

  await dialog.showMessageBox({
    type: 'warning',
    title: `${cfg.name} License Required`,
    message: 'Lonex Beta — Licensed Software',
    detail:
      `${PUBLISHER.notice}\n\n` +
      `Publisher: ${PUBLISHER.company}\n` +
      `Developer: ${PUBLISHER.developer}\n\n` +
      `A valid license key is required to run this beta program.`,
    buttons: ['Activate License', 'Exit'],
    defaultId: 0,
    cancelId: 1,
  }).then(async (res) => {
    if (res.response === 1) app.exit(1);
  });

  return false;
}

let pendingActivationResolve = null;

function registerLicenseIpc(ipcMain, productKind) {
  ipcMain.handle('license:getStatus', async () => {
    const evaluated = evaluateLocalLicense(productKind);
    const cfg = getProductConfig(productKind);
    return {
      allowed: evaluated.allowed,
      code: evaluated.code || null,
      product: cfg.code,
      publisher: PUBLISHER.company,
      developer: PUBLISHER.developer,
      copyright: PUBLISHER.copyright,
      beta: true,
      record: evaluated.record
        ? {
            managementNumber: evaluated.record.managementNumber,
            productId: evaluated.record.productId,
            planTier: evaluated.record.planTier,
            activatedAt: evaluated.record.activatedAt,
          }
        : null,
    };
  });

  ipcMain.handle('license:activate', async (_event, { managementNumber, licenseKey }) => {
    return activateLicense({ managementNumber, licenseKey, productKind });
  });

  ipcMain.handle('license:deactivate', async () => {
    clearLicenseRecord();
    return { ok: true };
  });

  ipcMain.handle('license:activation-complete', async (_event, result) => {
    if (pendingActivationResolve) {
      pendingActivationResolve(result);
      pendingActivationResolve = null;
    }
    return { ok: true };
  });

  ipcMain.handle('license:getPublisherInfo', async () => ({
    ...PUBLISHER,
    beta: true,
  }));
}

async function ensureLicensedStartup(productKind) {
  if (process.env.LONEX_LICENSE_SKIP === '1' && !require('electron').app.isPackaged) {
    return true;
  }

  const cfg = getProductConfig(productKind);
  let local = evaluateLocalLicense(productKind);

  if (!local.allowed && (local.code === 'MISSING' || local.code === 'EXPIRED' || local.code === 'STALE')) {
    const { BrowserWindow, ipcMain } = require('electron');
    registerLicenseIpc(ipcMain, productKind);

    const activation = await new Promise((resolve) => {
      let win;
      pendingActivationResolve = (result) => {
        if (win && !win.isDestroyed()) win.close();
        resolve(result);
        pendingActivationResolve = null;
      };
      win = new BrowserWindow({
        width: 540,
        height: 640,
        resizable: false,
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        title: `${cfg.name} — License Activation`,
        autoHideMenuBar: true,
        webPreferences: {
          preload: path.join(__dirname, 'licensePreload.js'),
          contextIsolation: true,
          nodeIntegration: false,
        },
      });
      win.setMenu(null);
      win.loadFile(path.join(__dirname, 'licenseActivation.html'), {
        query: { product: cfg.code, name: cfg.name },
      });

      win.on('closed', () => {
        if (pendingActivationResolve) {
          pendingActivationResolve({ ok: false, cancelled: true });
          pendingActivationResolve = null;
        }
      });
    });

    if (!activation?.ok) {
      dialog.showErrorBox(
        'License Required',
        `${cfg.name} cannot start without a valid license.\n\n${PUBLISHER.notice}`
      );
      app.exit(1);
      return false;
    }
    local = evaluateLocalLicense(productKind);
  }

  if (!local.allowed) {
    dialog.showErrorBox(
      'License Error',
      `${local.code || 'INVALID'}: ${local.message || 'This copy is not authorized.'}\n\n${PUBLISHER.notice}`
    );
    app.exit(1);
    return false;
  }

  return true;
}

module.exports = {
  registerLicenseIpc,
  ensureLicensedStartup,
  evaluateLocalLicense,
  activateLicense,
  getProductConfig,
  PUBLISHER,
};
