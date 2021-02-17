import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

import { <name-capitalize-united>InternalConfig } from './<name-hyphen>-internal.config';

export type <name-capitalize-united>Options = Omit<<name-capitalize-united>InternalConfig, keyof LumberjackLogDriverConfig> & Partial<LumberjackLogDriverConfig>;
