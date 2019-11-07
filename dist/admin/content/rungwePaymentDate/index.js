"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var en_text_blocks_1 = __importDefault(require("./en_text_blocks"));
var en_text_flows_1 = __importDefault(require("./en_text_flows"));
var en_text_messages_1 = __importDefault(require("./en_text_messages"));
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var en_text = {
    botId: TwilioTypes_1.BotId.rungwePaymentDate,
    blocks: en_text_blocks_1["default"],
    flows: en_text_flows_1["default"],
    messages: en_text_messages_1["default"],
    versionId: 'en_text'
};
var configs = {
    en_text: en_text
};
exports["default"] = configs;
