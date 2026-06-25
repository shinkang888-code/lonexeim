'use strict';

const fs = require('fs');
const path = require('path');
const { app, safeStorage } = require('electron');
const { verifyLicenseArtifact } = require('./LicenseSigner');
const { licenseArtifactTtlSec } = require('./licenseConfig');

function licenseFilePath() {
  return path.join(app.getPath('userData'), 'lonex-license.dat');
}

function encrypt(text) {
  if (safeStorage.isEncryptionAvailable()) {
    return { v: 2, data: safeStorage.encryptString(text).toString('base64') };
  }
  return { v: 1, data: Buffer.from(text, 'utf8').toString('base64') };
}

function decrypt(record) {
  if (!record) return null;
  if (record.v === 2 && safeStorage.isEncryptionAvailable()) {
    return safeStorage.decryptString(Buffer.from(record.data, 'base64'));
  }
  return Buffer.from(record.data, 'base64').toString('utf8');
}

function loadLicenseRecord() {
  const file = licenseFilePath();
  if (!fs.existsSync(file)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    const raw = decrypt(parsed.payload);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLicenseRecord(record) {
  const file = licenseFilePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const payload = encrypt(JSON.stringify(record));
  fs.writeFileSync(file, JSON.stringify({ payload, savedAt: new Date().toISOString() }, null, 2), 'utf8');
}

function clearLicenseRecord() {
  const file = licenseFilePath();
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

function evaluateStoredLicense(record, productCode) {
  if (!record) return { allowed: false, code: 'MISSING' };
  if (record.productCode !== productCode) return { allowed: false, code: 'PRODUCT_MISMATCH' };
  if (record.status === 'revoked') return { allowed: false, code: 'REVOKED' };
  if (record.status === 'expired') return { allowed: false, code: 'EXPIRED' };

  const verified = verifyLicenseArtifact(record.artifactToken);
  if (!verified.valid) return { allowed: false, code: verified.code || 'ARTIFACT_INVALID' };

  const payload = verified.payload;
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp) return { allowed: false, code: 'EXPIRED' };
  if (payload.iat && now - payload.iat > licenseArtifactTtlSec() * 30) {
    return { allowed: false, code: 'STALE' };
  }
  if (payload.lk !== record.licenseKey) return { allowed: false, code: 'TAMPERED' };
  if (payload.mn !== record.managementNumber) return { allowed: false, code: 'TAMPERED' };
  if (payload.pc !== productCode) return { allowed: false, code: 'TAMPERED' };

  return { allowed: true, payload, record };
}

module.exports = {
  loadLicenseRecord,
  saveLicenseRecord,
  clearLicenseRecord,
  evaluateStoredLicense,
};
