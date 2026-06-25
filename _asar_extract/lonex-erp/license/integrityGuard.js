'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const { PUBLISHER } = require('./licenseConfig');

function getExecutablePath() {
  return process.execPath;
}

function getAppAsarPath() {
  return path.join(process.resourcesPath, 'app.asar');
}

function hashFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function buildInstallPathHash() {
  return crypto
    .createHash('sha256')
    .update(getExecutablePath())
    .update(getAppAsarPath())
    .digest('hex');
}

function loadIntegrityRecord(userDataPath) {
  const file = path.join(userDataPath, '.lonex-integrity.json');
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function saveIntegrityRecord(userDataPath, record) {
  const file = path.join(userDataPath, '.lonex-integrity.json');
  fs.writeFileSync(file, JSON.stringify(record, null, 2), 'utf8');
}

function verifyInstallIntegrity() {
  const userData = app.getPath('userData');
  const current = {
    execHash: hashFile(getExecutablePath()),
    asarHash: hashFile(getAppAsarPath()),
    installPathHash: buildInstallPathHash(),
    publisher: PUBLISHER.company,
  };

  const stored = loadIntegrityRecord(userData);
  if (!stored) {
    saveIntegrityRecord(userData, { ...current, boundAt: new Date().toISOString() });
    return { ok: true, firstRun: true };
  }

  if (stored.installPathHash !== current.installPathHash) {
    return { ok: false, code: 'COPY_DETECTED', message: 'Installation path mismatch' };
  }
  if (stored.asarHash && current.asarHash && stored.asarHash !== current.asarHash) {
    return { ok: false, code: 'TAMPERED', message: 'Application bundle modified' };
  }
  return { ok: true, firstRun: false };
}

module.exports = { verifyInstallIntegrity, buildInstallPathHash, getExecutablePath };
