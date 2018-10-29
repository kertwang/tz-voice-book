"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const Env_1 = require("./Env");
//TODO: make more explicit
function log(logObj) {
    const anonymous = Object.assign({ time: moment().toISOString() }, logObj);
    console.log(JSON.stringify(anonymous));
}
exports.log = log;
function maybeLog(...params) {
    if (!Env_1.shouldLog) {
        return;
    }
    console.log(...params);
}
exports.maybeLog = maybeLog;
//# sourceMappingURL=Log.js.map