import { Block } from "../apis/TwilioRouter";

export function pathToBlock(path: string): Block {

  const sanitized = path
    .replace('/gather/', '')
    .replace('/', '');
  
  return Block[sanitized];
}