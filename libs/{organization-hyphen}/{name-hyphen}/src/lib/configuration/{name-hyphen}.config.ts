import { <name-capitalize-united>InternalConfig } from './<name-hyphen>-internal.config';

export type <name-capitalize-united>Config = Omit<<name-capitalize-united>InternalConfig, 'identifier'> &
  Partial<Pick<<name-capitalize-united>InternalConfig, 'identifier'>>;
