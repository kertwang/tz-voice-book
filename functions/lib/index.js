"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const fbAdmin = require('firebase-admin');
fbAdmin.initializeApp();
exports.admin = require('./handlers/fn_admin')(functions, fbAdmin);
exports.message = require('./handlers/fn_message')(functions, fbAdmin);
exports.reset_pin = require('./handlers/fn_reset_pin')(functions, fbAdmin);
exports.twiml = require('./handlers/fn_twiml')(functions);
//# sourceMappingURL=index.js.map