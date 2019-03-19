"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var utils_1 = require("../../../utils");
var LocalEnv_1 = require("../../../utils/LocalEnv");
var urlPrefix = "https://www.googleapis.com/download/storage/v1/b/" + LocalEnv_1.storageBucket + "/o/";
var firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
function generatePlay(messageId) {
    return { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, "wl_audio/" + messageId + ".mp3", firebaseToken) };
}
/* the deploy script will automatically fill in the urls for us */
var en_text = {
    'entrypoint': [
        generatePlay('W7'),
    ]
};
exports["default"] = en_text;
