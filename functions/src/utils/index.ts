import { BlockId, GatherResult, PageParams, BotId, VersionId } from "../types_rn/TwilioTypes";
//@ts-ignore
import * as format from 'xml-formatter';
import { isNullOrUndefined } from "util";

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


export function getBotId(maybeBotId: string): BotId {
  //@ts-ignore
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
      return VersionId.en_text;
    }
    case BotId.senegalMobileMoney: {
      //TODO: Change this.
      return VersionId.en_text;
    }

    //TODO: Add new bots here
    case BotId.rungweDeposit: 
    case BotId.rungweIntro: 
    case BotId.rungwePaymentDate: 
    case BotId.rungwePaymentNotification: {
      return VersionId.en_text
    }
    default: {
      // throw new Error(`No Default version specified for botId: ${botId}`);
      console.log(`WARN: getDefaultVersionForBot(), No Default version specified for botId: ${botId}. Returning en_text`);
      return VersionId.en_text;
    }
  }
}

export function pathToBlock(path: string): BlockId {
  const sanitized = path.replace(/\/$/, "");
  const key = sanitized.substr(sanitized.lastIndexOf("/") + 1)

  //@ts-ignore
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

export function sleep(ms: number) {
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
export const saftelyGetPageParamsOrDefaults = (params: any): PageParams => {
  const page = params.page ? parseInt(params.page) : 0;
  let pageSize = params.pageSize ? parseInt(params.pageSize) : 3;
  let maxMessages = params.maxMessages ? parseInt(params.maxMessages) : 10;
  let versionOverride = params.versionOverride;

  //Also handle shitty twilio url encoded params :(
  if (params['amp;pageSize']) {
    pageSize = parseInt(params['amp;pageSize'])
  }

  if (params['amp;maxMessages']) {
    maxMessages = parseInt(params['amp;maxMessages'])
  }

  //TODO: we need to test this...
  if (params['amp;versionOverride']) {
    versionOverride = params['amp;versionOverride'];
  }

  return {
    page,
    pageSize,
    maxMessages,
    versionOverride,
  };
}


/**
 * Get the user's mobile from the twilio request object
 * 
 * Throws if the necessary params aren't found
 */
export const getUserMobile = (body: any): string => {
  const from = body.From;
  const to = body.To;
  const direction = body.Direction;

  if (!from || !to || !direction) {
    throw new Error("Invalid Twilio request body. from, to and direction is required");
  }

  if (direction === 'outbound-api') {
    return to;
  }

  return from;
}

/**
 * saftelyGetDynamicParamsOrEmpty
 * 
 * Get the params from the request and format them.
 * Returns an empty array if no params are found
 * 
 * @param params the raw params from the request object
 */
export const saftelyGetDynamicParamsOrEmpty = (params: any): string[] => {
  let safeParams: any[] = [];
  const rawParams = params.dynamicParams;
  if (!rawParams) {
    return safeParams;
  }

  //TD: TODO: this is a security risk!
  try {
    const parsed = JSON.parse(rawParams);
    if (typeof parsed === 'object' && Array.isArray(parsed)) {
      safeParams = parsed;
    }
  } catch(err) {    
    throw {
      status: 400,
      message: "Couldn't parse the dynamicParams. Ensure it is a valid JSON Array."
    }
  }

  return safeParams;
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
  //eg. https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/recordingCallback/message
  return `${b.baseUrl}${b.recordingCallback}`;
}

const buildGatherCallbackUrl = (b: GatherUrlBuilder): string => {
  //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
  let url = `${b.baseUrl}/twiml/${b.botId}/gather/${b.blockName}`;
  if (!isNullOrUndefined(b.versionOverride)) {
    url += `?versionOverride=${b.versionOverride}`;
  }
  return url;
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
  console.log("buildingUrl", builder);
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

export function getBoolean(value: any) {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}

export function buildExpectedToken(username: string, password: string) {
  const encoded = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${encoded}`
}

/**
 * Format a mobile string to an international number
 * 
 * If the number starts with a '+', the formatter will figure out 
 * the country code, and will return the international format of the number.
 * 
 * If the number is international, but doesn't start with a '+'
 * (for example 16501111234 instead of +16501111234), the country will default
 * to the given country.
 * 
 */
export function formatMobile(unformatted: string, country: string) {
  const parsed = phoneUtil.parse(unformatted, country);
  return `+${parsed.getCountryCode()}${parsed.getNationalNumber()}`;
}


/**
 * functionReplacer
 * 
 * Serialize a function as a JSON String
 */
export const functionReplacer = (name: any, val: any) => {
  if (typeof val === 'function') {
    const entire = val.toString();
    const arg = entire.slice(entire.indexOf("(") + 1, entire.indexOf(")"));
    const body = entire
      .slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"))
      //If we ever have another dynamic message type, this will break.
      .replace(/(type: .*.MessageType.SAY)/g, "type: 'SAY'")
      .replace(/(type: .*.MessageType.PLAY)/g, "type: 'PLAY'")
    return {
      type: 'function',
      arguments: arg,
      body,
    };
  }

  return val;
}

/**
 * functionReviver
 *
 * Deserialize a function from JSON String to actual function
 */
export const functionReviver = (name: any, val: any) => {

  if (typeof val === 'object' && val.type === 'function') {
    console.log("Reviving function, ", val);
    return new Function(val.arguments, val.body);
  }

  return val;
}