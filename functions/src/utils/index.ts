import { BlockId, GatherResult, PageParams, BotId, VersionId } from "../types_rn/TwilioTypes";
import * as format from 'xml-formatter';
import { VerifyOptions } from "jsonwebtoken";


export function getBotId(maybeBotId: string): BotId {
  const botId = BotId[maybeBotId];
  if (!botId) {
    throw new Error(`Could not find botId for ${maybeBotId}`);
  }

  return botId;
}

export function getDefaultVersionForBot(botId: BotId): VersionId {
  switch(botId) {
    case BotId.voicebook: {
      return VersionId.tz_audio;
    }
    case BotId.senegalNotification: {
      //TODO: Change this.
      return VersionId.en_au;
    }
    default: {
      throw new Error(`No Default version specified for botId: ${botId}`);
    }
  }
}

export function pathToBlock(path: string): BlockId {
  const sanitized = path.replace(/\/$/, "");
  const key = sanitized.substr(sanitized.lastIndexOf("/") + 1)
  
  const blockId = BlockId[key];
  if (!blockId) {
    throw new Error(`Could not find blockId from path: ${path}`);
  }

  return blockId;
}

export function logGatherBlock(block: any, result: GatherResult) {
  if (process.env.VERBOSE_LOG !== 'true') {
    return;
  }

  console.log(`GATHER ${block}: '${result.speechResult}' @ ${result.confidence}%`);
}

export function logTwilioResponse(xmlString: string) {
  //TODO: make a cloud function config
  // if (process.env.LOG_TWILIO_RESPONSE !== 'true') {
  //   return;
  // }

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
  let pageSize = params.pageSize ? parseInt(params.pageSize) : 1;
  let maxMessages = params.maxMessages ? parseInt(params.maxMessages) : 10;
  let versionOverride = params.versionOverride ? (params.maxMessages) : null;

  //Also handle shitty twilio url encoded params :(
  if (params['amp;pageSize']) {
    pageSize = parseInt(params['amp;pageSize'])
  }

  if (params['amp;maxMessages']) {
    maxMessages = parseInt(params['amp;maxMessages'])
  }

  //TODO: we need to test this...
  if (params['amp;versionOverride']) {
    versionOverride = params['amp;maxMessages'];
  }


  return {
    page,
    pageSize,
    maxMessages,
    versionOverride,
  };
}

export enum NextUrlType {
  PaginatedUrl = 'PaginatedUrl',
  DefaultUrl = 'DefaultUrl',
  RecordingCallbackUrl = 'RecordingCallbackUrl',
  GatherUrl = 'GatherUrl',
  PaginatedGatherUrl = 'PaginatedGatherUrl',
}


export type NextUrlBuilder = 
  PaginatedUrlBuilder | 
  DefaultUrlBuilder | 
  RecordingCallbackUrlBuilder |
  GatherUrlBuilder |
  PaginatedGatherUrlBuilder;

export type PaginatedUrlBuilder = {
  type: NextUrlType.PaginatedUrl,
  baseUrl: string,
  botId: BotId,
  blockName: BlockId,
  
  nextPageNo: number,
  pageSize: number,
  maxMessages: number,
  
  versionOverride: VersionId | null,
}

export type DefaultUrlBuilder = {
  type: NextUrlType.DefaultUrl,
  baseUrl: string,
  botId: BotId,
  blockName: BlockId,

  versionOverride: VersionId | null,
}

export type RecordingCallbackUrlBuilder = {
  type: NextUrlType.RecordingCallbackUrl,
  baseUrl: string,
  botId: BotId,
  recordingCallback: string,
}

export type GatherUrlBuilder = {
  type: NextUrlType.GatherUrl,
  baseUrl: string,
  botId: BotId,
  blockName: BlockId,

  versionOverride: VersionId | null,
}

export type PaginatedGatherUrlBuilder = {
  type: NextUrlType.PaginatedGatherUrl,
  baseUrl: string,
  botId: BotId,
  blockName: BlockId,

  nextPageNo: number,
  pageSize: number,
  maxMessages: number,

  versionOverride: VersionId | null,
}


/**
 * Make a magical paginated url
 */
const buildPaginatedUrl = (b: PaginatedUrlBuilder): string => {
  const url = `${b.baseUrl}/twiml/${b.botId}/${b.blockName}?page=${b.nextPageNo}\&pageSize=${b.pageSize}\&maxMessages=${b.maxMessages}`;
  if (!b.versionOverride) {
    return url;
  }

  return `${url}\&versionOverride=${b.versionOverride}`;
}

const buildVersionOverrideUrl = (b: DefaultUrlBuilder): string => {
  if (!b.versionOverride) {
    return `${b.baseUrl}/twiml/${b.botId}/${b.blockName}`;  
  }

  return `${b.baseUrl}/twiml/${b.botId}/${b.blockName}?versionOverride=${b.versionOverride}`;
}

const buildRecordingCallbackUrl = (b: RecordingCallbackUrlBuilder): string => {
  return `${b.baseUrl}/twiml/${b.botId}/${b.recordingCallback}`;
}

const buildGatherCallbackUrl = (b: GatherUrlBuilder): string => {
  //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,

  return `${b.baseUrl}/twiml/${b.botId}/gather/${b.blockName}?versionOverride=${b.versionOverride}`;
}

const buildPaginatedGatherCallbackUrl = (b: PaginatedGatherUrlBuilder): string => {
  //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,

  const url = `${b.baseUrl}/twiml/${b.botId}/gather/${b.blockName}?page=${b.nextPageNo}\&pageSize=${b.pageSize}\&maxMessages=${b.maxMessages}`;
  if (!b.versionOverride) {
    return url;
  }

  return `${url}\&versionOverride=${b.versionOverride}`;

}


export function buildRedirectUrl(builder: NextUrlBuilder): string {
  switch(builder.type) {
    case NextUrlType.PaginatedUrl: return buildPaginatedUrl(builder)
    case NextUrlType.DefaultUrl: return buildVersionOverrideUrl(builder)
    case NextUrlType.RecordingCallbackUrl: return buildRecordingCallbackUrl(builder)
    case NextUrlType.GatherUrl: return buildGatherCallbackUrl(builder)
    case NextUrlType.PaginatedGatherUrl: return buildPaginatedGatherCallbackUrl(builder)
    default: {
      const _exhaustiveMatch: never = builder;
      throw new Error(`Non-exhausive match for path: ${_exhaustiveMatch}`);
    }
  }
}