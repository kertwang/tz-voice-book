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
    FlowType[FlowType["DEFAULT"] = 0] = "DEFAULT";
    FlowType[FlowType["GATHER"] = 1] = "GATHER";
})(FlowType = exports.FlowType || (exports.FlowType = {}));
var BlockType;
(function (BlockType) {
    BlockType[BlockType["DEFAULT"] = 0] = "DEFAULT";
    BlockType[BlockType["PLAYBACK"] = 1] = "PLAYBACK";
    BlockType[BlockType["RECORD"] = 2] = "RECORD";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["SAY"] = 0] = "SAY";
    MessageType[MessageType["PLAY"] = 1] = "PLAY";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
;
//# sourceMappingURL=TwilioTypes.js.map