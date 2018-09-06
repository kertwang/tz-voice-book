const admin = require('firebase-admin');
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const firestore = admin.firestore();
//Required for newer versions methinks
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firestore;