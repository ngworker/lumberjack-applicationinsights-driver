import { LumberjackLogPayload } from '@ngworker/lumberjack';

export interface LogPayload extends LumberjackLogPayload {
  angularVersion?: string;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
