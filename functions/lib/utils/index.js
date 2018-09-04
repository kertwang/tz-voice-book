"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioRouter_1 = require("../apis/TwilioRouter");
const format = require("xml-formatter");
function pathToBlock(path) {
    const sanitized = path
        .replace('/gather/', '')
        .replace('/', '');
    return TwilioRouter_1.Block[sanitized];
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
    if (process.env.LOG_TWILIO_RESPONSE !== 'true') {
        return;
    }
    console.log(`TWILIO Response: \n ${format(xmlString)}`);
}
exports.logTwilioResponse = logTwilioResponse;
//# sourceMappingURL=index.js.map