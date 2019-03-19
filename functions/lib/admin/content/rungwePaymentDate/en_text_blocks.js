"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const TwilioBlocks = {
    'entrypoint': { type: TwilioTypes_1.BlockType.DEFAULT },
    'stop': { type: TwilioTypes_1.BlockType.DEFAULT },
    'stop_confirm': { type: TwilioTypes_1.BlockType.END },
    'end': { type: TwilioTypes_1.BlockType.END },
};
exports.default = TwilioBlocks;
