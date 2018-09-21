import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

/* functions */
export const message = require('./handlers/fn_message')(functions, admin);
export const reset_pin = require('./handlers/fn_reset_pin')(functions, admin);
export const twiml = require('./handlers/fn_twiml')(functions);
export const benchmark = require('./handlers/fn_benchmark')(functions);


/* Callbacks */
require('./handlers/cb_firebase');

