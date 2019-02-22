"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
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
        return request(options)
            .then((response) => console.log(response))
            .catch((err) => {
            console.warn(`ZapierApi.optOut error: ${err.message}`);
        });
    }
}
exports.default = ZapierApi;
//# sourceMappingURL=ZapierApi.js.map