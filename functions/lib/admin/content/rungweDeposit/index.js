"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_text_blocks_1 = require("./en_text_blocks");
const en_text_flows_1 = require("./en_text_flows");
const en_text_messages_1 = require("./en_text_messages");
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const en_text = {
    botId: TwilioTypes_1.BotId.rungweDeposit,
    blocks: en_text_blocks_1.default,
    flows: en_text_flows_1.default,
    messages: en_text_messages_1.default,
};
const configs = {
    en_text,
};
exports.default = configs;
//# sourceMappingURL=index.js.map