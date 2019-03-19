"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var en_text_blocks_1 = __importDefault(require("./en_text_blocks"));
var en_text_flows_1 = __importDefault(require("./en_text_flows"));
var en_text_messages_1 = __importDefault(require("./en_text_messages"));
var fr_audio_blocks_1 = __importDefault(require("./fr_audio_blocks"));
var fr_audio_flows_1 = __importDefault(require("./fr_audio_flows"));
var fr_audio_messages_1 = __importDefault(require("./fr_audio_messages"));
var wl_audio_blocks_1 = __importDefault(require("./wl_audio_blocks"));
var wl_audio_flows_1 = __importDefault(require("./wl_audio_flows"));
var wl_audio_messages_1 = __importDefault(require("./wl_audio_messages"));
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var en_text = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: en_text_blocks_1["default"],
    flows: en_text_flows_1["default"],
    messages: en_text_messages_1["default"]
};
var fr_audio = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: fr_audio_blocks_1["default"],
    flows: fr_audio_flows_1["default"],
    messages: fr_audio_messages_1["default"]
};
var wl_audio = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: wl_audio_blocks_1["default"],
    flows: wl_audio_flows_1["default"],
    messages: wl_audio_messages_1["default"]
};
var configs = {
    en_text: en_text,
    fr_audio: fr_audio,
    wl_audio: wl_audio
};
exports["default"] = configs;
