'use strict';

const { replaceLegacyGrendPaths } = require('../lib/path-alias');

const PRODUCT = {
  CDMS: {
    code: 'LONEX-CDMS',
    root: 'LNX120',
    name: 'LONEX CDMS',
    keyPrefix: 'LNX',
  },
  ERP: {
    code: 'LONEX-ERP',
    root: 'LNX121',
    name: 'LONEX',
    keyPrefix: 'LNX',
  },
};

const PUBLISHER = {
  company: 'Lonex.inc',
  developer: 'shinkang888@gmail.com',
  copyright: 'Copyright (c) 2026 Lonex.inc. All rights reserved.',
  notice:
    'PROPRIETARY AND CONFIDENTIAL. Unauthorized copying, distribution, reverse engineering, ' +
    'or modification of this software is strictly prohibited.',
};

function licenseSigningSecret() {
  return (
    process.env.LONEX_LICENSE_SIGNING_SECRET ||
    process.env.LAWYGO_LICENSE_SIGNING_SECRET ||
    'lonex-beta-2026:Lonex.inc:shinkang888@gmail.com'
  );
}

function licenseArtifactTtlSec() {
  const n = Number(process.env.LONEX_LICENSE_ARTIFACT_TTL_SEC || 86400);
  return Number.isFinite(n) && n > 0 ? n : 86400;
}

function licenseApiOrigin() {
  const host = replaceLegacyGrendPaths(process.env.LONEX_API_HOST || 'x.lonex.kr');
  return `https://${host}`;
}

module.exports = {
  PRODUCT,
  PUBLISHER,
  LICENSE_KEY_PREFIX: 'LNX',
  licenseSigningSecret,
  licenseArtifactTtlSec,
  licenseApiOrigin,
};
