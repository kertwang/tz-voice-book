import { PageParams, BlockId, BotId } from "./TwilioTypes";

export enum LogType {
  BLOCK = 'BLOCK',
  FEEDBACK = 'FEEDBACK',
  PENDING_MESSAGE = 'PENDING_MESSAGE',
  POST_MESSAGE = 'POST_MESSAGE',
  TWILIO_API_REQUEST = 'TWILIO_API_REQUEST',
  TWILIO_API_RESPONSE = 'TWILIO_API_RESPONSE',
  DIALOG_FLOW_INTENT = 'DIALOG_FLOW_INTENT',
}

export type AnyLog =
  BlockLog |
  FeedbackLog |
  PendingMessageLog |
  PostMessageLog |
  TwilioApiRequestLog |
  TwilioApiResponseLog |
  DialogFlowIntentLog;

export type BlockLog = {
  type: LogType.BLOCK,
  botId: BotId,
  callSid: string,
  blockId: BlockId,
  mobile: string,
  pageParams: PageParams,
}

export type FeedbackLog = {
  type: LogType.FEEDBACK,
  botId: BotId,
  pendingId: string,
  callSid: string,
  url: string,
}

export type PendingMessageLog = {
  type: LogType.PENDING_MESSAGE,
  botId: BotId,
  pendingId: string,
  callSid: string,
  url: string,
}

export type PostMessageLog = {
  type: LogType.POST_MESSAGE,
  botId: BotId,
  recordingId: string,
  callSid: string,
  url: string,
}

export type TwilioApiRequestLog = {
  type: LogType.TWILIO_API_REQUEST,
  botId: BotId,
  method: string,
  params: any,
}

export type TwilioApiResponseLog = {
  type: LogType.TWILIO_API_RESPONSE,
  botId: BotId,
  method: string,
  response: any,
}

export type DialogFlowIntentLog = {
  type: LogType.DIALOG_FLOW_INTENT,
  intent: string,
  sessionId: string,
}