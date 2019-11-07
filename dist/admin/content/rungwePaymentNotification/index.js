"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var blocks_1 = __importDefault(require("./blocks"));
var flows_1 = __importDefault(require("./flows"));
var en_text_messages_1 = __importDefault(require("./en_text_messages"));
var tz_audio_messages_1 = __importDefault(require("./tz_audio_messages"));
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var en_text = {
    botId: TwilioTypes_1.BotId.rungwePaymentNotification,
    versionId: 'en_text',
    blocks: blocks_1["default"],
    flows: flows_1["default"],
    messages: en_text_messages_1["default"]
};
var tz_audio = {
    botId: TwilioTypes_1.BotId.rungwePaymentNotification,
    versionId: 'tz_audio',
    blocks: blocks_1["default"],
    flows: flows_1["default"],
    messages: tz_audio_messages_1["default"]
};
var configs = {
    en_text: en_text,
    tz_audio: tz_audio
};
exports["default"] = configs;
