"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const Env_1 = require("../utils/Env");
class ZapierApi {
    /**
     * optOut
     *
     * Send a request to zapier to opt out
     * Works only for Rungwe atm
     *
     *
     */
    static optOut(mobile) {
        const options = {
            url: Env_1.optOutWebookUrl,
            body: {
                mobile,
            },
            json: true,
        };
        return request_promise_native_1.default(options)
            .then((response) => console.log(response))
            .catch((err) => {
            console.warn(`ZapierApi.optOut error: ${err.message}`);
        });
    }
}
exports.default = ZapierApi;
