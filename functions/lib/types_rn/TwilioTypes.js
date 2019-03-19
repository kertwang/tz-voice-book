"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 *
 * BlockIds are not bot specific, and can be reused or recycled.
 */
var BlockId;
(function (BlockId) {
    /* voicebook */
    BlockId["entrypoint"] = "entrypoint";
    BlockId["intro_0"] = "intro_0";
    BlockId["listen_0"] = "listen_0";
    BlockId["listen_playback"] = "listen_playback";
    BlockId["listen_end"] = "listen_end";
    BlockId["listen_end_error"] = "listen_end_error";
    BlockId["listen_feedback"] = "listen_feedback";
    BlockId["listen_feedback_complete"] = "listen_feedback_complete";
    BlockId["error_0"] = "error_0";
    BlockId["info_0"] = "info_0";
    BlockId["record_0"] = "record_0";
    BlockId["record_playback"] = "record_playback";
    BlockId["record_post_or_delete"] = "record_post_or_delete";
    BlockId["record_save"] = "record_save";
    BlockId["record_delete"] = "record_delete";
    BlockId["record_post_or_delete_error"] = "record_post_or_delete_error";
    /* senegalNotification */
    // notification_0 = 'notification_0',
    /* senegalMobileMoney */
    BlockId["entrypoint_option"] = "entrypoint_option";
    BlockId["amount_repeat"] = "amount_repeat";
    BlockId["story_option"] = "story_option";
    BlockId["story_1_intro"] = "story_1_intro";
    BlockId["story_1_intro_option"] = "story_1_intro_option";
    BlockId["story_1_pin_advice"] = "story_1_pin_advice";
    BlockId["story_1_pin_option"] = "story_1_pin_option";
    BlockId["story_1_guess"] = "story_1_guess";
    BlockId["story_1_guess_option"] = "story_1_guess_option";
    BlockId["story_1_customer"] = "story_1_customer";
    BlockId["story_1_customer_option_2"] = "story_1_customer_option_2";
    BlockId["story_1_end"] = "story_1_end";
    BlockId["story_1_next"] = "story_1_next";
    BlockId["story_2_intro"] = "story_2_intro";
    BlockId["story_2_intro_option"] = "story_2_intro_option";
    BlockId["story_2_explain"] = "story_2_explain";
    BlockId["story_2_explain_option"] = "story_2_explain_option";
    BlockId["story_2_customer_care"] = "story_2_customer_care";
    BlockId["story_2_send_no_agent"] = "story_2_send_no_agent";
    BlockId["story_2_send_agent_option"] = "story_2_send_agent_option";
    BlockId["story_2_send_money"] = "story_2_send_money";
    BlockId["story_2_send_explain"] = "story_2_send_explain";
    BlockId["story_2_send_explain_option"] = "story_2_send_explain_option";
    BlockId["story_2_send_explain_2"] = "story_2_send_explain_2";
    BlockId["story_2_send_explain_2_option"] = "story_2_send_explain_2_option";
    BlockId["story_2_end"] = "story_2_end";
    BlockId["story_2_next"] = "story_2_next";
    BlockId["story_3_intro"] = "story_3_intro";
    BlockId["story_3_intro_option"] = "story_3_intro_option";
    BlockId["story_3_decision"] = "story_3_decision";
    BlockId["story_3_decision_option"] = "story_3_decision_option";
    BlockId["story_3_end"] = "story_3_end";
    /* rungwe */
    BlockId["end"] = "end";
    BlockId["stop"] = "stop";
    BlockId["stop_confirm"] = "stop_confirm";
})(BlockId = exports.BlockId || (exports.BlockId = {}));
var FlowType;
(function (FlowType) {
    FlowType["DEFAULT"] = "DEFAULT";
    FlowType["GATHER"] = "GATHER";
})(FlowType = exports.FlowType || (exports.FlowType = {}));
var BlockType;
(function (BlockType) {
    BlockType["DEFAULT"] = "DEFAULT";
    BlockType["PLAYBACK"] = "PLAYBACK";
    BlockType["RECORD"] = "RECORD";
    BlockType["END"] = "END";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
//RW-TODO: Can we add a dynamic message type here? or should we add a SAY_DYNAMIC and PLAY_DYNAMIC?
var MessageType;
(function (MessageType) {
    MessageType["SAY"] = "SAY";
    MessageType["PLAY"] = "PLAY";
    MessageType["DYNAMIC_SAY"] = "DYNAMIC_SAY";
    MessageType["DYNAMIC_PLAY"] = "DYNAMIC_PLAY";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
;
/**
 * Define different bots here
 *
 * These can be twilio bots with Twiml, or DialogFlow bots
 */
var BotId;
(function (BotId) {
    //Twilio Bots
    BotId["voicebook"] = "voicebook";
    BotId["senegalNotification"] = "senegalNotification";
    BotId["senegalMobileMoney"] = "senegalMobileMoney";
    BotId["rungweIntro"] = "rungweIntro";
    BotId["rungweDeposit"] = "rungweDeposit";
    BotId["rungwePaymentDate"] = "rungwePaymentDate";
    BotId["rungwePaymentNotification"] = "rungwePaymentNotification";
    //DF Bots
    BotId["uncdfBot"] = "uncdfBot";
})(BotId = exports.BotId || (exports.BotId = {}));
/**
 * Define different translations + versions (text, audio, informal etc)
 */
var VersionId;
(function (VersionId) {
    VersionId["en_us"] = "en_us";
    VersionId["en_au"] = "en_au";
    VersionId["tz_audio"] = "tz_audio";
    VersionId["en_text"] = "en_text";
    VersionId["fr_audio"] = "fr_audio";
    VersionId["wl_audio"] = "wl_audio";
    VersionId["en_audio"] = "en_audio";
})(VersionId = exports.VersionId || (exports.VersionId = {}));
