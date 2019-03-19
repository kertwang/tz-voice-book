"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("request-promise-native"));
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
