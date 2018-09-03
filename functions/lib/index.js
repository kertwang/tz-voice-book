"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const TwilioApi_1 = require("./apis/TwilioApi");
const admin = require('firebase-admin');
admin.initializeApp();
const twilioApi = new TwilioApi_1.TwilioApi();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.message = require('./handlers/fn_message')(functions, admin);
exports.reset_pin = require('./handlers/fn_reset_pin')(functions, admin);
exports.twiml = require('./handlers/fn_twiml')(functions, admin, twilioApi.getClient());
//# sourceMappingURL=index.js.map