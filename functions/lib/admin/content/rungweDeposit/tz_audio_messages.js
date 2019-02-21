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
        //rungweDeposit/en/hi
        utils_1.generatePlay('rungwe_deposit_tz', 'hi'),
        //generic_numbers/en/*
        {
            type: TwilioTypes_1.MessageType.DYNAMIC_PLAY,
            //These must be self contained
            func: (params, urlGenerator) => {
                const weightSplit = params[0].split('');
                return weightSplit.map(n => {
                    const message = {
                        type: TwilioTypes_1.MessageType.PLAY,
                        url: urlGenerator(`generic_numbers_tz/${n}.mp3`),
                    };
                    return message;
                });
            }
        },
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=tz_audio_messages.js.map