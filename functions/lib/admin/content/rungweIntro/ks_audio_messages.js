"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        //'rungwe_deposit_ks/hi'
        utils_1.generatePlay('rungwe_deposit_ks', 'intro'),
    ],
    'stop': [
        //'rungwe_deposit_ks/stop'
        utils_1.generatePlay('rungwe_deposit_ks', 'stop'),
    ],
    'stop_confirm': [
        //'rungwe_deposit_ks/stop_confirm'
        utils_1.generatePlay('rungwe_deposit_ks', 'stop_confirm'),
    ],
    //This must be empty
    'end': []
};
exports.default = en_text;
//# sourceMappingURL=ks_audio_messages.js.map