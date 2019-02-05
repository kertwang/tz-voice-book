"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
//TODO: how do we allow the entrypoint to have runtime variables?
const en_text = {
    'entrypoint': [
        utils_1.generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
        //TODO: maybe we can have a generate number function which pieces together numbers?
        utils_1.generateText('100'),
        utils_1.generateText('kg of green leaf at'),
        utils_1.generateText('LOCATION.'),
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=en_text_messages.js.map