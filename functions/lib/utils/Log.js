"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const Env_1 = require("./Env");
//TODO: make more explicit
function log(logObj) {
    const anonymous = {
        time: moment_1.default().toISOString(),
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
