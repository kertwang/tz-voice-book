"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const format = require("xml-formatter");
function getBotId(maybeBotId) {
    const botId = TwilioTypes_1.BotId[maybeBotId];
    if (!botId) {
        throw new Error(`Could not find botId for ${maybeBotId}`);
    }
    return botId;
}
exports.getBotId = getBotId;
function pathToBlock(path) {
    const sanitized = path.replace(/\/$/, "");
    const key = sanitized.substr(sanitized.lastIndexOf("/") + 1);
    const blockId = TwilioTypes_1.BlockId[key];
    if (!blockId) {
        throw new Error(`Could not find blockId from path: ${path}`);
    }
    return blockId;
}
exports.pathToBlock = pathToBlock;
function logGatherBlock(block, result) {
    if (process.env.VERBOSE_LOG !== 'true') {
        return;
    }
    console.log(`GATHER ${block}: '${result.speechResult}' @ ${result.confidence}%`);
}
exports.logGatherBlock = logGatherBlock;
function logTwilioResponse(xmlString) {
    //TODO: make a cloud function config
    // if (process.env.LOG_TWILIO_RESPONSE !== 'true') {
    //   return;
    // }
    console.log(`TWILIO Response: \n ${format(xmlString)}`);
}
exports.logTwilioResponse = logTwilioResponse;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
exports.generateUrl = (urlPrefix, path, firebaseToken) => {
    //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
    return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
};
/**
 * Use this to inject pagination where we don't have it set up
 * This is really less than ideal, and we need to find a better way.
 */
exports.saftelyGetPageParamsOrDefaults = (params) => {
    console.log('params are', params);
    const page = params.page ? parseInt(params.page) : 0;
    let pageSize = params.pageSize ? parseInt(params.pageSize) : 1;
    let maxMessages = params.maxMessages ? parseInt(params.maxMessages) : 10;
    //Also handle shitty twilio url encoded params :(
    if (params['amp;pageSize']) {
        pageSize = parseInt(params['amp;pageSize']);
    }
    if (params['amp;maxMessages']) {
        maxMessages = parseInt(params['amp;maxMessages']);
    }
    return {
        page,
        pageSize,
        maxMessages,
    };
};
/**
 * Make a magical paginated url
 */
exports.buildPaginatedUrl = (baseUrl, botId, blockName, nextPageNo, pageSize, maxMessages) => {
    return `${baseUrl}/twiml/${botId}/${blockName}?page=${nextPageNo}\&pageSize=${pageSize}\&maxMessages=${maxMessages}`;
};
//# sourceMappingURL=index.js.map