import { InjectionToken } from '@angular/core';

import { LumberjackApplicationinsightsDriverInternalConfig } from './lumberjack-applicationinsights-driver-internal.config';

export const lumberjackApplicationinsightsDriverConfigToken: InjectionToken<LumberjackApplicationinsightsDriverInternalConfig> = new InjectionToken(
  '__LUMBERJACK_APPLICATIONINSIGHTS_DRIVER_CONFIG__'
);
