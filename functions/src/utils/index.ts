import { BlockId, GatherResult } from "../types_rn/TwilioRouter";
import * as format from 'xml-formatter';


export function pathToBlock(path: string): BlockId {

  const sanitized = path
    .replace('/gather/', '')
    .replace('/', '');
  
  return BlockId[sanitized];
}

export function logGatherBlock(block: any, result: GatherResult) {
  if (process.env.VERBOSE_LOG !== 'true') {
    return;
  }

  console.log(`GATHER ${block}: '${result.speechResult}' @ ${result.confidence}%`);
}

export function logTwilioResponse(xmlString: string) {
  if (process.env.LOG_TWILIO_RESPONSE !== 'true') {
    return;
  }

  console.log(`TWILIO Response: \n ${format(xmlString)}`);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}