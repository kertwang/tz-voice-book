"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('firebase-admin');
/* Not in git. Download from FB console*/
const serviceAccount = require('../../.serviceAccountKey.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://our-water.firebaseio.com"
    });
}
const firestore = admin.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
exports.default = firestore;
//# sourceMappingURL=Firestore.js.map