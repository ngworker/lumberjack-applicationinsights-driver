'use strict';

const { execSync } = require('child_process');

const { fgWhite } = require('./colors');

function fixLintIssues(packageManager) {
  console.info(fgWhite, 'Fixing linting issue...');

  if (packageManager === 'npm') {
    execSync('npm run lint -- --fix');
  } else {
    execSync('yarn lint --fix');
  }

  console.info(fgWhite, 'Fixing linting issue... Completed');
}

module.exports = fixLintIssues;
