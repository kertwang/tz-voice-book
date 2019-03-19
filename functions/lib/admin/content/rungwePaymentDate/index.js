"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_text_blocks_1 = __importDefault(require("./en_text_blocks"));
const en_text_flows_1 = __importDefault(require("./en_text_flows"));
const en_text_messages_1 = __importDefault(require("./en_text_messages"));
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const en_text = {
    botId: TwilioTypes_1.BotId.rungwePaymentDate,
    blocks: en_text_blocks_1.default,
    flows: en_text_flows_1.default,
    messages: en_text_messages_1.default,
};
const configs = {
    en_text,
};
exports.default = configs;
