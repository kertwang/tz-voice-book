const RC = require('parse-strings-in-object')(require('rc')('VB', require('../../config/default.js')))

export const twilioAccountSid = RC.twilio_account_sid;
export const twilioAuthToken = RC.twilio_auth_token;
export const baseUrl = RC.base_url;
export const twilioOutboundNumber = RC.twilio_outbound_number;
export const temporaryInsecureAuthKey = RC.temporary_insecure_auth_key
export const serviceAccountKeyFileName = RC.service_account_key_file_name;
export const databaseUrl = RC.database_url;
export const storageBucket = RC.storage_bucket;
export const informalNotificationUrl = RC.informal_notification_url;
export const formalNotificationUrl = RC.formal_notification_url;
export const mm101CallUrl = RC.mm_101_url;
export const shouldLog = RC.should_log;
export const shouldDisplayEnglishTestCall = RC.should_display_english_test_call
export const testCallUrl = RC.test_call_url;
export const relayDefaultCountrycode = RC.relay_default_country_code;
export const urlPrefix = RC.url_prefix;
export const firebaseToken = RC.firebase_token;
export const optOutWebookUrl = RC.opt_out_webhook_url;
export const shouldLogTwilioResponse = RC.should_log_twilio_response;

/* Overridden by Heroku */
export const PORT = process.env.PORT || RC.PORT
export const DATABASE_URL = process.env.DATABASE_URL || RC.DATABASE_URL

/* Test Configs - should only be referred to for tests etc.*/
export const testMobile = RC.test_mobile



