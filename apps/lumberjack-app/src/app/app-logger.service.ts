import { Injectable, VERSION } from '@angular/core';

import { LumberjackService, LumberjackTimeService, ScopedLumberjackLogger } from '@ngworker/lumberjack';

import { LogPayload } from './log-payload';

@Injectable({
  providedIn: 'root',
})
export class AppLogger extends ScopedLumberjackLogger<LogPayload> {
  private static payload: LogPayload = {
    angularVersion: VERSION.full,
  };

  public scope = 'Forest App';

  constructor(lumberjack: LumberjackService<LogPayload>, time: LumberjackTimeService) {
    super(lumberjack, time);
  }

  forestOnFire = this.createCriticalLogger('The forest is on fire').build();

  helloForest = this.createInfoLogger('HelloForest').withPayload(AppLogger.payload).build();

  trace(message: string, payload: LogPayload): void {
    const builder = this.createTraceLogger(message).build();
    builder(payload);
  }

  debug(message: string, payload: LogPayload): void {
    const builder = this.createDebugLogger(message).build();
    builder(payload);
  }

  info(message: string, payload: LogPayload): void {
    const builder = this.createInfoLogger(message).build();
    builder(payload);
  }

  error(message: string, payload: LogPayload): void {
    const builder = this.createErrorLogger(message).build();
    builder(payload);
  }

  warning(message: string, payload: LogPayload): void {
    const builder = this.createWarningLogger(message).build();
    builder(payload);
  }

  critical(message: string, payload: LogPayload): void {
    const builder = this.createCriticalLogger(message).build();
    builder(payload);
  }
}
