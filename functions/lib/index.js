"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();
// TODO:
// Implement something like this:
// https://github.com/firebase/functions-samples/issues/170#issuecomment-323375462
const functionName = process.env.FUNCTION_NAME;
console.log("init for function", functionName);
exports.admin = require('./handlers/fn_admin')(functions, fbAdmin);
exports.message = require('./handlers/fn_message')(functions, fbAdmin);
exports.reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
exports.twiml = require('./handlers/fn_twiml')(functions);
exports.dialogflow = require('./handlers/fn_dialogflow');
//# sourceMappingURL=index.js.map