"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_us_flows_1 = require("./en_us_flows");
const en_us_blocks_1 = require("./en_us_blocks");
const en_us_messages_1 = require("./en_us_messages");
const en_au_flows_1 = require("./en_au_flows");
const en_au_blocks_1 = require("./en_au_blocks");
const en_au_messages_1 = require("./en_au_messages");
const tz_audio_flows_1 = require("./tz_audio_flows");
const tz_audio_blocks_1 = require("./tz_audio_blocks");
const tz_audio_messages_1 = require("./tz_audio_messages");
const en_us = {
    blocks: en_us_blocks_1.default,
    flows: en_us_flows_1.default,
    messages: en_us_messages_1.default,
};
const en_au = {
    blocks: en_au_blocks_1.default,
    flows: en_au_flows_1.default,
    messages: en_au_messages_1.default,
};
const tz_audio = {
    blocks: tz_audio_blocks_1.default,
    flows: tz_audio_flows_1.default,
    messages: tz_audio_messages_1.default,
};
const configs = {
    en_us,
    en_au,
    tz_audio,
};
exports.default = configs;
//# sourceMappingURL=index.js.map