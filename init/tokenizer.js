'use strict';

const capitalizedToken = '<name-capitalize>';
const hyphenToken = '<name-hyphen>';
const hyphenFileToken = '{name-hyphen}';
const capitalizedUnitedToken = '<name-capitalize-united>';
const lowercaseToken = '<name-lowercase>';
const camelToken = '<name-camel>';
const uppercaseUnderscoreToken = '<name-uppercase-underscore>';
const organizationHyphenToken = '<organization-hyphen>';
const packageManagerToken = '<package-manager>';
const packageManagerInstallToken = '<package-manager-install>';
const organizationHyphenFileToken = '{organization-hyphen}';
const scriptEscapeArgumentsToken = '<script-escape-arguments>';

function createTokens(driverName, organizationName, packageManager) {
  const splittedName = driverName.split('-');
  const capitalizedName = splittedName.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
  const hyphenName = driverName;
  const capitalizedUnitedName = splittedName.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
  const lowercaseName = splittedName.map((name) => name.toLowerCase()).join(' ');
  const camelName = splittedName
    .map((name, index) => (index != 0 ? name.charAt(0).toUpperCase() + name.slice(1) : name))
    .join('');
  const uppercaseUnderscoreName = splittedName.map((name) => name.toUpperCase()).join('_');
  const packageManagerCommand = packageManager === 'npm' ? 'npm run' : packageManager;
  const packageManagerInstall = packageManager === 'npm' ? 'npm install' : packageManager;
  const scriptEscapeArguments = packageManager === 'npm' ? '-- ' : '';

  return {
    driverName,
    organizationName,
    capitalizedName,
    hyphenName,
    lowercaseName,
    camelName,
    uppercaseUnderscoreName,
    capitalizedUnitedName,
    packageManager: packageManagerCommand,
    packageManagerInstall,
    scriptEscapeArguments,
  };
}

module.exports = {
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
  createTokens,
};
