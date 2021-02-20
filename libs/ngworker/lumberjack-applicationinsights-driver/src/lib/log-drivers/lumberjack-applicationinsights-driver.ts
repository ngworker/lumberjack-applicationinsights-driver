import { Inject, Injectable } from '@angular/core';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';

import { LumberjackLogDriver, LumberjackLogDriverLog, LumberjackLogPayload } from '@ngworker/lumberjack';

import { LumberjackApplicationinsightsDriverInternalConfig } from '../configuration/lumberjack-applicationinsights-driver-internal.config';
import { lumberjackApplicationinsightsDriverConfigToken } from '../configuration/lumberjack-applicationinsights-driver.config.token';

@Injectable()
export class LumberjackApplicationinsightsDriver<TPayload extends LumberjackLogPayload | void = void>
  implements LumberjackLogDriver<TPayload> {
  static driverIdentifier = 'LumberjackApplicationinsightsDriver';

  constructor(
    @Inject(lumberjackApplicationinsightsDriverConfigToken)
    public config: LumberjackApplicationinsightsDriverInternalConfig,
    private readonly appInsights: ApplicationInsights
  ) {
    this.appInsights.loadAppInsights();
  }

  /**
   * For failures that require immediate attention.
   * Examples: data loss scenarios, application crash.
   *
   * If you set the `payload` equals to the instanse of `Error`,
   * you will find these records in `exceptions` and `traces` folders
   * of Application Insights.
   *
   * Setting `loggingLevelConsole` in configuration to more than 0
   * will print log in console as well.
   */
  logCritical({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    if (this.config.loggingLevelConsole && this.config.loggingLevelConsole > 0) {
      console.error(formattedLog, '\r\n', log.payload);
    }
    this.appInsights.trackTrace(
      {
        message: log.message,
        severityLevel: SeverityLevel.Critical,
      },
      log
    );
    if (log.payload instanceof Error) {
      this.appInsights.trackException({
        exception: log.payload,
        severityLevel: SeverityLevel.Critical,
      });
    }
  }

  /**
   * For debugging and development. Use with caution in production due to the high volume.
   * Setting `loggingLevelConsole` in configuration to 3 will print log in console as well.
   */
  logDebug({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    if (this.config.loggingLevelConsole === 3) {
      console.debug(formattedLog, '\r\n', log);
    }
    this.appInsights.trackTrace(
      {
        message: log.message,
        severityLevel: SeverityLevel.Verbose,
      },
      log
    );
  }

  /**
   * For errors and exceptions that cannot be handled.
   * These messages indicate a failure in the current operation
   * or request, not an app-wide failure.
   *
   * Look for these records in `exceptions` folder of Application Insights.
   */
  logError({ log }: LumberjackLogDriverLog<TPayload>): void {
    this.appInsights.trackException({
      exception: log.payload instanceof Error ? log.payload : new Error(log.message),
      severityLevel: SeverityLevel.Error,
    });
  }

  /**
   * Tracks the general flow of the app. May have long-term value.
   */
  logInfo({ log }: LumberjackLogDriverLog<TPayload>): void {
    this.appInsights.trackTrace(
      {
        message: log.message,
        severityLevel: SeverityLevel.Information,
      },
      log
    );
  }

  /**
   * Contain the most detailed messages. These messages may contain sensitive app data.
   * Avoid using it in production.
   */
  logTrace({ log }: LumberjackLogDriverLog<TPayload>): void {
    this.appInsights.trackTrace(
      {
        message: log.message,
        severityLevel: SeverityLevel.Verbose,
      },
      log
    );
  }

  /**
   * For abnormal or unexpected events. Typically includes
   * errors or conditions that don't cause the app to fail.
   *
   * Setting `loggingLevelConsole` in configuration to more than 1
   * will print log in console as well.
   */
  logWarning({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    if (this.config.loggingLevelConsole && this.config.loggingLevelConsole > 1) {
      console.warn(formattedLog, '\r\n', log);
    }
    this.appInsights.trackTrace(
      {
        message: log.message,
        severityLevel: SeverityLevel.Warning,
      },
      log
    );
  }
}
