"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
const utils_1 = require("../../../utils");
const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${process.env.storageBucket.replace("\"", '')}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
function generatePlay(messageId) {
    return { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, `wl_audio/${messageId}.mp3`, firebaseToken) };
}
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        generatePlay('W7'),
    ]
};
exports.default = en_text;
