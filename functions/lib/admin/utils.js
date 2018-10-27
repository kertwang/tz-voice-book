"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
exports.generateText = (text) => {
    return {
        type: TwilioTypes_1.MessageType.SAY,
        text,
        language: 'en-AU'
    };
};
//# sourceMappingURL=utils.js.map