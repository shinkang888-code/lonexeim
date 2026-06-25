'use strict';

const crypto = require('crypto');
const os = require('os');

function getInstallId(userDataPath) {
  const fs = require('fs');
  const path = require('path');
  const file = path.join(userDataPath, '.lonex-install-id');
  try {
    if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  } catch {}
  const id = crypto.randomUUID();
  try {
    fs.writeFileSync(file, id, 'utf8');
  } catch {}
  return id;
}

function getDeviceFingerprint() {
  const raw = [
    os.hostname(),
    os.platform(),
    os.arch(),
    os.cpus()[0]?.model || '',
    Object.values(os.networkInterfaces() || {})
      .flat()
      .filter((n) => n && !n.internal && n.mac && n.mac !== '00:00:00:00:00:00')
      .map((n) => n.mac)
      .sort()
      .join('|'),
  ].join('::');
  return crypto.createHash('sha256').update(raw).digest('hex');
}

function verifyInstallBinding(storedFingerprint, currentFingerprint) {
  if (!storedFingerprint) return { ok: true };
  if (storedFingerprint === currentFingerprint) return { ok: true };
  return { ok: false, code: 'DEVICE_MISMATCH' };
}

module.exports = { getInstallId, getDeviceFingerprint, verifyInstallBinding };
