import moment from 'moment';
import { AnyLog } from '../types_rn/LogTypes';
import {shouldLog} from './Env';

export function log(logObj: AnyLog)  {
  if (!shouldLog) {
    return;
  }
  
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
