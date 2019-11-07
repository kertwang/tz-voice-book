"use strict";
exports.__esModule = true;
var RC = require('parse-strings-in-object')(require('rc')('VB', require('../../config/default.js')));
exports.twilioAccountSid = RC.twilio_account_sid;
exports.twilioAuthToken = RC.twilio_auth_token;
exports.baseUrl = RC.base_url;
exports.twilioOutboundNumber = RC.twilio_outbound_number;
exports.temporaryInsecureAuthKey = RC.temporary_insecure_auth_key;
exports.serviceAccountKeyFileName = RC.service_account_key_file_name;
exports.databaseUrl = RC.database_url;
exports.storageBucket = RC.storage_bucket;
exports.informalNotificationUrl = RC.informal_notification_url;
exports.formalNotificationUrl = RC.formal_notification_url;
exports.mm101CallUrl = RC.mm_101_url;
exports.shouldLog = RC.should_log;
exports.shouldDisplayEnglishTestCall = RC.should_display_english_test_call;
exports.testCallUrl = RC.test_call_url;
exports.relayDefaultCountrycode = RC.relay_default_country_code;
exports.urlPrefix = RC.url_prefix;
exports.firebaseToken = RC.firebase_token;
exports.optOutWebookUrl = RC.opt_out_webhook_url;
exports.shouldLogTwilioResponse = RC.should_log_twilio_response;
/* Overridden by Heroku */
exports.PORT = process.env.PORT || RC.PORT;
exports.DATABASE_URL = process.env.DATABASE_URL || RC.DATABASE_URL;
/* Test Configs - should only be referred to for tests etc.*/
exports.testMobile = RC.test_mobile;
