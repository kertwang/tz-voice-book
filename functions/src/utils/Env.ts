import * as functions from 'firebase-functions';
import { getBoolean } from '.';

const envConfig = functions.config();

export const twilioAccountSid = envConfig.config.twilio_account_sid;
export const twilioAuthToken = envConfig.config.twilio_auth_token;
export const baseUrl = envConfig.config.base_url;
export const twilioOutboundNumber = envConfig.config.twilio_outbound_number;
export const temporaryInsecureAuthKey = envConfig.config.temporary_insecure_auth_key
export const serviceAccountKeyFileName = envConfig.config.service_account_key_file_name;
export const databaseUrl = envConfig.config.database_url;
export const storageBucket = envConfig.config.storage_bucket;

export const informalNotificationUrl = envConfig.config.informal_notification_url;
export const formalNotificationUrl = envConfig.config.formal_notification_url;
export const mm101CallUrl = envConfig.config.mm_101_url;
export const shouldLog = getBoolean(envConfig.config.should_log);
export const shouldDisplayEnglishTestCall = getBoolean(envConfig.config.should_display_english_test_call);
export const testCallUrl = envConfig.config.test_call_url;
export const relayDefaultCountrycode = envConfig.config.relay_default_country_code;
export const urlPrefix = envConfig.config.url_prefix;
export const firebaseToken = envConfig.config.firebase_token;
export const optOutWebookUrl = envConfig.config.opt_out_webhook_url;

