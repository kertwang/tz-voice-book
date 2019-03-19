"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows = {
    'entrypoint': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.stop,
    },
    'stop': {
        //TODO: how do we make this default to end?
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.error_0,
        digitMatches: [
            //I'm pretty sure the first option is the default.
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.end },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.end },
            { digits: '3', nextBlock: TwilioTypes_1.BlockId.stop_confirm },
        ],
    },
    'stop_confirm': {
        //This will terminate.
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.entrypoint,
    },
    'end': {
        //This will terminate.
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.entrypoint,
    }
};
exports.default = TwilioFlows;
