import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

export interface LumberjackApplicationinsightsDriverInternalConfig extends LumberjackLogDriverConfig {
  /**
   * Instrumentation key of resource. Either this or connectionString must be specified.
   */
  readonly instrumentationKey?: string;

  /**
   * Connection string of resource. Either this or instrumentationKey must be specified.
   */
  readonly connectionString?: string;

  /**
   * Console logging level. All logs with a severity level higher
   * than the configured level will be printed to console. Otherwise
   * they are suppressed. Level 3 will print DEBUG, WARNING and CRITICAL logs
   * to console, level 2 will print both CRITICAL and
   * WARNING logs to console, level 1 prints only CRITICAL.
   *
   * Note: Logs sent as telemetry to instrumentation key will also
   * be logged to console if their severity meets the configured loggingConsoleLevel
   *
   * 0: ALL console logging off
   *
   * 1: logs to console: severity >= CRITICAL
   *
   * 2: logs to console: severity >= WARNING
   *
   * 3: logs to console: severity = DEBUG
   */
  readonly loggingLevelConsole?: number;
}
