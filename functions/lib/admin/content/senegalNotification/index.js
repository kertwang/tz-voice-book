"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sg_text_formal_blocks_1 = require("./sg_text_formal_blocks");
const sg_text_formal_flows_1 = require("./sg_text_formal_flows");
const sg_text_formal_messages_1 = require("./sg_text_formal_messages");
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const sg_text_formal = {
    botId: TwilioTypes_1.BotId.senegalNotification,
    blocks: sg_text_formal_blocks_1.default,
    flows: sg_text_formal_flows_1.default,
    messages: sg_text_formal_messages_1.default,
};
// const sg_text_informal: BotConfig = {
//   botId: BotId.senegalNotification,
//   blocks: en_au_blocks,
//   flows: en_au_flows,
//   messages: en_au_messages,
// };
const configs = {
    sg_text_formal,
};
exports.default = configs;
//# sourceMappingURL=index.js.map