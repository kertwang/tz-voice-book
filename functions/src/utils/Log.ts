import * as moment from 'moment';
import { AnyLog } from '../types_rn/LogTypes';
import { eventNames } from 'cluster';
import {shouldLog} from './Env';

//TODO: make more explicit
export function log(logObj: AnyLog)  {
  const anonymous: any = {
    time: moment().toISOString(),
    ...logObj
  }
  console.log(JSON.stringify(anonymous, null, 2));
}

export function maybeLog(...params: string[]) {
  if (!shouldLog) {
    return;
  }

  console.log(...params);
}
