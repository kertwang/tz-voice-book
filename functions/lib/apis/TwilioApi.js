"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var twilio_1 = __importDefault(require("twilio"));
var Env_1 = require("../utils/Env");
var Log_1 = require("../utils/Log");
var LogTypes_1 = require("../types_rn/LogTypes");
var TwilioApi = /** @class */ (function () {
    function TwilioApi() {
        this.client = twilio_1["default"](Env_1.twilioAccountSid, Env_1.twilioAuthToken);
    }
    TwilioApi.prototype.getClient = function () {
        return this.client;
    };
    /**
     * startCall
     *
     * Initiate a call to the given number
     *
     * handle exceptions properly with Twilio.
     * We should move to the SomeResult pattern anyway
     */
    TwilioApi.prototype.startCall = function (botId, mobile, url) {
        var options = {
            url: url,
            to: mobile,
            from: Env_1.twilioOutboundNumber
        };
        Log_1.log({
            type: LogTypes_1.LogType.TWILIO_API_REQUEST,
            botId: botId,
            method: 'client.calls.create',
            params: options
        });
        return this.client.calls.create(options)
            .then(function (call) {
            Log_1.log({
                type: LogTypes_1.LogType.TWILIO_API_RESPONSE,
                botId: botId,
                method: 'client.calls.create',
                response: call
            });
            return call.sid;
        });
    };
    return TwilioApi;
}());
exports.TwilioApi = TwilioApi;
