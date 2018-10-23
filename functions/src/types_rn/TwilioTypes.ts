import FirebaseApi from "../apis/FirebaseApi";
import { Gather } from "twilio/lib/twiml/VoiceResponse";
import Version = require("twilio/lib/base/Version");

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

  notification_0 = 'notification_0',
}

/**
 * Flow Types:
 */

export type AnyFlowMap = FlowMap | SenegalNotificationFlowMap;


//this is the voicebook block map
//TODO: change name to VoiceBookFlowMap
export type FlowMap = {
  entrypoint: DefaultFlow | GatherFlow,
  intro_0: DefaultFlow | GatherFlow,
  listen_0: DefaultFlow | GatherFlow,
  listen_playback: DefaultFlow | GatherFlow,
  listen_end: DefaultFlow | GatherFlow,
  listen_end_error: DefaultFlow | GatherFlow,
  listen_feedback: DefaultFlow | GatherFlow,
  listen_feedback_complete: DefaultFlow | GatherFlow,
  error_0: DefaultFlow | GatherFlow,
  info_0: DefaultFlow | GatherFlow,
  record_0: DefaultFlow | GatherFlow,
  record_playback: DefaultFlow | GatherFlow,
  record_post_or_delete: DefaultFlow | GatherFlow,
  record_save: DefaultFlow | GatherFlow,
  record_delete: DefaultFlow | GatherFlow,
  record_post_or_delete_error: DefaultFlow | GatherFlow,
}

export type SenegalNotificationFlowMap = {
  entrypoint: DefaultFlow | GatherFlow,
  notification_0: DefaultFlow | GatherFlow,
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

export type AnyBlockMap = BlockMap | SenegalNotificationBlockMap;

export type AnyBlock = DefaultBlock | PlaybackBlock | RecordBlock | EndBlock;

//TODO: change to VoicebookBlockMap
export type BlockMap = {
  entrypoint: AnyBlock,
  intro_0: AnyBlock,
  listen_0: AnyBlock,
  listen_playback: AnyBlock,
  listen_end: AnyBlock,
  listen_end_error: AnyBlock,
  listen_feedback: AnyBlock,
  listen_feedback_complete: AnyBlock,
  error_0: AnyBlock,
  info_0: AnyBlock,
  record_0: AnyBlock,
  record_playback: AnyBlock,
  record_post_or_delete: AnyBlock,
  record_save: AnyBlock,
  record_delete: AnyBlock,
  record_post_or_delete_error: AnyBlock,
}

export type SenegalNotificationBlockMap = {
  entrypoint: AnyBlock,
  notification_0: AnyBlock,
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
export type AnyMessageMap = MessageMap | SenegalNotificationMessageMap;


//TODO: change to VoicebookMessageMap
export type MessageMap = {
  entrypoint: SayMessage[] | PlayMessage[],
  intro_0: SayMessage[] | PlayMessage[],
  listen_0: SayMessage[] | PlayMessage[],
  listen_playback: SayMessage[] | PlayMessage[],
  listen_end: SayMessage[] | PlayMessage[],
  listen_end_error: SayMessage[] | PlayMessage[],
  listen_feedback: SayMessage[] | PlayMessage[],
  listen_feedback_complete: SayMessage[] | PlayMessage[],
  error_0: SayMessage[] | PlayMessage[],
  info_0: SayMessage[] | PlayMessage[],
  record_0: SayMessage[] | PlayMessage[],
  record_playback: SayMessage[] | PlayMessage[],
  record_post_or_delete: SayMessage[] | PlayMessage[],
  record_save: SayMessage[] | PlayMessage[],
  record_delete: SayMessage[] | PlayMessage[],
  record_post_or_delete_error: SayMessage[] | PlayMessage[],
}

export type SenegalNotificationMessageMap = {
  entrypoint: SayMessage[] | PlayMessage[],
  notification_0: SayMessage[] | PlayMessage[],
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
  
  //For translation overrides
  versionOverride: VersionId | null,

  //For pagination
  page: number,
  pageSize: number,
  maxMessages: number, //total number of messages to load from FB
}

export type DigitResult = {
  digits: string,
}


/**
 * Define different bots here
 */
export enum BotId {
  voicebook = 'voicebook',
  senegalNotification = 'senegalNotification',
  senegalMobileMoney = 'senegalMobileMoney',
}

/**
 * Define different translations + versions (text, audio, informal etc)
 */
export enum VersionId {
  en_us = 'en_us',
  en_au = 'en_au', //Australian accent version mate.
  tz_audio = 'tz_audio',

  sg_text_formal = 'sg_text_formal',
  sg_text_informal = 'sg_text_informal',
  sg_audio_formal = 'sg_audio_formal', //Audio, Formal Senegalese French
  sg_audio_informal = 'sg_audio_informal' //Audio, Informal Senegalese French
}

export type BotConfig = {
  botId: BotId,
  blocks: AnyBlockMap,
  flows: AnyFlowMap,
  messages: AnyMessageMap,
}

export type PageParams = {
  page: number,
  pageSize: number,
  maxMessages: number,
  versionOverride: VersionId | null,
}