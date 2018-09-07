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
const utils_1 = require("../utils");
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
     * Save a reading to the pending collection
     *
     * Returns the id of the pending reading
     */
    savePendingRecording(recording) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('pendingRecordings').add(recording)
                .then(ref => ref.id)
                .catch(err => {
                console.log("Error in savePendingRecording", err);
                return Promise.reject(err);
            });
        });
    }
    /**
     * Get all pending recordings for a given callSid, newest first
     */
    getPendingRecordings(callSid, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
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
     * call getPendingRecordings with a number of retries.
     * This is because the callback to save the pending recording sometimes takes
     * too long, and causes the call to die
     */
    getPendingRecordingsWithRetries(callSid, limit, retries, timeoutMs = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getPendingRecordings(callSid, limit);
            // console.log("retries, ", retries, "sleeping for:", timeoutMs);
            if (result.length > 0) {
                return result;
            }
            if (retries === 0) {
                console.log('Out of retries. Returning a bad result.');
                return result;
            }
            yield utils_1.sleep(timeoutMs);
            return this.getPendingRecordingsWithRetries(callSid, limit, retries - 1, timeoutMs * 2);
        });
    }
    deletePendingRecordingsForCall(callSid) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: implement this
            return Promise.resolve(true);
        });
    }
    /**
     * Publish a recording for everyone else to listen to.
     * Returns the id of the recording
     */
    postRecording(recording) {
        return this.fs.collection('recordings').add(recording)
            .then(ref => ref.id);
    }
    /**
     * Get the block content for the given call id and user.
     *
     * This will be stored in firebase, parsed, and filled into the context object
     */
    getBlockContent(callSid, userId) {
        //TODO: implement configurable stuff.
        const condition = this.getConditionForCallAndUserId(callSid, userId);
        return this.fs.collection('content').doc(condition).get()
            .then(doc => doc.data());
    }
    getConditionForCallAndUserId(callSid, userId) {
        //TODO: implement based on a bunch of settings.
        return 'default';
    }
}
exports.default = FirebaseApi;
//# sourceMappingURL=FirebaseApi.js.map