import * as functions from 'firebase-functions';
import { TwilioApi } from './apis/TwilioApi';
const admin = require('firebase-admin');
admin.initializeApp();

const twilioApi = new TwilioApi();

export const message = require('./handlers/fn_message')(functions, admin);
export const reset_pin = require('./handlers/fn_reset_pin')(functions, admin);
export const twiml = require('./handlers/fn_twiml')(functions);
export const benchmark = require('./handlers/benchmark')(functions);