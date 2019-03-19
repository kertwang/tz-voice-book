import * as admin from 'firebase-admin';
import { serviceAccountKeyFileName, databaseUrl, storageBucket } from "../utils/Env";

/* Not in git. Download from FB console*/
// const serviceAccount = require('../../.serviceAccountKey.json');
const serviceAccount = require(`../../${serviceAccountKeyFileName}`);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseUrl,
    storageBucket,
  });
}

const firestore = admin.firestore();
const settings = {};
firestore.settings(settings);

export default firestore;
const storage = admin.storage().bucket();

export {
  storage,
  admin,
}