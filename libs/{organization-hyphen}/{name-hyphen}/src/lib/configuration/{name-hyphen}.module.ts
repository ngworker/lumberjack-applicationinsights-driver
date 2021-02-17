import { ModuleWithProviders, NgModule } from '@angular/core';

import { <name-camel>ConfigToken } from './<name-hyphen>.config.token';
import { <name-capitalize-united>Config } from './<name-hyphen>.config';
import { <name-capitalize-united>Options } from './<name-hyphen>.options';
import { <name-capitalize-united>RootModule } from './<name-hyphen>-root.module';

@NgModule()
export class <name-capitalize-united>Module {
  /**
   * Pass a full <name-capitalize-united> configuration.
   */
  static forRoot(config: <name-capitalize-united>Config): ModuleWithProviders<<name-capitalize-united>RootModule> {
    return {
      ngModule: <name-capitalize-united>RootModule,
      providers: [
        {
          provide: <name-camel>ConfigToken,
          useValue: config,
        },
      ],
    };
  }

  /**
   * Pass options exclusive to the <name-capitalize-united> configuration, but fall back on
   * the log driver config for common options.
   */
  static withOptions(options: <name-capitalize-united>Options): ModuleWithProviders<<name-capitalize-united>RootModule> {
    return {
      ngModule: <name-capitalize-united>RootModule,
      providers: [
        {
          provide: <name-camel>ConfigToken,
          useValue: options,
        },
      ],
    };
  }

  constructor() {
    throw new Error('Do not import <name-capitalize-united>Module directly. Use <name-capitalize-united>Module.forRoot.');
  }
}
