"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = __importStar(require("moment"));
const Env_1 = require("./Env");
//TODO: make more explicit
function log(logObj) {
    const anonymous = {
        time: moment().toISOString(),
        ...logObj
    };
    console.log(JSON.stringify(anonymous, null, 2));
}
exports.log = log;
function maybeLog(...params) {
    if (!Env_1.shouldLog) {
        return;
    }
    console.log(...params);
}
exports.maybeLog = maybeLog;
