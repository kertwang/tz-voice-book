"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
//TODO: make more explicit
function log(logObj) {
    const anonymous = Object.assign({ time: moment().toISOString() }, logObj);
    console.log(JSON.stringify(anonymous));
}
exports.log = log;
//# sourceMappingURL=Log.js.map