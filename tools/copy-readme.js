const copy = require('copy');

copy('README.md', 'dist/<organization-hyphen>/<name-hyphen>', (error) => {
  if (error) {
    console.error(`Error when copying README.md: "${errror}"`);

    process.exit(1);
  }
});
