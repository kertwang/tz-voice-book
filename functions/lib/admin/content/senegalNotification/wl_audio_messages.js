"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const utils_1 = require("../../utils");
const utils_2 = require("../../../utils");
const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${process.env.storageBucket.replace("\"", '')}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_2.generateUrl(urlPrefix, 'wl_audio/W1.mp3', firebaseToken) },
    ],
    'notification_0': [
        utils_1.generateText('You have recieved some money.'),
    ],
};
exports.default = en_text;
//# sourceMappingURL=wl_audio_messages.js.map