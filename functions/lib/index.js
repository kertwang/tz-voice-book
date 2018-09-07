"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const TwilioApi_1 = require("./apis/TwilioApi");
const admin = require('firebase-admin');
admin.initializeApp();
const twilioApi = new TwilioApi_1.TwilioApi();
exports.message = require('./handlers/fn_message')(functions, admin);
exports.reset_pin = require('./handlers/fn_reset_pin')(functions, admin);
exports.twiml = require('./handlers/fn_twiml')(functions);
exports.benchmark = require('./handlers/benchmark')(functions);
//# sourceMappingURL=index.js.map