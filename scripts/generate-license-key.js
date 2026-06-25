#!/usr/bin/env node
'use strict';

const path = require('path');
const { generateLicenseKey } = require('../_asar_extract/main/license/LicenseKeyValidator');

const mgmt = process.argv[2] || '10000';
console.log('Lonex Beta License Key Generator');
console.log('Management Number:', mgmt);
console.log('License Key:', generateLicenseKey(mgmt));
console.log('');
console.log('Beta trial key (fixed): LNX-BETA-BT-EXMT-0000 (mgmt: 10000)');
