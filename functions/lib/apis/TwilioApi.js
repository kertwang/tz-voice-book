"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio = require("twilio");
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
     * TODO: for some reason using the async/await api doesn't
     * handle exceptions properly with Twilio.
     * We should move to the SomeResult pattern anyway
     */
    startCall(mobile, url) {
        const options = {
            url,
            to: mobile,
            from: Env_1.twilioOutboundNumber,
        };
        Log_1.log({
            type: LogTypes_1.LogType.TWILIO_API_REQUEST,
            method: 'client.calls.create',
            params: options,
        });
        return this.client.calls.create(options)
            .then((call) => {
            Log_1.log({
                type: LogTypes_1.LogType.TWILIO_API_RESPONSE,
                method: 'client.calls.create',
                response: call,
            });
            return call.sid;
        });
    }
}
exports.TwilioApi = TwilioApi;
//# sourceMappingURL=TwilioApi.js.map