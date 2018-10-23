"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_au_flows_1 = require("./en_au_flows");
const en_au_blocks_1 = require("./en_au_blocks");
const en_au_messages_1 = require("./en_au_messages");
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const en_au = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: en_au_blocks_1.default,
    flows: en_au_flows_1.default,
    messages: en_au_messages_1.default,
};
const configs = {
    en_au,
};
exports.default = configs;
//# sourceMappingURL=index.js.map