import { Inject, Injectable } from '@angular/core';

import { LumberjackLogDriver, LumberjackLogDriverLog, LumberjackLogPayload } from '@ngworker/lumberjack';

import { LumberjackApplicationinsightsDriverInternalConfig } from '../configuration/lumberjack-applicationinsights-driver-internal.config';
import { lumberjackApplicationinsightsDriverConfigToken } from '../configuration/lumberjack-applicationinsights-driver.config.token';

@Injectable()
export class LumberjackApplicationinsightsDriver<TPayload extends LumberjackLogPayload | void = void>
  implements LumberjackLogDriver<TPayload> {
  static driverIdentifier = 'LumberjackApplicationinsightsDriver';
  constructor(
    @Inject(lumberjackApplicationinsightsDriverConfigToken)
    public config: LumberjackApplicationinsightsDriverInternalConfig
  ) {}

  logCritical({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logDebug({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logError({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logInfo({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logTrace({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logWarning({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}
}
