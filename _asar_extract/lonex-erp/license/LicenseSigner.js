'use strict';

const crypto = require('crypto');
const { licenseSigningSecret } = require('./licenseConfig');

function signPayload(encoded) {
  return crypto.createHmac('sha256', licenseSigningSecret()).update(encoded).digest('base64url');
}

function signLicenseArtifact(payload) {
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${encoded}.${signPayload(encoded)}`;
}

function verifyLicenseArtifact(token) {
  if (!token || typeof token !== 'string') return { valid: false, code: 'MISSING' };
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return { valid: false, code: 'MALFORMED' };

  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = signPayload(encoded);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false, code: 'SIGNATURE_INVALID' };
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  } catch {
    return { valid: false, code: 'MALFORMED' };
  }
  return { valid: true, payload };
}

module.exports = { signLicenseArtifact, verifyLicenseArtifact };
