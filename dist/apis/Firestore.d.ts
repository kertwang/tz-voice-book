import * as admin from 'firebase-admin';
declare const firestore: FirebaseFirestore.Firestore;
export default firestore;
declare const storage: import("@google-cloud/storage/build/src/bucket").Bucket;
export { storage, admin, };
