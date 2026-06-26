'use strict';

/**
 * Legacy EIM / Grend → Lonex EIM path/URL/string normalization.
 * EIM = Enterprise Information Management (기업정보관리)
 */
const CANONICAL_REPLACEMENTS = [
  [/LONEX EIM/g, 'LONEX EIM'],
  [/Lonex EIM/g, 'Lonex EIM'],
  [/LONEX-EIM/gi, 'LONEX-EIM'],
  [/lonex-eim/gi, 'lonex-eim'],
  [/lonexeim/gi, 'lonexeim'],
  [/Uninstall LONEX EIM/gi, 'Uninstall LONEX EIM'],
  [/Lonex-EIM/gi, 'Lonex-EIM'],
  [/GREND EIM/g, 'LONEX EIM'],
  [/Grend EIM/g, 'LONEX EIM'],
  [/GREND-EIM/gi, 'LONEX-EIM'],
  [/grend-cdms/gi, 'lonex-eim'],
  [/grendcdms/gi, 'lonexeim'],
  [/Uninstall GREND/gi, 'Uninstall LONEX'],
  [/Grend-Setup/gi, 'Lonex-Setup'],
  [/\\GREND\\/gi, '\\LONEX\\'],
  [/\/GREND\//gi, '/LONEX/'],
  [/콘텐츠 제작/g, '콘텐츠 제작'],
  [/기업정보관리/g, '기업정보관리'],
  [/Enterprise Information Management/gi, 'Enterprise Information Management'],
];

const LEGACY_ALIASES = [
  ...CANONICAL_REPLACEMENTS,
  [/\/m\/cdms\b/g, '/m/media'],
  [/\/cdms\b/g, '/eim'],
  [/MediaModule/g, 'MediaModule'],
  [/modules\/cdms/g, 'modules/media'],
  [/PRODUCT\.EIM/g, 'PRODUCT.EIM'],
  [/id:\s*["']cdms["']/g, 'id: "media"'],
];

function replaceLegacyPaths(input) {
  if (typeof input !== 'string') return input;
  let out = input;
  for (const [pattern, replacement] of LEGACY_ALIASES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function containsLegacyBrand(input) {
  if (typeof input !== 'string') return false;
  return /EIM|cdms|lonex-eim|lonexeim|GREND|grend/i.test(input);
}

module.exports = {
  CANONICAL_REPLACEMENTS,
  LEGACY_ALIASES,
  replaceLegacyPaths,
  containsLegacyBrand,
  replaceLegacyGrendPaths: replaceLegacyPaths,
  containsLegacyGrendBrand: containsLegacyBrand,
};
