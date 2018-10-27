import FirebaseApi from "../apis/FirebaseApi";
import { Gather } from "twilio/lib/twiml/VoiceResponse";
import Version = require("twilio/lib/base/Version");

/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 * 
 * BlockIds are not bot specific, and can be reused or recycled.
 */
export enum BlockId {
  /* voicebook */
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

  /* senegalNotification */
  notification_0 = 'notification_0',

  /* senegalMobileMoney */
  story_1_intro_option = 'story_1_intro_option',
  story_1_pin_advice = 'story_1_pin_advice',
  story_1_pin_option = 'story_1_pin_option',
  story_1_guess = 'story_1_guess',
  story_1_guess_option = 'story_1_guess_option',
  story_1_customer = 'story_1_customer',
  story_1_customer_option_2 = 'story_1_customer_option_2',
  story_1_end = 'story_1_end',
  story_1_next = 'story_1_next',
  story_2_intro = 'story_2_intro',
  story_2_intro_option = 'story_2_intro_option',
  story_2_explain = 'story_2_explain',
  story_2_explain_option = 'story_2_explain_option',
  story_2_customer_care = 'story_2_customer_care',
  story_2_send_no_agent = 'story_2_send_no_agent',
  story_2_send_agent_option = 'story_2_send_agent_option',
  story_2_send_explain = 'story_2_send_explain',
  story_2_send_explain_option = 'story_2_send_explain_option',
  story_2_send_explain_2 = 'story_2_send_explain_2',
  story_2_end = 'story_2_end',
  story_2_next = 'story_2_next',
  story_3_intro = 'story_3_intro',
  story_3_intro_option = 'story_3_intro_option',
  story_3_decision = 'story_3_decision',
  story_3_decision_option = 'story_3_decision_option',
  story_3_end = 'story_3_end',
}


/**
 * Flow Types:
 */

export type AnyFlowMap = FlowMap | SenegalNotificationFlowMap | SenegalMobileMoneyFlowMap;


//this is the voicebook block map
//TODO: change name to VoiceBookFlowMap
export type FlowMap = {
  // [k in VoiceBookBlockId]: DefaultFlow | GatherFlow

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

export type SenegalMobileMoneyFlowMap = {
  /* senegalMobileMoney */
  entrypoint: DefaultFlow | GatherFlow,
  story_1_intro_option: DefaultFlow | GatherFlow,
  story_1_pin_advice: DefaultFlow | GatherFlow,
  story_1_pin_option: DefaultFlow | GatherFlow,
  story_1_guess: DefaultFlow | GatherFlow,
  story_1_guess_option: DefaultFlow | GatherFlow,
  story_1_customer: DefaultFlow | GatherFlow,
  story_1_customer_option_2: DefaultFlow | GatherFlow,
  story_1_end: DefaultFlow | GatherFlow,
  story_1_next: DefaultFlow | GatherFlow,
  story_2_intro: DefaultFlow | GatherFlow,
  story_2_intro_option: DefaultFlow | GatherFlow,
  story_2_explain: DefaultFlow | GatherFlow,
  story_2_explain_option: DefaultFlow | GatherFlow,
  story_2_customer_care: DefaultFlow | GatherFlow,
  story_2_send_no_agent: DefaultFlow | GatherFlow,
  story_2_send_agent_option: DefaultFlow | GatherFlow,
  story_2_send_explain: DefaultFlow | GatherFlow,
  story_2_send_explain_option: DefaultFlow | GatherFlow,
  story_2_send_explain_2: DefaultFlow | GatherFlow,
  story_2_end: DefaultFlow | GatherFlow,
  story_2_next: DefaultFlow | GatherFlow,
  story_3_intro: DefaultFlow | GatherFlow,
  story_3_intro_option: DefaultFlow | GatherFlow,
  story_3_decision: DefaultFlow | GatherFlow,
  story_3_decision_option: DefaultFlow | GatherFlow,
  story_3_end: DefaultFlow | GatherFlow,

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

export type AnyBlockMap = BlockMap | SenegalNotificationBlockMap | SenegalMobileMoneyBlockMap;

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

export type SenegalMobileMoneyBlockMap = {
  entrypoint: AnyBlock,
  story_1_intro_option: AnyBlock,
  story_1_pin_advice: AnyBlock,
  story_1_pin_option: AnyBlock,
  story_1_guess: AnyBlock,
  story_1_guess_option: AnyBlock,
  story_1_customer: AnyBlock,
  story_1_customer_option_2: AnyBlock,
  story_1_end: AnyBlock,
  story_1_next: AnyBlock,
  story_2_intro: AnyBlock,
  story_2_intro_option: AnyBlock,
  story_2_explain: AnyBlock,
  story_2_explain_option: AnyBlock,
  story_2_customer_care: AnyBlock,
  story_2_send_no_agent: AnyBlock,
  story_2_send_agent_option: AnyBlock,
  story_2_send_explain: AnyBlock,
  story_2_send_explain_option: AnyBlock,
  story_2_send_explain_2: AnyBlock,
  story_2_end: AnyBlock,
  story_2_next: AnyBlock,
  story_3_intro: AnyBlock,
  story_3_intro_option: AnyBlock,
  story_3_decision: AnyBlock,
  story_3_decision_option: AnyBlock,
  story_3_end: AnyBlock,
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
export type AnyMessageMap = MessageMap | SenegalNotificationMessageMap | SenegalMobileMoneyMessageMap;


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

export type SenegalMobileMoneyMessageMap = {
  entrypoint: SayMessage[] | PlayMessage[],
  story_1_intro_option: SayMessage[] | PlayMessage[],
  story_1_pin_advice: SayMessage[] | PlayMessage[],
  story_1_pin_option: SayMessage[] | PlayMessage[],
  story_1_guess: SayMessage[] | PlayMessage[],
  story_1_guess_option: SayMessage[] | PlayMessage[],
  story_1_customer: SayMessage[] | PlayMessage[],
  story_1_customer_option_2: SayMessage[] | PlayMessage[],
  story_1_end: SayMessage[] | PlayMessage[],
  story_1_next: SayMessage[] | PlayMessage[],
  story_2_intro: SayMessage[] | PlayMessage[],
  story_2_intro_option: SayMessage[] | PlayMessage[],
  story_2_explain: SayMessage[] | PlayMessage[],
  story_2_explain_option: SayMessage[] | PlayMessage[],
  story_2_customer_care: SayMessage[] | PlayMessage[],
  story_2_send_no_agent: SayMessage[] | PlayMessage[],
  story_2_send_agent_option: SayMessage[] | PlayMessage[],
  story_2_send_explain: SayMessage[] | PlayMessage[],
  story_2_send_explain_option: SayMessage[] | PlayMessage[],
  story_2_send_explain_2: SayMessage[] | PlayMessage[],
  story_2_end: SayMessage[] | PlayMessage[],
  story_2_next: SayMessage[] | PlayMessage[],
  story_3_intro: SayMessage[] | PlayMessage[],
  story_3_intro_option: SayMessage[] | PlayMessage[],
  story_3_decision: SayMessage[] | PlayMessage[],
  story_3_decision_option: SayMessage[] | PlayMessage[],
  story_3_end: SayMessage[] | PlayMessage[],
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