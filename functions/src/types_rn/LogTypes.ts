import { BlockId } from "./BenchmarkRouter";
import { PageParams } from "./TwilioTypes";

export enum LogType {
  BLOCK = 'BLOCK',
  FEEDBACK = 'FEEDBACK',
  PENDING_MESSAGE = 'PENDING_MESSAGE',
  POST_MESSAGE = 'POST_MESSAGE',
  TWILIO_API_REQUEST = 'TWILIO_API_REQUEST',
  TWILIO_API_RESPONSE = 'TWILIO_API_RESPONSE',
}

export type AnyLog =
  BlockLog |
  FeedbackLog |
  PendingMessageLog |
  PostMessageLog |
  TwilioApiRequestLog |
  TwilioApiResponseLog;

export type BlockLog = {
  type: LogType.BLOCK,
  callSid: string,
  blockId: BlockId,
  mobile: string,
  pageParams: PageParams,
}

export type FeedbackLog = {
  type: LogType.FEEDBACK,
  pendingId: string,
  callSid: string,
  url: string,
}

export type PendingMessageLog = {
  type: LogType.PENDING_MESSAGE,
  pendingId: string,
  callSid: string,
  url: string,
}

export type PostMessageLog = {
  type: LogType.POST_MESSAGE,
  recordingId: string,
  callSid: string,
  url: string,
}

export type TwilioApiRequestLog = {
  type: LogType.TWILIO_API_REQUEST,
  method: string,
  params: any,
}

export type TwilioApiResponseLog = {
  type: LogType.TWILIO_API_RESPONSE,
  method: string,
  response: any,
}