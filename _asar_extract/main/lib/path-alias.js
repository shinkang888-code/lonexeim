'use strict';

/** Inline copy for packaged CDMS — keep in sync with scripts/path-alias.js */
const GREND_REPLACEMENTS = [
  [/grend\.kr/gi, 'lonex.kr'],
  [/grenderp/gi, 'lonexerp'],
  [/persist:grenderp/gi, 'persist:lonexerp'],
  [/grend-license\.dat/gi, 'lonex-license.dat'],
  [/grend-cdms/gi, 'lonex-cdms'],
  [/GREND CDMS/g, 'LONEX CDMS'],
  [/Grend CDMS/g, 'LONEX CDMS'],
];

function replaceLegacyGrendPaths(input) {
  if (input == null || typeof input !== 'string') return input;
  let out = input;
  for (const [pattern, replacement] of GREND_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

module.exports = { replaceLegacyGrendPaths };
