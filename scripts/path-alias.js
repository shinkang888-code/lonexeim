'use strict';

/**
 * Legacy Grend → Lonex path/URL/string normalization.
 * Used at runtime for stored configs and at build/verify time.
 */
const GREND_REPLACEMENTS = [
  [/grend\.kr/gi, 'lonex.kr'],
  [/grenderp/gi, 'lonexerp'],
  [/persist:grenderp/gi, 'persist:lonexerp'],
  [/grend-workforce-config/gi, 'lonex-workforce-config'],
  [/grend-license\.dat/gi, 'lonex-license.dat'],
  [/\.grend-integrity\.json/gi, '.lonex-integrity.json'],
  [/\.grend-install-id/gi, '.lonex-install-id'],
  [/grend-cdms/gi, 'lonex-cdms'],
  [/grend-updater/gi, 'lonex-updater'],
  [/grendcdms/gi, 'lonexcdms'],
  [/GREND CDMS/g, 'LONEX CDMS'],
  [/Grend CDMS/g, 'LONEX CDMS'],
  [/Uninstall GREND/gi, 'Uninstall LONEX'],
  [/Grend-Setup/gi, 'Lonex-Setup'],
  [/GREND-CDMS/gi, 'LONEX-CDMS'],
  [/__grend_/gi, '__lonex_'],
  [/grend_pending_/gi, 'lonex_pending_'],
  [/\\GREND\\/gi, '\\LONEX\\'],
  [/\/GREND\//gi, '/LONEX/'],
];

/** Substrings that contain "grend" but must not be rewritten (minified libs, locales). */
const FALSE_POSITIVE = /Renderer|Rendszerjelek|SVGRenderer|HybridRenderer|CanvasRenderer|registerRenderer/i;

function replaceLegacyGrendPaths(input) {
  if (input == null) return input;
  if (typeof input !== 'string') return input;
  let out = input;
  for (const [pattern, replacement] of GREND_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function containsLegacyGrendBrand(input) {
  if (typeof input !== 'string') return false;
  if (FALSE_POSITIVE.test(input)) return false;
  return /grend(?!er)/i.test(input);
}

module.exports = {
  GREND_REPLACEMENTS,
  replaceLegacyGrendPaths,
  containsLegacyGrendBrand,
};
