"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var TwilioBlocks = {
    'entrypoint': { type: TwilioTypes_1.BlockType.DEFAULT },
    'stop': { type: TwilioTypes_1.BlockType.DEFAULT },
    'stop_confirm': { type: TwilioTypes_1.BlockType.END },
    'end': { type: TwilioTypes_1.BlockType.END }
};
exports["default"] = TwilioBlocks;
