import FirebaseApi from "../apis/FirebaseApi";
/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 *
 * BlockIds are not bot specific, and can be reused or recycled.
 */
export declare enum BlockId {
    entrypoint = "entrypoint",
    intro_0 = "intro_0",
    listen_0 = "listen_0",
    listen_playback = "listen_playback",
    listen_end = "listen_end",
    listen_end_error = "listen_end_error",
    listen_feedback = "listen_feedback",
    listen_feedback_complete = "listen_feedback_complete",
    error_0 = "error_0",
    info_0 = "info_0",
    record_0 = "record_0",
    record_playback = "record_playback",
    record_post_or_delete = "record_post_or_delete",
    record_save = "record_save",
    record_delete = "record_delete",
    record_post_or_delete_error = "record_post_or_delete_error",
    entrypoint_option = "entrypoint_option",
    amount_repeat = "amount_repeat",
    story_option = "story_option",
    story_1_intro = "story_1_intro",
    story_1_intro_option = "story_1_intro_option",
    story_1_pin_advice = "story_1_pin_advice",
    story_1_pin_option = "story_1_pin_option",
    story_1_guess = "story_1_guess",
    story_1_guess_option = "story_1_guess_option",
    story_1_customer = "story_1_customer",
    story_1_customer_option_2 = "story_1_customer_option_2",
    story_1_end = "story_1_end",
    story_1_next = "story_1_next",
    story_2_intro = "story_2_intro",
    story_2_intro_option = "story_2_intro_option",
    story_2_explain = "story_2_explain",
    story_2_explain_option = "story_2_explain_option",
    story_2_customer_care = "story_2_customer_care",
    story_2_send_no_agent = "story_2_send_no_agent",
    story_2_send_agent_option = "story_2_send_agent_option",
    story_2_send_money = "story_2_send_money",
    story_2_send_explain = "story_2_send_explain",
    story_2_send_explain_option = "story_2_send_explain_option",
    story_2_send_explain_2 = "story_2_send_explain_2",
    story_2_send_explain_2_option = "story_2_send_explain_2_option",
    story_2_end = "story_2_end",
    story_2_next = "story_2_next",
    story_3_intro = "story_3_intro",
    story_3_intro_option = "story_3_intro_option",
    story_3_decision = "story_3_decision",
    story_3_decision_option = "story_3_decision_option",
    story_3_end = "story_3_end",
    end = "end",
    stop = "stop",
    stop_confirm = "stop_confirm"
}
/**
 * Flow Types:
 */
export declare type AnyFlowMap = FlowMap | SenegalNotificationFlowMap | SenegalMobileMoneyFlowMap | RungweGenericFlowMap;
export declare type FlowMap = {
    entrypoint: DefaultFlow | GatherFlow;
    intro_0: DefaultFlow | GatherFlow;
    listen_0: DefaultFlow | GatherFlow;
    listen_playback: DefaultFlow | GatherFlow;
    listen_end: DefaultFlow | GatherFlow;
    listen_end_error: DefaultFlow | GatherFlow;
    listen_feedback: DefaultFlow | GatherFlow;
    listen_feedback_complete: DefaultFlow | GatherFlow;
    error_0: DefaultFlow | GatherFlow;
    info_0: DefaultFlow | GatherFlow;
    record_0: DefaultFlow | GatherFlow;
    record_playback: DefaultFlow | GatherFlow;
    record_post_or_delete: DefaultFlow | GatherFlow;
    record_save: DefaultFlow | GatherFlow;
    record_delete: DefaultFlow | GatherFlow;
    record_post_or_delete_error: DefaultFlow | GatherFlow;
};
export declare type SenegalNotificationFlowMap = {
    entrypoint: DefaultFlow | GatherFlow;
};
export declare type SenegalMobileMoneyFlowMap = {
    entrypoint: DefaultFlow | GatherFlow;
    amount_repeat: DefaultFlow | GatherFlow;
    story_option: DefaultFlow | GatherFlow;
    entrypoint_option: DefaultFlow | GatherFlow;
    story_1_intro: DefaultFlow | GatherFlow;
    story_1_intro_option: DefaultFlow | GatherFlow;
    story_1_pin_advice: DefaultFlow | GatherFlow;
    story_1_pin_option: DefaultFlow | GatherFlow;
    story_1_guess: DefaultFlow | GatherFlow;
    story_1_guess_option: DefaultFlow | GatherFlow;
    story_1_customer: DefaultFlow | GatherFlow;
    story_1_customer_option_2: DefaultFlow | GatherFlow;
    story_1_end: DefaultFlow | GatherFlow;
    story_1_next: DefaultFlow | GatherFlow;
    story_2_intro: DefaultFlow | GatherFlow;
    story_2_intro_option: DefaultFlow | GatherFlow;
    story_2_explain: DefaultFlow | GatherFlow;
    story_2_send_money: DefaultFlow | GatherFlow;
    story_2_explain_option: DefaultFlow | GatherFlow;
    story_2_customer_care: DefaultFlow | GatherFlow;
    story_2_send_no_agent: DefaultFlow | GatherFlow;
    story_2_send_agent_option: DefaultFlow | GatherFlow;
    story_2_send_explain: DefaultFlow | GatherFlow;
    story_2_send_explain_option: DefaultFlow | GatherFlow;
    story_2_send_explain_2: DefaultFlow | GatherFlow;
    story_2_send_explain_2_option: DefaultFlow | GatherFlow;
    story_2_end: DefaultFlow | GatherFlow;
    story_2_next: DefaultFlow | GatherFlow;
    story_3_intro: DefaultFlow | GatherFlow;
    story_3_intro_option: DefaultFlow | GatherFlow;
    story_3_decision: DefaultFlow | GatherFlow;
    story_3_decision_option: DefaultFlow | GatherFlow;
    story_3_end: DefaultFlow | GatherFlow;
    error_0: DefaultFlow | GatherFlow;
};
export declare type RungweGenericFlowMap = {
    entrypoint: DefaultFlow | GatherFlow;
    [index: string]: DefaultFlow | GatherFlow;
};
export declare enum FlowType {
    DEFAULT = "DEFAULT",
    GATHER = "GATHER"
}
export interface DefaultFlow {
    next: BlockId;
    type: FlowType.DEFAULT;
}
export interface GatherFlow {
    type: FlowType.GATHER;
    error: BlockId;
    digitMatches: DigitMatch[];
}
export declare type FlowMatch = {
    term: string;
    nextBlock: BlockId;
};
export declare type DigitMatch = {
    digits: string;
    nextBlock: BlockId;
};
/**
 * Block Types
 * ----------------------------------------------------------------------------------------
 */
export declare type AnyBlockMap = BlockMap | SenegalNotificationBlockMap | SenegalMobileMoneyBlockMap | RungweGenericBlockMap;
export declare type AnyBlock = DefaultBlock | PlaybackBlock | RecordBlock | EndBlock;
export declare type BlockMap = {
    entrypoint: AnyBlock;
    intro_0: AnyBlock;
    listen_0: AnyBlock;
    listen_playback: AnyBlock;
    listen_end: AnyBlock;
    listen_end_error: AnyBlock;
    listen_feedback: AnyBlock;
    listen_feedback_complete: AnyBlock;
    error_0: AnyBlock;
    info_0: AnyBlock;
    record_0: AnyBlock;
    record_playback: AnyBlock;
    record_post_or_delete: AnyBlock;
    record_save: AnyBlock;
    record_delete: AnyBlock;
    record_post_or_delete_error: AnyBlock;
};
export declare type SenegalNotificationBlockMap = {
    entrypoint: AnyBlock;
};
export declare type SenegalMobileMoneyBlockMap = {
    entrypoint: AnyBlock;
    entrypoint_option: AnyBlock;
    amount_repeat: AnyBlock;
    story_option: AnyBlock;
    story_1_intro: AnyBlock;
    story_1_intro_option: AnyBlock;
    story_1_pin_advice: AnyBlock;
    story_1_pin_option: AnyBlock;
    story_1_guess: AnyBlock;
    story_1_guess_option: AnyBlock;
    story_1_customer: AnyBlock;
    story_1_customer_option_2: AnyBlock;
    story_1_end: AnyBlock;
    story_1_next: AnyBlock;
    story_2_intro: AnyBlock;
    story_2_intro_option: AnyBlock;
    story_2_explain: AnyBlock;
    story_2_send_money: AnyBlock;
    story_2_explain_option: AnyBlock;
    story_2_customer_care: AnyBlock;
    story_2_send_no_agent: AnyBlock;
    story_2_send_agent_option: AnyBlock;
    story_2_send_explain: AnyBlock;
    story_2_send_explain_option: AnyBlock;
    story_2_send_explain_2: AnyBlock;
    story_2_send_explain_2_option: AnyBlock;
    story_2_end: AnyBlock;
    story_2_next: AnyBlock;
    story_3_intro: AnyBlock;
    story_3_intro_option: AnyBlock;
    story_3_decision: AnyBlock;
    story_3_decision_option: AnyBlock;
    story_3_end: AnyBlock;
    error_0: EndBlock;
};
export declare type RungweGenericBlockMap = {
    entrypoint: AnyBlock;
    [index: string]: AnyBlock;
};
export declare enum BlockType {
    DEFAULT = "DEFAULT",
    PLAYBACK = "PLAYBACK",
    RECORD = "RECORD",
    END = "END"
}
export interface DefaultBlock {
    type: BlockType.DEFAULT;
}
export interface EndBlock {
    type: BlockType.END;
}
export interface PlaybackBlock {
    type: BlockType.PLAYBACK;
}
export interface RecordBlock {
    type: BlockType.RECORD;
    recordingCallback: string;
}
/**
 * Message Types
 */
export declare type AnyMessageMap = MessageMap | SenegalNotificationMessageMap | SenegalMobileMoneyMessageMap | RungweGenericMessageMap;
export declare type AnyMessageType = SayMessage | PlayMessage | DynamicPlayMessage | DynamicSayMessage;
export declare type MessageMap = {
    entrypoint: Array<AnyMessageType>;
    intro_0: Array<AnyMessageType>;
    listen_0: Array<AnyMessageType>;
    listen_playback: Array<AnyMessageType>;
    listen_end: Array<AnyMessageType>;
    listen_end_error: Array<AnyMessageType>;
    listen_feedback: Array<AnyMessageType>;
    listen_feedback_complete: Array<AnyMessageType>;
    error_0: Array<AnyMessageType>;
    info_0: Array<AnyMessageType>;
    record_0: Array<AnyMessageType>;
    record_playback: Array<AnyMessageType>;
    record_post_or_delete: Array<AnyMessageType>;
    record_save: Array<AnyMessageType>;
    record_delete: Array<AnyMessageType>;
    record_post_or_delete_error: Array<AnyMessageType>;
    [index: string]: Array<AnyMessageType>;
};
export declare type SenegalNotificationMessageMap = {
    entrypoint: Array<AnyMessageType>;
    [index: string]: Array<AnyMessageType>;
};
export declare type SenegalMobileMoneyMessageMap = {
    entrypoint: Array<AnyMessageType>;
    entrypoint_option: Array<AnyMessageType>;
    amount_repeat: Array<AnyMessageType>;
    story_option: Array<AnyMessageType>;
    story_1_intro: Array<AnyMessageType>;
    story_1_intro_option: Array<AnyMessageType>;
    story_1_pin_advice: Array<AnyMessageType>;
    story_1_pin_option: Array<AnyMessageType>;
    story_1_guess: Array<AnyMessageType>;
    story_1_guess_option: Array<AnyMessageType>;
    story_1_customer: Array<AnyMessageType>;
    story_1_customer_option_2: Array<AnyMessageType>;
    story_1_end: Array<AnyMessageType>;
    story_1_next: Array<AnyMessageType>;
    story_2_intro: Array<AnyMessageType>;
    story_2_intro_option: Array<AnyMessageType>;
    story_2_explain: Array<AnyMessageType>;
    story_2_explain_option: Array<AnyMessageType>;
    story_2_customer_care: Array<AnyMessageType>;
    story_2_send_money: Array<AnyMessageType>;
    story_2_send_no_agent: Array<AnyMessageType>;
    story_2_send_agent_option: Array<AnyMessageType>;
    story_2_send_explain: Array<AnyMessageType>;
    story_2_send_explain_option: Array<AnyMessageType>;
    story_2_send_explain_2: Array<AnyMessageType>;
    story_2_send_explain_2_option: Array<AnyMessageType>;
    story_2_end: Array<AnyMessageType>;
    story_2_next: Array<AnyMessageType>;
    story_3_intro: Array<AnyMessageType>;
    story_3_intro_option: Array<AnyMessageType>;
    story_3_decision: Array<AnyMessageType>;
    story_3_decision_option: Array<AnyMessageType>;
    story_3_end: Array<AnyMessageType>;
    error_0: Array<AnyMessageType>;
    [index: string]: Array<AnyMessageType>;
};
export declare type RungweGenericMessageMap = {
    entrypoint: Array<AnyMessageType>;
    [index: string]: Array<AnyMessageType>;
};
export declare enum MessageType {
    SAY = "SAY",
    PLAY = "PLAY",
    DYNAMIC_SAY = "DYNAMIC_SAY",
    DYNAMIC_PLAY = "DYNAMIC_PLAY"
}
export declare type DynamicPlayMessage = {
    type: MessageType.DYNAMIC_PLAY;
    func: (params: string[], urlGenerator: (path: string) => string) => PlayMessage[];
};
export declare type DynamicSayMessage = {
    type: MessageType.DYNAMIC_SAY;
    func: (params: string[]) => SayMessage[];
};
export declare type TwilioSayLanguage = 'da-DK' | 'de-DE' | 'en-AU' | 'en-CA' | 'en-GB' | 'en-IN' | 'en-US' | 'ca-ES' | 'es-ES' | 'es-MX' | 'fi-FI' | 'fr-CA' | 'fr-FR' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nb-NO' | 'nl-NL' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ru-RU' | 'sv-SE' | 'zh-CN' | 'zh-HK' | 'zh-TW';
export interface SayMessage {
    type: MessageType.SAY;
    text: string;
    language: TwilioSayLanguage;
}
export interface PlayMessage {
    type: MessageType.PLAY;
    url: string;
}
export declare type GatherResult = {
    speechResult: string;
    confidence: number;
};
export declare type CallContext = {
    callSid: string;
    mobile: string;
    toMobile: string;
    firebaseApi: FirebaseApi;
    userId: string;
    versionOverride: VersionId | null;
    dynamicParams: string[];
    page: number;
    pageSize: number;
    maxMessages: number;
};
export declare type DigitResult = {
    digits: string;
};
/**
 * Define different bots here
 *
 * These can be twilio bots with Twiml, or DialogFlow bots
 */
export declare enum BotId {
    voicebook = "voicebook",
    senegalNotification = "senegalNotification",
    senegalMobileMoney = "senegalMobileMoney",
    rungweIntro = "rungweIntro",
    rungweDeposit = "rungweDeposit",
    rungwePaymentDate = "rungwePaymentDate",
    rungwePaymentNotification = "rungwePaymentNotification",
    uncdfBot = "uncdfBot"
}
/**
 * Define different translations + versions (text, audio, informal etc)
 */
export declare enum VersionId {
    en_us = "en_us",
    en_au = "en_au",
    tz_audio = "tz_audio",
    en_text = "en_text",
    fr_audio = "fr_audio",
    wl_audio = "wl_audio",
    en_audio = "en_audio"
}
export declare type BotConfig = {
    botId: BotId;
    blocks: AnyBlockMap;
    flows: AnyFlowMap;
    messages: AnyMessageMap;
};
export declare type PageParams = {
    page: number;
    pageSize: number;
    maxMessages: number;
    versionOverride: VersionId | null;
};
