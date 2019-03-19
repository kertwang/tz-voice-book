"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1["default"];
var Env_1 = require("../utils/Env");
/* Not in git. Download from FB console*/
// const serviceAccount = require('../../.serviceAccountKey.json');
var serviceAccount = require("../../" + Env_1.serviceAccountKeyFileName);
if (firebase_admin_1["default"].apps.length === 0) {
    firebase_admin_1["default"].initializeApp({
        credential: firebase_admin_1["default"].credential.cert(serviceAccount),
        databaseURL: Env_1.databaseUrl,
        storageBucket: Env_1.storageBucket
    });
}
var firestore = firebase_admin_1["default"].firestore();
var settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
exports["default"] = firestore;
var storage = firebase_admin_1["default"].storage().bucket();
exports.storage = storage;
