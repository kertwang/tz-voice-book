"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio = __importStar(require("twilio"));
const Env_1 = require("../utils/Env");
const Log_1 = require("../utils/Log");
const LogTypes_1 = require("../types_rn/LogTypes");
class TwilioApi {
    constructor() {
        this.client = twilio(Env_1.twilioAccountSid, Env_1.twilioAuthToken);
    }
    getClient() {
        return this.client;
    }
    /**
     * startCall
     *
     * Initiate a call to the given number
     *
     * handle exceptions properly with Twilio.
     * We should move to the SomeResult pattern anyway
     */
    startCall(botId, mobile, url) {
        const options = {
            url,
            to: mobile,
            from: Env_1.twilioOutboundNumber,
        };
        Log_1.log({
            type: LogTypes_1.LogType.TWILIO_API_REQUEST,
            botId,
            method: 'client.calls.create',
            params: options,
        });
        return this.client.calls.create(options)
            .then((call) => {
            Log_1.log({
                type: LogTypes_1.LogType.TWILIO_API_RESPONSE,
                botId,
                method: 'client.calls.create',
                response: call,
            });
            return call.sid;
        });
    }
}
exports.TwilioApi = TwilioApi;
