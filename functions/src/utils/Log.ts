import * as moment from 'moment';
import { AnyLog } from '../types_rn/LogTypes';

//TODO: make more explicit
export function log(logObj: AnyLog)  {
  const anonymous: any = {
    time: moment().toISOString(),
    ...logObj
  }
  console.log(JSON.stringify(anonymous));
}