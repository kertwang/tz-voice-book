"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        utils_1.generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).This is a new service for our farmers.We will notify you from this number by phone call and text to let you know when your monthly payment is available.'),
    ],
    'stop': [
        utils_1.generateText('These messages are free. If you would like to stop receiving voice and text messages from RSTGA, press 3 on your phone keypad. If you would like to continue receiving messages, you do not have to do anything and you may hang up at any time. '),
    ],
    'stop_confirm': [
        utils_1.generateText('Ok. You will no longer receive messages from RSTGA.'),
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=en_text_messages 13-58-23-925.js.map