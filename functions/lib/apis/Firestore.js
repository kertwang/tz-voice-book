"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = require("../utils/Env");
const admin = require('firebase-admin');
/* Not in git. Download from FB console*/
// const serviceAccount = require('../../.serviceAccountKey.json');
const serviceAccount = require(`../../${Env_1.serviceAccountKeyFileName}`);
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: Env_1.databaseUrl,
        storageBucket: Env_1.storageBucket,
    });
}
const firestore = admin.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
exports.default = firestore;
const storage = admin.storage().bucket();
exports.storage = storage;
//# sourceMappingURL=Firestore.js.map