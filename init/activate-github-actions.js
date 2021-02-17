'use strict';

const fs = require('fs');
const rimraf = require('rimraf');

const { fgWhite } = require('./colors');

function activateGithubActions() {
  console.info(fgWhite, 'Github Actions activation...');

  if (fs.existsSync('github')) {
    rimraf.sync('.github');
    fs.renameSync('github', '.github');
  }

  console.info(fgWhite, 'Github Actions activation... Completed');
}

module.exports = activateGithubActions;
