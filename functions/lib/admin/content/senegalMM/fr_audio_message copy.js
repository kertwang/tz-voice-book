"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const generateText = (text) => {
    return {
        type: TwilioTypes_1.MessageType.SAY,
        text,
        language: 'en-AU'
    };
};
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        generateText('Hello. This is an automated notification.'),
    ],
    'notification_0': [
        generateText('You have recieved some money.'),
    ],
};
exports.default = en_text;
//# sourceMappingURL=fr_audio_message copy.js.map