import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import {
  LumberjackLogDriverConfig,
  lumberjackLogDriverConfigToken,
  lumberjackLogDriverToken,
} from '@ngworker/lumberjack';

import { LumberjackApplicationinsightsDriver } from '../log-drivers/lumberjack-applicationinsights-driver';

import { LumberjackApplicationinsightsDriverInternalConfig } from './lumberjack-applicationinsights-driver-internal.config';
import { lumberjackApplicationinsightsDriverConfigToken } from './lumberjack-applicationinsights-driver.config.token';

export function lumberjackApplicationinsightsDriverFactory(
  logDriverConfig: LumberjackLogDriverConfig,
  lumberjackApplicationinsightsDriverConfig: LumberjackApplicationinsightsDriverInternalConfig
): LumberjackApplicationinsightsDriver {
  const config: LumberjackApplicationinsightsDriverInternalConfig = {
    ...{ ...logDriverConfig, identifier: LumberjackApplicationinsightsDriver.driverIdentifier },
    ...lumberjackApplicationinsightsDriverConfig,
  };
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: lumberjackApplicationinsightsDriverConfig.instrumentationKey,
      connectionString: lumberjackApplicationinsightsDriverConfig.connectionString,
      loggingLevelConsole: lumberjackApplicationinsightsDriverConfig.loggingLevelConsole,
    },
  });

  return new LumberjackApplicationinsightsDriver(config, appInsights);
}

@NgModule({
  providers: [
    {
      deps: [lumberjackLogDriverConfigToken, lumberjackApplicationinsightsDriverConfigToken],
      multi: true,
      provide: lumberjackLogDriverToken,
      useFactory: lumberjackApplicationinsightsDriverFactory,
    },
  ],
})
export class LumberjackApplicationinsightsDriverRootModule {
  constructor(
    // tslint:disable: no-any no-null-keyword
    @Optional()
    @SkipSelf()
    @Inject(LumberjackApplicationinsightsDriverRootModule)
    maybeNgModuleFromParentInjector: LumberjackApplicationinsightsDriverRootModule = null as any
    // tslint:enable: no-any no-null-keyword
  ) {
    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        'LumberjackApplicationinsightsDriverModule.forRoot registered in multiple injectors. Only call it from your root injector such as in AppModule.'
      );
    }
  }
}
