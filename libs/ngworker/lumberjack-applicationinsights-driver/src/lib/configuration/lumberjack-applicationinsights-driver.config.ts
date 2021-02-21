import { LumberjackApplicationinsightsDriverInternalConfig } from './lumberjack-applicationinsights-driver-internal.config';

export type LumberjackApplicationinsightsDriverConfig = Omit<
  LumberjackApplicationinsightsDriverInternalConfig,
  'identifier'
> &
  Partial<Pick<LumberjackApplicationinsightsDriverInternalConfig, 'identifier'>>;
