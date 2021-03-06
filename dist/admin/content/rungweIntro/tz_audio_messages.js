"use strict";
exports.__esModule = true;
var utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
var en_text = {
    'entrypoint': [
        //'rungwe_deposit_tz/hi'
        utils_1.generatePlay('rungwe_deposit_tz', 'intro'),
    ],
    'stop': [
        //'rungwe_deposit_tz/stop'
        utils_1.generatePlay('rungwe_deposit_tz', 'stop'),
    ],
    'stop_confirm': [
        //'rungwe_deposit_tz/stop_confirm'
        utils_1.generatePlay('rungwe_deposit_tz', 'stop_confirm'),
    ],
    //This must be empty
    'end': []
};
exports["default"] = en_text;
