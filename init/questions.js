'use strict';

const questions = [
  {
    type: 'input',
    name: 'organization-name',
    message: 'Enter the name of the organization',
    validate: function (value) {
      var pass = value.match(/^([a-z]*[\-]?[a-z]+)*$/g);
      if (pass && value) {
        return true;
      }

      return 'Please enter a valid organization name. Expected case is "hyphen-case"';
    },
    default: 'ngworker',
  },
  {
    type: 'input',
    name: 'driver-name',
    message: 'Enter the name of the driver. Example: "lumberjack-firebase-driver"',
    validate: function (value) {
      var pass = value.match(/^([a-z]*[\-]?[a-z]+)*$/g);
      if (pass && value) {
        return true;
      }

      return 'Please enter a valid driver name. Expected case is "hyphen-case"';
    },
  },
  {
    type: 'rawlist',
    name: 'package-manager',
    message: 'Which package manager do you want to use',
    choices: ['yarn', 'npm'],
  },
];

module.exports = questions;
