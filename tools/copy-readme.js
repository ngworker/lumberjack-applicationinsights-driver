const copy = require('copy');

copy('README.md', 'dist/ngworker/lumberjack-applicationinsights-driver', (error) => {
  if (error) {
    console.error(`Error when copying README.md: "${errror}"`);

    process.exit(1);
  }
});
