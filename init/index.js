'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');

const questions = require('./questions');
const { fgRed, fgGreen, fgYellow, fgWhite } = require('./colors');
const fixLintIssues = require('./fix-lint-issues');
const commitChanges = require('./commit-changes');
const installPackages = require('./install-packages');
const { createTokens } = require('./tokenizer');

async function init() {
  if (fs.existsSync(path.join(process.cwd(), '~package.json'))) {
    console.info(fgWhite, 'Getting everything ready...');

    installPackages();

    const inquirer = require('inquirer');

    const answers = await inquirer.prompt(questions);
    const driverName = answers['driver-name'];
    const organizationName = answers['organization-name'];
    const packageManager = answers['package-manager'];

    console.info(fgYellow, '\nPlease be patient. This will take a couple of minutes ⏳\n');

    const calculatedTokens = createTokens(driverName, organizationName, packageManager);

    const replaceFileNames = require('./replace-file-names');
    replaceFileNames(process.cwd(), calculatedTokens);

    const restorePackageJson = require('./restore-package-json');
    restorePackageJson();

    const activateGithubActions = require('./activate-github-actions');
    activateGithubActions();

    installPackages(packageManager);

    fixLintIssues(packageManager);

    commitChanges();

    console.info(fgGreen, '✅ Success: You can now implement your driver 🚀\n');
  } else {
    console.error(
      fgRed,
      '🔥 Error: The template is in an unstable state.\n\n Possible Fixes: - Revert the changes.\n                 - Clone the repository again.\n                 - Execute the script from the template root'
    );
  }
}

init();
