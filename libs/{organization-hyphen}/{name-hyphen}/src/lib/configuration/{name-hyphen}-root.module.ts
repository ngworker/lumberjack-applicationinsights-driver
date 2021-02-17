import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { LumberjackLogDriverConfig, lumberjackLogDriverConfigToken, lumberjackLogDriverToken } from '@ngworker/lumberjack';

import { <name-capitalize-united> } from '../log-drivers/<name-hyphen>';

import { <name-camel>ConfigToken } from './<name-hyphen>.config.token';
import { <name-capitalize-united>InternalConfig } from './<name-hyphen>-internal.config';

export function <name-camel>Factory(
  logDriverConfig: LumberjackLogDriverConfig,
  <name-camel>Config: <name-capitalize-united>InternalConfig
): <name-capitalize-united> {
  const config: <name-capitalize-united>InternalConfig = {
    ...{ ...logDriverConfig, identifier: <name-capitalize-united>.driverIdentifier },
    ...<name-camel>Config,
  };

  return new <name-capitalize-united>(config);
}

@NgModule({
  providers: [
    {
      deps: [lumberjackLogDriverConfigToken, <name-camel>ConfigToken],
      multi: true,
      provide: lumberjackLogDriverToken,
      useFactory: <name-camel>Factory,
    },
  ],
})
export class <name-capitalize-united>RootModule {
  constructor(
    // tslint:disable: no-any no-null-keyword
    @Optional()
    @SkipSelf()
    @Inject(<name-capitalize-united>RootModule)
    maybeNgModuleFromParentInjector: <name-capitalize-united>RootModule = null as any
    // tslint:enable: no-any no-null-keyword
  ) {
    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        '<name-capitalize-united>Module.forRoot registered in multiple injectors. Only call it from your root injector such as in AppModule.'
      );
    }
  }
}
