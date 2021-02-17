import { Inject, Injectable } from '@angular/core';
import { LumberjackLogDriver, LumberjackLogDriverLog, LumberjackLogPayload } from '@ngworker/lumberjack';

import { <name-camel>ConfigToken } from '../configuration/<name-hyphen>.config.token';
import { <name-capitalize-united>InternalConfig } from '../configuration/<name-hyphen>-internal.config';

@Injectable()
export class <name-capitalize-united><TPayload extends LumberjackLogPayload | void = void> implements LumberjackLogDriver<TPayload> {
  static driverIdentifier = '<name-capitalize-united>'
  constructor(@Inject(<name-camel>ConfigToken) public config: <name-capitalize-united>InternalConfig) {}

  logCritical({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logDebug({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logError({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logInfo({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logTrace({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}

  logWarning({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {}
}
