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
//# sourceMappingURL=index.js.map