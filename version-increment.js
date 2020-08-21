/**
 * Increments version number in package json file
 */

const package = require('./package.json');
const { resolve } = require('path');
const { writeFileSync } = require('fs-extra');

const versionArr = package.version.split('.').map(v => Number(v));
versionArr[2]++;
package.version = versionArr.join('.');

const packageJsonFile = resolve(__dirname, 'package.json');
writeFileSync(packageJsonFile, JSON.stringify(package, null, 4), { encoding: 'utf-8' });

console.log(`Wrote version ${package.version} to package json file`);
