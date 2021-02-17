'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const { fgWhite } = require('./colors');
const {
  capitalizedToken,
  hyphenToken,
  hyphenFileToken,
  capitalizedUnitedToken,
  lowercaseToken,
  camelToken,
  uppercaseUnderscoreToken,
  organizationHyphenToken,
  organizationHyphenFileToken,
  packageManagerToken,
  packageManagerInstallToken,
  scriptEscapeArgumentsToken,
} = require('./tokenizer');

const filesToIgnore = {
  '.git': true,
  '.DS_Store': true,
  '.gitignore': true,
  '.editorconfig': true,
  init: true,
  'logo.svg': true,
  node_modules: true,
  'prettier.config.js': true,
  dist: true,
};

function replaceFileNames(dir, calculatedTokens) {
  console.info(fgWhite, 'Replacing path driver names...');
  console.info(fgWhite, 'Replacing content driver names...');

  _replaceFileNames(dir, calculatedTokens);

  console.info(fgWhite, 'Replacing path driver names... Completed');
  console.info(fgWhite, 'Replacing content driver names... Completed');
}

function _replaceFileNames(dir, calculatedTokens) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      let filePath = path.normalize(path.join(dir, file));
      filePath = renameFilenamePlaceholder(filePath, calculatedTokens);
      if (!filesToIgnore[file]) {
        const isDir = fs.lstatSync(filePath).isDirectory();
        if (isDir) {
          _replaceFileNames(filePath, calculatedTokens);
        } else {
          replaceNameOccurrences(filePath, calculatedTokens);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Replace placeholders with driver name in file content
 *
 * @param {string} fileContent
 *
 */
function replaceNameOccurrences(filePath, calculatedTokens) {
  const fileContent = fs.readFileSync(filePath).toString('utf8');

  const {
    capitalizedName,
    hyphenName,
    capitalizedUnitedName,
    lowercaseName,
    camelName,
    uppercaseUnderscoreName,
    organizationName,
    packageManager,
    packageManagerInstall,
    scriptEscapeArguments,
  } = calculatedTokens;

  let modifiedContent = fileContent;
  modifiedContent = modifiedContent.replace(new RegExp(capitalizedToken, 'g'), capitalizedName);
  modifiedContent = modifiedContent.replace(new RegExp(hyphenToken, 'g'), hyphenName);
  modifiedContent = modifiedContent.replace(new RegExp(capitalizedUnitedToken, 'g'), capitalizedUnitedName);
  modifiedContent = modifiedContent.replace(new RegExp(lowercaseToken, 'g'), lowercaseName);
  modifiedContent = modifiedContent.replace(new RegExp(camelToken, 'g'), camelName);
  modifiedContent = modifiedContent.replace(new RegExp(uppercaseUnderscoreToken, 'g'), uppercaseUnderscoreName);
  modifiedContent = modifiedContent.replace(new RegExp(organizationHyphenToken, 'g'), organizationName);
  modifiedContent = modifiedContent.replace(new RegExp(packageManagerToken, 'g'), packageManager);
  modifiedContent = modifiedContent.replace(new RegExp(packageManagerInstallToken, 'g'), packageManagerInstall);
  modifiedContent = modifiedContent.replace(new RegExp(scriptEscapeArgumentsToken, 'g'), scriptEscapeArguments);

  fs.writeFileSync(filePath, modifiedContent);
}

/**
 * Rename filename with placeholder using driver's name
 *
 * @param {string} filePath
 * @returns
 */
function renameFilenamePlaceholder(filePath, calculatedTokens) {
  const { hyphenName, organizationName } = calculatedTokens;

  if (filePath.includes(hyphenFileToken) || filePath.includes(organizationHyphenFileToken)) {
    let newPath = filePath.replace(new RegExp(hyphenFileToken, 'g'), hyphenName);
    newPath = newPath.replace(new RegExp(organizationHyphenFileToken, 'g'), organizationName);

    rimraf.sync(newPath);
    fs.renameSync(filePath, newPath);
    return newPath;
  }
  return filePath;
}

module.exports = replaceFileNames;
