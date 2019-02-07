"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blocks_1 = require("./blocks");
const flows_1 = require("./flows");
const en_text_messages_1 = require("./en_text_messages");
const en_audio_messages_1 = require("./en_audio_messages");
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
const configs = {
    en_text,
    en_audio,
};
exports.default = configs;
//# sourceMappingURL=index.js.map