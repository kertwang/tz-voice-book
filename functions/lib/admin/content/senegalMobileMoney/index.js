"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_text_blocks_1 = __importDefault(require("./en_text_blocks"));
const en_text_flows_1 = __importDefault(require("./en_text_flows"));
const en_text_messages_1 = __importDefault(require("./en_text_messages"));
const fr_audio_blocks_1 = __importDefault(require("./fr_audio_blocks"));
const fr_audio_flows_1 = __importDefault(require("./fr_audio_flows"));
const fr_audio_messages_1 = __importDefault(require("./fr_audio_messages"));
const wl_audio_blocks_1 = __importDefault(require("./wl_audio_blocks"));
const wl_audio_flows_1 = __importDefault(require("./wl_audio_flows"));
const wl_audio_messages_1 = __importDefault(require("./wl_audio_messages"));
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const en_text = {
    botId: TwilioTypes_1.BotId.senegalMobileMoney,
    blocks: en_text_blocks_1.default,
    flows: en_text_flows_1.default,
    messages: en_text_messages_1.default,
};
const fr_audio = {
    botId: TwilioTypes_1.BotId.senegalMobileMoney,
    blocks: fr_audio_blocks_1.default,
    flows: fr_audio_flows_1.default,
    messages: fr_audio_messages_1.default,
};
const wl_audio = {
    botId: TwilioTypes_1.BotId.senegalMobileMoney,
    blocks: wl_audio_blocks_1.default,
    flows: wl_audio_flows_1.default,
    messages: wl_audio_messages_1.default,
};
const configs = {
    en_text,
    fr_audio,
    wl_audio
};
exports.default = configs;
