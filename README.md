# @ngworker/lumberjack-applicationinsights-driver

<p align="center">
 <img width="40%" height="40%" src="./logo.svg">
</p>

[Logo by Felipe Zambrano](http://instagram.com/octopez)

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
[![ngworker](https://img.shields.io/badge/ngworker-%40-red)](https://github.com/ngworker/)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

Lumberjack Applicationinsights Driver is a custom log driver for [ngworker/lumberjack](https://github.com/ngworker/lumberjack). It is used to send logs over [Azure Application Insights](https://azure.microsoft.com/en-us/) protocol.

## Features

TODO: Update the features of this driver

- ✅ Logs to Azure Application Insights log store
- ✅ Unit test coverage
- ✅ Prints your DEBUG, WARNING and CRITICAL logs to console
- ✅ Follows Lumberjack Best Practices guide

## Table of Contents

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Wallaby.js](#wallaby.js)
- [Contributors](#contributors)

## Installation

LumberjackApplicationinsightsDriver is published as the `@ngworker/lumberjack-applicationinsights-driver` package.

| Toolchain   | Command                                                       |
| ----------- | ------------------------------------------------------------- |
| Angular CLI | `ng add @ngworker/lumberjack-applicationinsights-driver`      |
| NPM CLI     | `npm install @ngworker/lumberjack-applicationinsights-driver` |
| Yarn CLI    | `yarn add @ngworker/lumberjack-applicationinsights-driver`    |

## Compatibility

`LumberjackApplicationinsightsDriver` has verified compatibility with the following packages versions.

| LumberjackApplicationinsightsDriver | Lumberjack     | @microsoft/applicationinsights-web |
| ----------------------------------- | -------------- | ---------------------------------- |
| 1.0.x                               | ^2.0.0         | ^2.5.11                            |


If the version you are using is not listed, please [raise an issue in our GitHub repository](https://github.com/ngworker/lumberjack-applicationinsights-driver/issues/new).

## Usage

TODO: Verify that these configurations match your driver configurations.

To start using LumberjackApplicationinsightsDriver, import it in your root or core Angular module along with Lumberjack.

```ts
import { NgModule } from '@angular/core';
import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackApplicationinsightsDriver } from '@ngworker/lumberjack-applicationinsights-driver';

@NgModule({
  imports: [
    LumberjackModule.forRoot({
      levels: [LumberjackLevel.Verbose],
    }),
    LumberjackApplicationinsightsDriver.forRoot({
      levels: [LumberjackLevel.Critical, LumberjackLevel.Error],
      instrumentationKey: environment.appInsights.instrumentationKey,
      loggingLevelConsole: 3,
    }),
    // (...)
  ],
  // (...)
})
export class AppModule {}
```

Now you can start using the `LumberjackService` or extend `LumberjackLogger` and they will automatically use the `LumberjackApplicationinsightsDriver`.

## Configuration

TODO: Here it is explained how this custom driver can be configured.
To use the Application Insights you must provide or `instrumentationKey`, or `connectionString` in the configuration object provided in `forRoot`. Additionally you can specify `loggingLevelConsole`.

| Setting              | Description
|----------------------|----------------
| `instrumentationKey`  | Instrumentation key of resource. Either this or connectionString must be specified.
| `connectionString`    | Connection string of resource. Either this or instrumentationKey must be specified.
| `loggingLevelConsole` | Console logging level. All logs with a severity level higher than the configured level will be printed to console. Otherwise they are suppressed. Level 3 will print DEBUG, WARNING and CRITICAL logs to console, level 2 will print both CRITICAL and WARNING logs to console, level 1 prints only CRITICAL.


## Wallaby.js

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

Contributors to this repository are welcome to use the
[Wallaby.js OSS License](https://wallabyjs.com/oss/) to get
test results immediately as you type, and see the results in
your editor right next to your code.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
