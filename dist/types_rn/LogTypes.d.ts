import { PageParams, BlockId, BotId } from "./TwilioTypes";
export declare enum LogType {
    BLOCK = "BLOCK",
    FEEDBACK = "FEEDBACK",
    PENDING_MESSAGE = "PENDING_MESSAGE",
    POST_MESSAGE = "POST_MESSAGE",
    TWILIO_API_REQUEST = "TWILIO_API_REQUEST",
    TWILIO_API_RESPONSE = "TWILIO_API_RESPONSE",
    DIALOG_FLOW_INTENT = "DIALOG_FLOW_INTENT"
}
export declare type AnyLog = BlockLog | FeedbackLog | PendingMessageLog | PostMessageLog | TwilioApiRequestLog | TwilioApiResponseLog | DialogFlowIntentLog;
export declare type BlockLog = {
    type: LogType.BLOCK;
    botId: BotId | string;
    callSid: string;
    blockId: BlockId | string;
    mobile: string;
    pageParams: PageParams;
};
export declare type FeedbackLog = {
    type: LogType.FEEDBACK;
    botId: BotId | string;
    pendingId: string;
    callSid: string;
    url: string;
};
export declare type PendingMessageLog = {
    type: LogType.PENDING_MESSAGE;
    botId: BotId | string;
    pendingId: string;
    callSid: string;
    url: string;
};
export declare type PostMessageLog = {
    type: LogType.POST_MESSAGE;
    botId: BotId | string;
    recordingId: string;
    callSid: string;
    url: string;
};
export declare type TwilioApiRequestLog = {
    type: LogType.TWILIO_API_REQUEST;
    botId: BotId | string;
    method: string;
    params: any;
};
export declare type TwilioApiResponseLog = {
    type: LogType.TWILIO_API_RESPONSE;
    botId: BotId | string;
    method: string;
    response: any;
};
export declare type DialogFlowIntentLog = {
    type: LogType.DIALOG_FLOW_INTENT;
    intent: string;
    sessionId: string;
};
