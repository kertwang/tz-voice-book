import { BlockId, GatherResult, PageParams } from "../types_rn/TwilioTypes";
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

export const generateUrl = (urlPrefix: string, path: string, firebaseToken: string) => {
  //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
  return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
} 

/**
 * Use this to inject pagination where we don't have it set up
 * This is really less than ideal, and we need to find a better way.
 */
export const saftelyGetPageParamsOrDefaults = (params): PageParams => {
  console.log('params are', params);

  const page = params.page ? parseInt(params.page) : 0;
  let pageSize = params.page ? parseInt(params.pageSize) : 1;
  let maxMessages = params.page ? parseInt(params.maxMessages) : 10;

  //Also handle shitty twilio url encoded params :(
  if (params['amp;pageSize']) {
    pageSize = parseInt(params['amp;pageSize'])
  }

  if (params['amp;maxMessages']) {
    maxMessages = parseInt(params['amp;maxMessages'])
  }

  return {
    page,
    pageSize,
    maxMessages,
  };
}