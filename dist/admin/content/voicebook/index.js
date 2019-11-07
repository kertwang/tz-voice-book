"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var en_us_flows_1 = __importDefault(require("./en_us_flows"));
var en_us_blocks_1 = __importDefault(require("./en_us_blocks"));
var en_us_messages_1 = __importDefault(require("./en_us_messages"));
var en_au_flows_1 = __importDefault(require("./en_au_flows"));
var en_au_blocks_1 = __importDefault(require("./en_au_blocks"));
var en_au_messages_1 = __importDefault(require("./en_au_messages"));
var tz_audio_flows_1 = __importDefault(require("./tz_audio_flows"));
var tz_audio_blocks_1 = __importDefault(require("./tz_audio_blocks"));
var tz_audio_messages_1 = __importDefault(require("./tz_audio_messages"));
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var en_us = {
    botId: TwilioTypes_1.BotId.voicebook,
    blocks: en_us_blocks_1["default"],
    flows: en_us_flows_1["default"],
    messages: en_us_messages_1["default"],
    versionId: 'en_us'
};
var en_au = {
    botId: TwilioTypes_1.BotId.voicebook,
    blocks: en_au_blocks_1["default"],
    flows: en_au_flows_1["default"],
    messages: en_au_messages_1["default"],
    versionId: 'en_au'
};
var tz_audio = {
    botId: TwilioTypes_1.BotId.voicebook,
    blocks: tz_audio_blocks_1["default"],
    flows: tz_audio_flows_1["default"],
    messages: tz_audio_messages_1["default"],
    versionId: 'tz_audio'
};
var configs = {
    en_us: en_us,
    en_au: en_au,
    tz_audio: tz_audio
};
exports["default"] = configs;
