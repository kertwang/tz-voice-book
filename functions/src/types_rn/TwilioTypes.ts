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
  // notification_0 = 'notification_0',

  /* senegalMobileMoney */
  entrypoint_option = 'entrypoint_option',
  amount_repeat = 'amount_repeat',
  story_option = 'story_option',
  story_1_intro = 'story_1_intro',
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
  story_2_send_money = 'story_2_send_money',
  story_2_send_explain = 'story_2_send_explain',
  story_2_send_explain_option = 'story_2_send_explain_option',
  story_2_send_explain_2 = 'story_2_send_explain_2',
  story_2_send_explain_2_option = 'story_2_send_explain_2_option',
  story_2_end = 'story_2_end',
  story_2_next = 'story_2_next',
  story_3_intro = 'story_3_intro',
  story_3_intro_option = 'story_3_intro_option',
  story_3_decision = 'story_3_decision',
  story_3_decision_option = 'story_3_decision_option',
  story_3_end = 'story_3_end',

  /* rungwe */
  end = 'end',
  stop = 'stop',
  stop_confirm = 'stop_confirm',
}


/**
 * Flow Types:
 */

export type AnyFlowMap = FlowMap | SenegalNotificationFlowMap | SenegalMobileMoneyFlowMap | RungweGenericFlowMap;


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
}

export type SenegalMobileMoneyFlowMap = {
  /* senegalMobileMoney */
  entrypoint: DefaultFlow | GatherFlow,
  amount_repeat: DefaultFlow | GatherFlow,
  story_option: DefaultFlow | GatherFlow,
  entrypoint_option: DefaultFlow | GatherFlow,
  story_1_intro: DefaultFlow | GatherFlow,
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
  story_2_send_money: DefaultFlow | GatherFlow,
  story_2_explain_option: DefaultFlow | GatherFlow,
  story_2_customer_care: DefaultFlow | GatherFlow,
  story_2_send_no_agent: DefaultFlow | GatherFlow,
  story_2_send_agent_option: DefaultFlow | GatherFlow,
  story_2_send_explain: DefaultFlow | GatherFlow,
  story_2_send_explain_option: DefaultFlow | GatherFlow,
  story_2_send_explain_2: DefaultFlow | GatherFlow,
  story_2_send_explain_2_option: DefaultFlow | GatherFlow,
  story_2_end: DefaultFlow | GatherFlow,
  story_2_next: DefaultFlow | GatherFlow,
  story_3_intro: DefaultFlow | GatherFlow,
  story_3_intro_option: DefaultFlow | GatherFlow,
  story_3_decision: DefaultFlow | GatherFlow,
  story_3_decision_option: DefaultFlow | GatherFlow,
  story_3_end: DefaultFlow | GatherFlow,
  error_0: DefaultFlow | GatherFlow,
}

export type RungweGenericFlowMap = {
  entrypoint: DefaultFlow | GatherFlow,
  // end: DefaultFlow | GatherFlow,
  [index: string]: DefaultFlow | GatherFlow,
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
 * ----------------------------------------------------------------------------------------
 */

export type AnyBlockMap = BlockMap | SenegalNotificationBlockMap | SenegalMobileMoneyBlockMap | RungweGenericBlockMap;

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
}

export type SenegalMobileMoneyBlockMap = {
  entrypoint: AnyBlock,
  entrypoint_option: AnyBlock,
  amount_repeat: AnyBlock,
  story_option: AnyBlock,
  story_1_intro: AnyBlock,
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
  story_2_send_money: AnyBlock,
  story_2_explain_option: AnyBlock,
  story_2_customer_care: AnyBlock,
  story_2_send_no_agent: AnyBlock,
  story_2_send_agent_option: AnyBlock,
  story_2_send_explain: AnyBlock,
  story_2_send_explain_option: AnyBlock,
  story_2_send_explain_2: AnyBlock,
  story_2_send_explain_2_option: AnyBlock,
  story_2_end: AnyBlock,
  story_2_next: AnyBlock,
  story_3_intro: AnyBlock,
  story_3_intro_option: AnyBlock,
  story_3_decision: AnyBlock,
  story_3_decision_option: AnyBlock,
  story_3_end: AnyBlock,
  error_0: EndBlock,
}

export type RungweGenericBlockMap = {
  entrypoint: AnyBlock,
  // end: AnyBlock,
  [index: string]: AnyBlock,
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
export type AnyMessageMap = MessageMap | SenegalNotificationMessageMap | SenegalMobileMoneyMessageMap | RungweGenericMessageMap;
export type AnyMessageType = SayMessage | PlayMessage | DynamicPlayMessage | DynamicSayMessage;

//TODO: change to VoicebookMessageMap
export type MessageMap = {
  entrypoint: Array<AnyMessageType>,
  intro_0: Array<AnyMessageType>,
  listen_0: Array<AnyMessageType>,
  listen_playback: Array<AnyMessageType>,
  listen_end: Array<AnyMessageType>,
  listen_end_error: Array<AnyMessageType>,
  listen_feedback: Array<AnyMessageType>,
  listen_feedback_complete: Array<AnyMessageType>,
  error_0: Array<AnyMessageType>,
  info_0: Array<AnyMessageType>,
  record_0: Array<AnyMessageType>,
  record_playback: Array<AnyMessageType>,
  record_post_or_delete: Array<AnyMessageType>,
  record_save: Array<AnyMessageType>,
  record_delete: Array<AnyMessageType>,
  record_post_or_delete_error: Array<AnyMessageType>,

  //Add index method to make sure we get type safety when getting back from AnyMessageMap
  [index: string]: Array<AnyMessageType>,
}

export type SenegalNotificationMessageMap = {
  entrypoint: Array<AnyMessageType>,

  //Add index method to make sure we get type safety when getting back from AnyMessageMap
  [index: string]: Array<AnyMessageType>,
}

export type SenegalMobileMoneyMessageMap = {
  entrypoint: Array<AnyMessageType>,
  entrypoint_option: Array<AnyMessageType>,
  amount_repeat: Array<AnyMessageType>,
  story_option: Array<AnyMessageType>,
  story_1_intro: Array<AnyMessageType>,
  story_1_intro_option: Array<AnyMessageType>,
  story_1_pin_advice: Array<AnyMessageType>,
  story_1_pin_option: Array<AnyMessageType>,
  story_1_guess: Array<AnyMessageType>,
  story_1_guess_option: Array<AnyMessageType>,
  story_1_customer: Array<AnyMessageType>,
  story_1_customer_option_2: Array<AnyMessageType>,
  story_1_end: Array<AnyMessageType>,
  story_1_next: Array<AnyMessageType>,
  story_2_intro: Array<AnyMessageType>,
  story_2_intro_option: Array<AnyMessageType>,
  story_2_explain: Array<AnyMessageType>,
  story_2_explain_option: Array<AnyMessageType>,
  story_2_customer_care: Array<AnyMessageType>,
  story_2_send_money: Array<AnyMessageType>,
  story_2_send_no_agent: Array<AnyMessageType>,
  story_2_send_agent_option: Array<AnyMessageType>,
  story_2_send_explain: Array<AnyMessageType>,
  story_2_send_explain_option: Array<AnyMessageType>,
  story_2_send_explain_2: Array<AnyMessageType>,
  story_2_send_explain_2_option: Array<AnyMessageType>,
  story_2_end: Array<AnyMessageType>,
  story_2_next: Array<AnyMessageType>,
  story_3_intro: Array<AnyMessageType>,
  story_3_intro_option: Array<AnyMessageType>,
  story_3_decision: Array<AnyMessageType>,
  story_3_decision_option: Array<AnyMessageType>,
  story_3_end: Array<AnyMessageType>,
  error_0: Array<AnyMessageType>,

  //Add index method to make sure we get type safety when getting back from AnyMessageMap
  [index: string]: Array<AnyMessageType>,
}

export type RungweGenericMessageMap = {
  entrypoint: Array<AnyMessageType>,

  //Add index method to make sure we get type safety when getting back from AnyMessageMap
  [index: string]: Array<AnyMessageType>,
}

//RW-TODO: Can we add a dynamic message type here? or should we add a SAY_DYNAMIC and PLAY_DYNAMIC?
export enum MessageType {
  SAY = 'SAY',
  PLAY = 'PLAY',
  DYNAMIC_SAY = 'DYNAMIC_SAY',
  DYNAMIC_PLAY = 'DYNAMIC_PLAY',
}

export type DynamicPlayMessage = {
  type: MessageType.DYNAMIC_PLAY,
  func: (params: string[]) => PlayMessage,
}
export type DynamicSayMessage = {
  type: MessageType.DYNAMIC_SAY,
  func: (params: string[]) => SayMessage,
}

// export function dynamicPlayMessage(params: string[]): PlayMessage {
//   return {

//   }
// }

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
  
  //For dynamically building responses
  dynamicParams: string[],

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
 * 
 * These can be twilio bots with Twiml, or DialogFlow bots
 */
export enum BotId {
  //Twilio Bots
  voicebook = 'voicebook',
  senegalNotification = 'senegalNotification',
  senegalMobileMoney = 'senegalMobileMoney',
  rungweIntro = 'rungweIntro',
  rungweDeposit = 'rungweDeposit',
  rungwePaymentDate = 'rungwePaymentDate',
  rungwePaymentNotification = 'rungwePaymentNotification',

  //DF Bots
  uncdfBot = 'uncdfBot',
}

/**
 * Define different translations + versions (text, audio, informal etc)
 */
export enum VersionId {
  en_us = 'en_us',
  en_au = 'en_au', //Australian accent version mate.
  tz_audio = 'tz_audio',

  en_text = 'en_text', //english text
  fr_audio = 'fr_audio', //french audio
  wl_audio = 'wl_audio', //wolof audio
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