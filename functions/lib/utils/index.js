"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioRouter_1 = require("../apis/TwilioRouter");
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
    console.log(`GATHER ${block}: ${result.speechResult} @ ${result.confidence}%`);
}
exports.logGatherBlock = logGatherBlock;
//# sourceMappingURL=index.js.map