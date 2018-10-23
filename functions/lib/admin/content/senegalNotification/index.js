"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_au_flows_1 = require("./en_au_flows");
const en_au_blocks_1 = require("./en_au_blocks");
const en_au_messages_1 = require("./en_au_messages");
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const sg_text_formal = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: en_au_blocks_1.default,
    flows: en_au_flows_1.default,
    messages: en_au_messages_1.default,
};
const sg_text_informal = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: en_au_blocks_1.default,
    flows: en_au_flows_1.default,
    messages: en_au_messages_1.default,
};
const configs = {
    sg_text_formal,
    sg_text_informal,
};
exports.default = configs;
//# sourceMappingURL=index.js.map