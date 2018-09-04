import { Block, GatherResult } from "../apis/TwilioRouter";

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

  console.log(`GATHER ${block}: ${result.speechResult} @ ${result.confidence}%`);
}