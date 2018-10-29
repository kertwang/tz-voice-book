import * as functions from 'firebase-functions';
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();

// TODO:
// Implement something like this:
// https://github.com/firebase/functions-samples/issues/170#issuecomment-323375462

const functionName = process.env.FUNCTION_NAME;
console.log("init for function", functionName);

export const admin = require('./handlers/fn_admin')(functions, fbAdmin);
export const message = require('./handlers/fn_message')(functions, fbAdmin);
export const reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
export const twiml = require('./handlers/fn_twiml')(functions);
export const dialogflow = require('./handlers/fn_dialogflow');
