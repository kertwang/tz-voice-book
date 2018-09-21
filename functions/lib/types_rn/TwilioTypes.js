"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 */
var BlockId;
(function (BlockId) {
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
var BotId;
(function (BotId) {
    BotId["voicebook"] = "voicebook";
})(BotId = exports.BotId || (exports.BotId = {}));
var VersionId;
(function (VersionId) {
    VersionId["en_us"] = "en_us";
    VersionId["en_au"] = "en_au";
    VersionId["tz_audio"] = "tz_audio";
})(VersionId = exports.VersionId || (exports.VersionId = {}));
var LogType;
(function (LogType) {
    LogType["BLOCK"] = "BLOCK";
    LogType["FEEDBACK"] = "FEEDBACK";
    LogType["PENDING_MESSAGE"] = "PENDING_MESSAGE";
    LogType["POST_MESSAGE"] = "POST_MESSAGE";
})(LogType = exports.LogType || (exports.LogType = {}));
//# sourceMappingURL=TwilioTypes.js.map