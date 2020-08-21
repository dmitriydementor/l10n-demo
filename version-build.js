/**
 * Gets version number from package json file
 */

const package = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = { version: package.version };

gitInfo.version = package.version;

const fileContent = `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`;

const versionFilePaths = [
    resolve(__dirname, 'src', 'environments', 'version.ts'),
    resolve(__dirname, 'src', 'environments', 'browser', 'version.ts'),
    resolve(__dirname, 'src', 'environments', 'server', 'version.ts'),
];

for (var i = 0; i < versionFilePaths.length; i++) {
    writeFileSync(versionFilePaths[i], fileContent, { encoding: 'utf-8' });
    console.log(`Wrote version info ${gitInfo.version} to ${relative(resolve(__dirname, '..'), versionFilePaths[i])}`);
}
