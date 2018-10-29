const functions = require("firebase-functions");
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();


/**
 * This file works better in JS, 
 * When it is in TS, it gets compiled to JS and this breaks
 * the imports for firebase functions
 * 
 */

// TODO:
// Implement something like this:
// https://github.com/firebase/functions-samples/issues/170#issuecomment-323375462

const functionName = process.env.FUNCTION_NAME;
console.log("init for function", functionName);

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'admin') {
  exports.admin = require('./handlers/fn_admin')(functions, fbAdmin);
}
  
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'message') {
  exports.message = require('./handlers/fn_message')(functions, fbAdmin);
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'reset_pin') {
  exports.reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'twiml') {
  exports.twiml = require('./handlers/fn_twiml')(functions);
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'dialogflow-dialogflowFirebaseFulfillment') {
  exports.dialogflow = require('./handlers/fn_dialogflow');
}

