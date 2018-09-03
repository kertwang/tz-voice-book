import * as functions from 'firebase-functions';
import { TwilioApi } from './apis/TwilioApi';
const admin = require('firebase-admin');
admin.initializeApp();

const twilioApi = new TwilioApi();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });




export const message = require('./handlers/fn_message')(functions, admin);
export const reset_pin = require('./handlers/fn_reset_pin')(functions, admin);
export const twiml = require('./handlers/fn_twiml')(functions, admin, twilioApi.getClient())