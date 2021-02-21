import { ModuleWithProviders, NgModule } from '@angular/core';

import { LumberjackApplicationinsightsDriverRootModule } from './lumberjack-applicationinsights-driver-root.module';
import { LumberjackApplicationinsightsDriverConfig } from './lumberjack-applicationinsights-driver.config';
import { lumberjackApplicationinsightsDriverConfigToken } from './lumberjack-applicationinsights-driver.config.token';
import { LumberjackApplicationinsightsDriverOptions } from './lumberjack-applicationinsights-driver.options';

@NgModule()
export class LumberjackApplicationinsightsDriverModule {
  /**
   * Pass a full LumberjackApplicationinsightsDriver configuration.
   */
  static forRoot(
    config: LumberjackApplicationinsightsDriverConfig
  ): ModuleWithProviders<LumberjackApplicationinsightsDriverRootModule> {
    return {
      ngModule: LumberjackApplicationinsightsDriverRootModule,
      providers: [
        {
          provide: lumberjackApplicationinsightsDriverConfigToken,
          useValue: config,
        },
      ],
    };
  }

  /**
   * Pass options exclusive to the LumberjackApplicationinsightsDriver configuration, but fall back on
   * the log driver config for common options.
   */
  static withOptions(
    options: LumberjackApplicationinsightsDriverOptions
  ): ModuleWithProviders<LumberjackApplicationinsightsDriverRootModule> {
    return {
      ngModule: LumberjackApplicationinsightsDriverRootModule,
      providers: [
        {
          provide: lumberjackApplicationinsightsDriverConfigToken,
          useValue: options,
        },
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import LumberjackApplicationinsightsDriverModule directly. Use LumberjackApplicationinsightsDriverModule.forRoot.'
    );
  }
}
