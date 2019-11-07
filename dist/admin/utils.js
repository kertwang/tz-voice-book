"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var utils_1 = require("../utils");
var LocalEnv_1 = require("../utils/LocalEnv");
exports.generateText = function (text) {
    return {
        type: TwilioTypes_1.MessageType.SAY,
        text: text,
        language: 'en-US'
    };
};
var urlPrefix = "https://www.googleapis.com/download/storage/v1/b/" + LocalEnv_1.storageBucket + "/o/";
var firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
function generatePlay(prefix, messageId) {
    return { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, prefix + "/" + messageId + ".mp3", firebaseToken) };
}
exports.generatePlay = generatePlay;
