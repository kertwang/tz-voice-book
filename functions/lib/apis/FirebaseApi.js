"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FirebaseApi {
    constructor(fs) {
        this.fs = fs;
    }
    getUser(userId) {
        return this.fs.collection('users').doc(userId).get();
    }
    createUserForMobile(mobile) {
        const user = {
            mobile,
        };
        //TODO: should we add the id in here?
        return this.fs.collection('users').add(user);
    }
    /**
     * Get the user from their mobile number.
     * If we don't already have a user for this number, lazy create one
     */
    getUserFromMobile(mobile) {
        return this.fs.collection('users').where('mobile', '==', mobile).limit(1).get()
            .then(sn => {
            const users = [];
            sn.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                users.push(data);
            });
            return users;
        })
            .then((users) => {
            if (users.length !== 0) {
                return users[0];
            }
            return this.createUserForMobile(mobile);
        });
    }
    getMessages(limit) {
        return this.fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
            .then(sn => {
            const messages = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const data = doc.data();
                data.id = doc.id;
                messages.push(data);
            });
            return messages;
        });
    }
    /**
     * get all of the pending recordings for the user
     * Deprecated: This won't work as we expect
     */
    dep_getPendingRecordingsForUser(userId, limit) {
        return this.fs.collection('users').doc(userId)
            .collection('pendingReadings').orderBy('createdAt', 'desc')
            .limit(limit)
            .get()
            .then((sn) => {
            const recordings = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const data = doc.data();
                data.id = doc.id;
                recordings.push(data);
            });
            return recordings;
        });
    }
    /**
     * Save a reading to the pending collection
     *
     * Returns the id of the pending reading
     */
    savePendingRecording(recording) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('pendingReadings').add(recording)
                .then(ref => ref.id);
        });
    }
    /**
     * Get all pending recordings for a given callSid, newest first
     */
    getPendingRecordings(callSid, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('pendingReadings').where('callSid', '==', callSid).limit(limit).get()
                .then((sn) => {
                const recordings = [];
                sn.forEach(doc => {
                    //Get each document, put in the id
                    const data = doc.data();
                    data.id = doc.id;
                    recordings.push(data);
                });
                return recordings;
            });
        });
    }
    /**
     * Save a recording to the user's pending reading collection
     * returns an id to refer to the reading later on
     *
     * Deprecated: This won't work as we expect. Pending readings don't have a mobile number attached
     */
    dep_savePendingRecording(userId, recording) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('users').doc(userId).collection('pendingReadings').add(recording)
                .then(ref => ref.id);
        });
    }
    /**
     * Get a reading from a user's pendingRecording collection
     */
    dep_getPendingRecording(userId, pendingId) {
        //No need to deserialize just yet, no methods on the Recording type...
        return this.fs.collection('users').doc(userId).collection('pendingReadings').doc(pendingId).get();
    }
    /**
     * Publish a recording for everyone else to listen to.
     * Returns the id of the recording
     */
    postRecording(recording) {
        return this.fs.collection('recordings').add(recording)
            .then(ref => ref.id);
    }
}
exports.default = FirebaseApi;
//# sourceMappingURL=FirebaseApi.js.map