"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var Env_1 = require("../utils/Env");
var ZapierApi = /** @class */ (function () {
    function ZapierApi() {
    }
    /**
     * optOut
     *
     * Send a request to zapier to opt out
     * Works only for Rungwe atm
     *
     *
     */
    ZapierApi.optOut = function (mobile) {
        var options = {
            url: Env_1.optOutWebookUrl,
            body: {
                mobile: mobile
            },
            json: true
        };
        return request_promise_native_1["default"](options)
            .then(function (response) { return console.log(response); })["catch"](function (err) {
            console.warn("ZapierApi.optOut error: " + err.message);
        });
    };
    return ZapierApi;
}());
exports["default"] = ZapierApi;
