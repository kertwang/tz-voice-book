"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const envConfig = functions.config();
exports.twilioAccountSid = envConfig.config.twilio_account_sid;
exports.twilioAuthToken = envConfig.config.twilio_auth_token;
//# sourceMappingURL=Env.js.map