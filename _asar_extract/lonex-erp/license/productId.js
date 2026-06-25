'use strict';

const crypto = require('crypto');
const { licenseSigningSecret } = require('./licenseConfig');

function buildProductId(managementNumber, planTier, productRoot) {
  const mn = String(managementNumber || '').replace(/\D/g, '').padStart(5, '0');
  const tenantHash = crypto
    .createHmac('sha256', licenseSigningSecret())
    .update(mn)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
  const checksum = crypto
    .createHmac('sha256', licenseSigningSecret())
    .update(`${productRoot}:${planTier}:${tenantHash}`)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
  return `${productRoot}-${planTier}-${tenantHash}-${checksum}`;
}

module.exports = { buildProductId };
