'use strict';

const { execSync } = require('child_process');

const { fgWhite } = require('./colors');

function installPackages(packageManager = 'npm') {
  console.info(fgWhite, 'Installing Packages...');

  if (packageManager === 'npm') {
    execSync('npm install');
  } else {
    execSync('yarn');
  }

  console.info(fgWhite, 'Installing Packages... Completed');
}

module.exports = installPackages;
