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
    BlockId["notification_0"] = "notification_0";
    /* senegalMobileMoney */
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
    BlockId["story_2_send_explain"] = "story_2_send_explain";
    BlockId["story_2_send_explain_option"] = "story_2_send_explain_option";
    BlockId["story_2_send_explain_2"] = "story_2_send_explain_2";
    BlockId["story_2_end"] = "story_2_end";
    BlockId["story_2_next"] = "story_2_next";
    BlockId["story_3_intro"] = "story_3_intro";
    BlockId["story_3_intro_option"] = "story_3_intro_option";
    BlockId["story_3_decision"] = "story_3_decision";
    BlockId["story_3_decision_option"] = "story_3_decision_option";
    BlockId["story_3_end"] = "story_3_end";
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
var MessageType;
(function (MessageType) {
    MessageType["SAY"] = "SAY";
    MessageType["PLAY"] = "PLAY";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
;
/**
 * Define different bots here
 */
var BotId;
(function (BotId) {
    BotId["voicebook"] = "voicebook";
    BotId["senegalNotification"] = "senegalNotification";
    BotId["senegalMobileMoney"] = "senegalMobileMoney";
})(BotId = exports.BotId || (exports.BotId = {}));
/**
 * Define different translations + versions (text, audio, informal etc)
 */
var VersionId;
(function (VersionId) {
    VersionId["en_us"] = "en_us";
    VersionId["en_au"] = "en_au";
    VersionId["tz_audio"] = "tz_audio";
    VersionId["sg_text_formal"] = "sg_text_formal";
    VersionId["sg_text_informal"] = "sg_text_informal";
    VersionId["sg_audio_formal"] = "sg_audio_formal";
    VersionId["sg_audio_informal"] = "sg_audio_informal"; //Audio, Informal Senegalese French
})(VersionId = exports.VersionId || (exports.VersionId = {}));
//# sourceMappingURL=TwilioTypes.js.map