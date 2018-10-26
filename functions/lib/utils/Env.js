"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const envConfig = functions.config();
exports.twilioAccountSid = envConfig.config.twilio_account_sid;
exports.twilioAuthToken = envConfig.config.twilio_auth_token;
exports.baseUrl = envConfig.config.base_url;
exports.twilioOutboundNumber = envConfig.config.twilio_outbound_number;
exports.temporaryInsecureAuthKey = envConfig.config.temporary_insecure_auth_key;
exports.serviceAccountKeyFileName = envConfig.config.service_account_key_file_name;
exports.databaseUrl = envConfig.config.database_url;
exports.storageBucket = envConfig.config.storage_bucket;
exports.informalNotificationUrl = envConfig.config.informal_notification_url;
exports.formalNotificationUrl = envConfig.config.formal_notification_url;
exports.mm101CallUrl = envConfig.config.mm_101_url;
//# sourceMappingURL=Env.js.map