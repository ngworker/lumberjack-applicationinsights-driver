'use strict';

const { execSync } = require('child_process');

const { fgWhite } = require('./colors');

function commitChanges() {
  console.info(fgWhite, 'Committing changes...');

  execSync('git add . && git commit -m "chore: 🤖  driver init completed"');

  console.info(fgWhite, 'Committing changes... Completed');
}

module.exports = commitChanges;
