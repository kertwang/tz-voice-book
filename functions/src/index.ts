import * as functions from 'firebase-functions';
import { TwilioApi } from './apis/TwilioApi';
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();

export const admin = require('./handlers/fn_admin')(functions, fbAdmin);
export const message = require('./handlers/fn_message')(functions, fbAdmin);
export const reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
export const twiml = require('./handlers/fn_twiml')(functions);
export const benchmark = require('./handlers/fn_benchmark')(functions);