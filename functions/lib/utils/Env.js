"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const envConfig = functions.config();
exports.twilioAccountSid = envConfig.config.twilio_account_sid;
exports.twilioAuthToken = envConfig.config.twilio_auth_token;
exports.baseUrl = envConfig.config.base_url;
exports.twilioOutboundNumber = envConfig.config.twilio_outbound_number;
exports.temporaryInsecureAuthKey = envConfig.config.temporary_insecure_auth_key;
//# sourceMappingURL=Env.js.map