"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
//TODO: how do we allow the entrypoint to have runtime variables?
//params[0] => weight of leaf - must be an integer
//params[1] => location name
const en_text = {
    'entrypoint': [
        utils_1.generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
        //Amount
        {
            type: TwilioTypes_1.MessageType.DYNAMIC_PLAY,
            func: (params) => {
                const weightSplit = params[0].split('');
                //TODO: handle commas, bad characters etc.
                return weightSplit.map(n => utils_1.generatePlay('generic_numbers/en', n));
            }
        },
        utils_1.generateText('kg of green leaf at'),
        //Location
        {
            type: TwilioTypes_1.MessageType.DYNAMIC_SAY,
            func: (params) => {
                return [{
                        type: TwilioTypes_1.MessageType.SAY,
                        text: params[1],
                        language: 'en-US'
                    }];
            }
        },
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=en_audio_messages.js.map