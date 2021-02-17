'use strict';

const fs = require('fs');
const rimraf = require('rimraf');

const { fgWhite } = require('./colors');

function restorePackageJson() {
  try {
    console.info(fgWhite, 'Restoring package.json...');

    rimraf.sync('package.json');
    rimraf.sync('node_modules ');
    rimraf.sync('package-lock.json');

    fs.renameSync('~package.json', 'package.json');

    console.info(fgWhite, 'Restoring package.json... Completed');
  } catch (error) {
    console.log(error);
  }
}

module.exports = restorePackageJson;
