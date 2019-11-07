"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var admin = __importStar(require("firebase-admin"));
exports.admin = admin;
var Env_1 = require("../utils/Env");
/* Not in git. Download from FB console*/
// const serviceAccount = require('../../.serviceAccountKey.json');
var serviceAccount = require("../../" + Env_1.serviceAccountKeyFileName);
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: Env_1.databaseUrl,
        storageBucket: Env_1.storageBucket
    });
}
var firestore = admin.firestore();
var settings = {};
firestore.settings(settings);
exports["default"] = firestore;
var storage = admin.storage().bucket();
exports.storage = storage;
