"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var Env_1 = require("./Env");
function log(logObj) {
    if (!Env_1.shouldLog) {
        return;
    }
    var anonymous = __assign({ time: moment_1["default"]().toISOString() }, logObj);
    console.log(JSON.stringify(anonymous, null, 2));
}
exports.log = log;
function maybeLog() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (!Env_1.shouldLog) {
        return;
    }
    console.log.apply(console, params);
}
exports.maybeLog = maybeLog;
