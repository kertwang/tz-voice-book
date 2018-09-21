import * as functions from 'firebase-functions';

const envConfig = functions.config();

export const twilioAccountSid = envConfig.config.twilio_account_sid;
export const twilioAuthToken = envConfig.config.twilio_auth_token;
export const baseUrl = envConfig.config.base_url;
export const serviceAccountName = envConfig.config.service_account_name;
export const adminSheetId = envConfig.config.admin_sheet_id;
