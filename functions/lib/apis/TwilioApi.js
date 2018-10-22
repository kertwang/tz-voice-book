"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    /**
     * startCall
     *
     * Initiate a call to the given number
     */
    startCall(mobile, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                //Figure out the url we want to trigger
                url,
                to: mobile,
                // from: '+61282947835', //This must be twilio number
                from: '+18442526460',
            };
            return this.client.calls.create(options)
                .then((call) => process.stdout.write(call.sid));
        });
    }
}
exports.TwilioApi = TwilioApi;
//# sourceMappingURL=TwilioApi.js.map