import { Block, GatherResult } from "../types/TwilioRouter";
import * as format from 'xml-formatter';


export function pathToBlock(path: string): Block {

  const sanitized = path
    .replace('/gather/', '')
    .replace('/', '');
  
  return Block[sanitized];
}

export function logGatherBlock(block: Block, result: GatherResult) {
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