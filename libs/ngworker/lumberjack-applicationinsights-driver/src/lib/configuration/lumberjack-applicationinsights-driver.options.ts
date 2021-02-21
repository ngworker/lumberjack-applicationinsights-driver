import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

import { LumberjackApplicationinsightsDriverInternalConfig } from './lumberjack-applicationinsights-driver-internal.config';

export type LumberjackApplicationinsightsDriverOptions = Omit<
  LumberjackApplicationinsightsDriverInternalConfig,
  keyof LumberjackLogDriverConfig
> &
  Partial<LumberjackLogDriverConfig>;
