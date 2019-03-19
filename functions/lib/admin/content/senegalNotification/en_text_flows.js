"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
var TwilioFlows = {
    'entrypoint': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.entrypoint
    }
};
exports["default"] = TwilioFlows;
