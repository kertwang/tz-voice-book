"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const utils_1 = require("../utils");
const LocalEnv_1 = require("../utils/LocalEnv");
exports.generateText = (text) => {
    return {
        type: TwilioTypes_1.MessageType.SAY,
        text,
        language: 'en-US'
    };
};
const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${LocalEnv_1.storageBucket}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
function generatePlay(prefix, messageId) {
    return { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, `${prefix}/${messageId}.mp3`, firebaseToken) };
}
exports.generatePlay = generatePlay;
