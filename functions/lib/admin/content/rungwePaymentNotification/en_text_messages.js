"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
//TODO: how do we allow the entrypoint to have runtime variables?
const en_text = {
    //TODO: Handle specify if farmer has debits etc.
    'entrypoint': [
        utils_1.generateText(' Your payment is now available. This month you will receive a payment of '),
        //TODO: maybe we can have a generate number function which pieces together numbers?
        utils_1.generateText('100'),
        utils_1.generateText('schillings for the'),
        utils_1.generateText('10'),
        utils_1.generateText('kilograms of tea that you sold. You can collect your payment at'),
        utils_1.generateText('LOCATION.'),
        //TODO: Runtime variable, does the farmer have debits?
        utils_1.generateText('This includes a deduction of zzz for the fertilizer.'),
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=en_text_messages.js.map