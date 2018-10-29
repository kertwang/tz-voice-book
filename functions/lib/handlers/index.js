"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();
const functionName = process.env.FUNCTION_NAME;
console.log("handlers init for function", functionName);
if (functionName === 'admin') {
    exports.admin = require('./handlers/fn_admin')(functions, fbAdmin);
}
if (functionName === 'message') {
    exports.message = require('./handlers/fn_message')(functions, fbAdmin);
}
if (functionName === 'reset_pin') {
    exports.reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
}
if (functionName === 'twiml') {
    exports.twiml = require('./handlers/fn_twiml')(functions);
}
if (functionName === 'dialogflow') {
    exports.dialogflow = require('./handlers/fn_dialogflow');
}
//# sourceMappingURL=index.js.map