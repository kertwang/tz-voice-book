"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio = require("twilio");
const Env_1 = require("../utils/Env");
class TwilioApi {
    constructor() {
        this.client = twilio(Env_1.twilioAccountSid, Env_1.twilioAuthToken);
    }
    getClient() {
        return this.client;
    }
}
exports.TwilioApi = TwilioApi;
//# sourceMappingURL=TwilioApi.js.map