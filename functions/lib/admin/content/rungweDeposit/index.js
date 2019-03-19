"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blocks_1 = __importDefault(require("./blocks"));
const flows_1 = __importDefault(require("./flows"));
const en_text_messages_1 = __importDefault(require("./en_text_messages"));
const en_audio_messages_1 = __importDefault(require("./en_audio_messages"));
const tz_audio_messages_1 = __importDefault(require("./tz_audio_messages"));
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const en_text = {
    botId: TwilioTypes_1.BotId.rungweDeposit,
    messages: en_text_messages_1.default,
    blocks: blocks_1.default,
    flows: flows_1.default,
};
const en_audio = {
    botId: TwilioTypes_1.BotId.rungweDeposit,
    messages: en_audio_messages_1.default,
    blocks: blocks_1.default,
    flows: flows_1.default,
};
const tz_audio = {
    botId: TwilioTypes_1.BotId.rungweDeposit,
    blocks: blocks_1.default,
    flows: flows_1.default,
    messages: tz_audio_messages_1.default,
};
const configs = {
    en_text,
    en_audio,
    tz_audio,
};
exports.default = configs;
