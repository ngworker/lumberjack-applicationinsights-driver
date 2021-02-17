import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

export interface LumberjackApplicationinsightsDriverInternalConfig extends LumberjackLogDriverConfig {
  readonly someNeededOption: string;
}
