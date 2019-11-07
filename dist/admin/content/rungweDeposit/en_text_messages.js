"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
//TODO: how do we allow the entrypoint to have runtime variables?
var en_text = {
    'entrypoint': [
        //hi
        utils_1.generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
        {
            type: TwilioTypes_1.MessageType.DYNAMIC_SAY,
            func: function (params) {
                return [{
                        type: TwilioTypes_1.MessageType.SAY,
                        text: params[0],
                        language: 'en-US'
                    }];
            }
        },
        //green_leaf
        utils_1.generateText('kg of green leaf at'),
        utils_1.generateText('LOCATION.'),
    ],
    //This must be empty
    'end': []
};
exports["default"] = en_text;
