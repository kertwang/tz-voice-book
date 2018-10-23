import FirebaseApi from "../apis/FirebaseApi";
import { Gather } from "twilio/lib/twiml/VoiceResponse";

/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 * 
 * //TODO: how do we abstract this away for blocks of new bots?
 * //I think we need a new namespace on top of this
 */
export enum BlockId {
  entrypoint = 'entrypoint',
  intro_0 = 'intro_0',
  listen_0 = 'listen_0',
  listen_playback = 'listen_playback',
  listen_end = 'listen_end',
  listen_end_error = 'listen_end_error',
  listen_feedback = 'listen_feedback',
  listen_feedback_complete = 'listen_feedback_complete',
  error_0 = 'error_0',
  info_0 = 'info_0',
  record_0 = 'record_0',
  record_playback = 'record_playback',
  record_post_or_delete = 'record_post_or_delete',
  record_save = 'record_save',
  record_delete ='record_delete',
  record_post_or_delete_error = 'record_post_or_delete_error',
}

/**
 * Flow Types:
 */

export type FlowMap = {
  [k in BlockId]: DefaultFlow | GatherFlow
}

export enum FlowType {
  DEFAULT = 'DEFAULT',
  GATHER = 'GATHER',
}

/* Describes a normal flow which transitions without action */
export interface DefaultFlow {
  next: BlockId,
  type: FlowType.DEFAULT,
}

/* Describes a flow which handles a gather action*/
export interface GatherFlow {
  type: FlowType.GATHER,
  error: BlockId,
  // matches: FlowMatch[], //TODO: change
  digitMatches: DigitMatch[],
}

export type FlowMatch = {
  term: string,
  nextBlock: BlockId,
}

/* Describes a digit press action */
export type DigitMatch = {
  digits: string, //comma separated digits to match
  nextBlock: BlockId,
}

/**
 * Block Types
 */

export type BlockMap = {
  [k in BlockId]: DefaultBlock | PlaybackBlock | RecordBlock | EndBlock;
}

export enum BlockType {
  DEFAULT = 'DEFAULT',   //Just a playback block
  PLAYBACK = 'PLAYBACK', //Plays back non-static messages
  RECORD = 'RECORD',     //Records a user's input
  END = 'END',           //Play messages and hang up.
}

export interface DefaultBlock {
  type: BlockType.DEFAULT,
}

export interface EndBlock {
  type: BlockType.END,
}

export interface PlaybackBlock {
  type: BlockType.PLAYBACK,
}

export interface RecordBlock {
  type: BlockType.RECORD,
  recordingCallback: string,
}

/**
 * Message Types
 */

export type MessageMap = {
  [k in BlockId]: SayMessage[] | PlayMessage[];
}

export enum MessageType {
  SAY = 'SAY',
  PLAY = 'PLAY',
}

export interface SayMessage {
  type: MessageType.SAY,
  text: string,
  language: string,
};

export interface PlayMessage {
  type: MessageType.PLAY,
  url: string,
}

export type GatherResult = {
  speechResult: string,
  confidence: number,
}

export type CallContext = {
  callSid: string,
  mobile: string,
  firebaseApi: FirebaseApi,
  userId: string,
  //For pagination
  page: number,
  pageSize: number,
  maxMessages: number, //total number of messages to load from FB
}

export type DigitResult = {
  digits: string,
}

export enum BotId {
  voicebook = 'voicebook',
}

export enum VersionId {
  en_us = 'en_us',
  en_au = 'en_au', //Australian accent version mate.
  tz_audio = 'tz_audio',
}

export type BotConfig = {
  blocks: BlockMap,
  flows: FlowMap,
  messages: MessageMap
}

export type PageParams = {
  page: number,
  pageSize: number,
  maxMessages: number,
}


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