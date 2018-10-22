import * as functions from 'firebase-functions';

const envConfig = functions.config();

export const twilioAccountSid = envConfig.config.twilio_account_sid;
export const twilioAuthToken = envConfig.config.twilio_auth_token;
export const baseUrl = envConfig.config.base_url;
export const twilioOutboundNumber = envConfig.config.twilio_outbound_number;
export const temporaryInsecureAuthKey = envConfig.config.temporary_insecure_auth_key
