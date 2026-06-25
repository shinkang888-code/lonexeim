'use strict';

const crypto = require('crypto');
const { LICENSE_KEY_PREFIX, licenseSigningSecret } = require('./licenseConfig');

const KEY_PATTERN = /^LNX-[A-Z0-9]{4}-[A-Z]{2}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

const TRIAL_LICENSE_KEYS = new Set([
  'LNX-BETA-BT-EXMT-0000',
]);

function normalizeManagementNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return null;
  return digits.padStart(5, '0').slice(-5);
}

function licensePlanCodeForMgmt(managementNumber) {
  const mn = normalizeManagementNumber(managementNumber);
  if (mn === '10000') return 'TR';
  if (mn === '00000') return 'EX';
  return 'BT';
}

function computeLicenseChecksum(managementNumber, planCode, randomPart) {
  const payload = `${managementNumber}:${planCode}:${randomPart}`;
  return crypto
    .createHmac('sha256', licenseSigningSecret())
    .update(payload)
    .digest('hex')
    .slice(0, 4)
    .toUpperCase();
}

function generateLicenseKey(managementNumber) {
  const mn = normalizeManagementNumber(managementNumber) || managementNumber;
  const mgmtPart = mn.replace(/\D/g, '').slice(-4).padStart(4, '0');
  const plan = licensePlanCodeForMgmt(mn);
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  const checksum = computeLicenseChecksum(mn, plan, randomPart);
  return `${LICENSE_KEY_PREFIX}-${mgmtPart}-${plan}-${checksum}-${randomPart}`;
}

function validateLicenseKeyFormat(licenseKey) {
  return KEY_PATTERN.test(String(licenseKey || '').trim().toUpperCase());
}

function isTrialLicenseKey(licenseKey) {
  const key = String(licenseKey || '').trim().toUpperCase();
  return TRIAL_LICENSE_KEYS.has(key) || key.includes('-TR-') || key.includes('-BT-');
}

function validateLicenseKey(licenseKey, managementNumber) {
  const key = String(licenseKey || '').trim().toUpperCase();
  const mn = normalizeManagementNumber(managementNumber);
  if (!mn) return { valid: false, code: 'INVALID_FORMAT' };
  if (!validateLicenseKeyFormat(key)) return { valid: false, code: 'INVALID_FORMAT' };
  if (TRIAL_LICENSE_KEYS.has(key)) return { valid: true };

  const parts = key.split('-');
  const mgmtPart = parts[1];
  const plan = parts[2];
  const checksum = parts[3];
  const randomPart = parts[4];
  const expectedMgmtPart = mn.replace(/\D/g, '').slice(-4).padStart(4, '0');
  if (mgmtPart !== expectedMgmtPart) return { valid: false, code: 'MGMT_MISMATCH' };

  const expectedChecksum = computeLicenseChecksum(mn, plan, randomPart);
  if (checksum !== expectedChecksum) return { valid: false, code: 'INVALID_CHECKSUM' };

  return { valid: true };
}

module.exports = {
  normalizeManagementNumber,
  licensePlanCodeForMgmt,
  computeLicenseChecksum,
  generateLicenseKey,
  validateLicenseKeyFormat,
  validateLicenseKey,
  isTrialLicenseKey,
  TRIAL_LICENSE_KEYS,
};
