"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
//TODO: how do we allow the entrypoint to have runtime variables?
const en_text = {
    'entrypoint': [
        utils_1.generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
        //RW-TODO: How do we generate numbers on the fly???
        {
            type: TwilioTypes_1.MessageType.DYNAMIC_SAY,
            //RW-TODO: Maybe this needs to be an already serialized function?
            func: (params) => {
                return {
                    type: TwilioTypes_1.MessageType.SAY,
                    text: params[0],
                    language: 'en-US'
                };
            }
        },
        utils_1.generateText('kg of green leaf at'),
        utils_1.generateText('LOCATION.'),
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=en_text_messages.js.map