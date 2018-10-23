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
        next: TwilioTypes_1.BlockId.intro_0,
    },
    // TODO: Not sure how to end the call...
    'notification_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0,
    },
};
exports.default = TwilioFlows;
//# sourceMappingURL=en_au_flows.js.map