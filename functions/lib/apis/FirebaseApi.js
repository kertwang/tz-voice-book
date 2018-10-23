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
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
class FirebaseApi {
    constructor(fs) {
        this.fs = fs;
    }
    getUser(userId, botId) {
        return this.fs.collection('bot').doc(botId).collection('users').doc(userId).get()
            .then((doc) => doc.data());
    }
    createUserForMobile(mobile, botId) {
        const user = {
            mobile,
            //This is the version that new users will use by default.
            version: utils_1.getDefaultVersionForBot(botId),
        };
        //TODO: should we add the id in here?
        return this.fs.collection('bot').doc(botId).collection('users').add(user);
    }
    /**
     * Get the user from their mobile number.
     * If we don't already have a user for this number, lazy create one
     */
    getUserFromMobile(mobile, botId) {
        return this.fs.collection('bot').doc(botId).collection('users').where('mobile', '==', mobile).limit(1).get()
            .then((sn) => {
            const users = [];
            sn.forEach((doc) => {
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
            return this.createUserForMobile(mobile, botId);
        });
    }
    getRecordings(limit, botId) {
        return this.fs.collection('bot').doc(botId).collection('recordings').orderBy('createdAt', 'asc').limit(limit).get()
            .then(sn => {
            const messages = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const data = doc.data();
                data.id = doc.id;
                messages.push({
                    type: TwilioTypes_1.MessageType.PLAY,
                    url: data.url,
                });
            });
            return messages;
        });
    }
    /**
     * Save a feedback recording
     */
    saveFeedbackRecording(recording, botId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('bot').doc(botId).collection('feedback').add(recording)
                .then(ref => ref.id)
                .catch(err => {
                console.log("Error in savePendingRecording", err);
                return Promise.reject(err);
            });
        });
    }
    /**
     * Save a reading to the pending collection
     *
     * Returns the id of the pending reading
     */
    savePendingRecording(recording, botId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('bot').doc(botId).collection('pendingRecordings').add(recording)
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
    getPendingRecordings(callSid, limit, botId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('bot').doc(botId).collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
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
    getPendingRecordingsWithRetries(botId, callSid, limit, retries, timeoutMs = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getPendingRecordings(callSid, limit, botId);
            if (result.length > 0) {
                return result;
            }
            if (retries === 0) {
                console.log('Out of retries. Returning a bad result.');
                return result;
            }
            yield utils_1.sleep(timeoutMs);
            return this.getPendingRecordingsWithRetries(botId, callSid, limit, retries - 1, timeoutMs * 2);
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
    postRecording(recording, botId) {
        return this.fs.collection('bot').doc(botId).collection('recordings').add(recording)
            .then(ref => ref.id);
    }
    /**
     * Get the block content for the given call id and user.
     *
     * This will be stored in firebase, parsed, and filled into the context object
     */
    getBotConfig(userId, botId) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield this.getVerionForUser(userId, botId);
            return this.getBotConfigForVersion(userId, botId, version);
        });
    }
    /**
     * getBotConfigOverride
     *
     * Get the bot config, but override the user's version. This is useful for testing
     * different versions when the user can't configure the version fot themselves
     */
    getBotConfigOverride(userId, botId, versionOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield this.getVerionForUser(userId, botId, versionOverride);
            return this.getBotConfigForVersion(userId, botId, version);
        });
    }
    getBotConfigForVersion(userId, botId, version) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('bot').doc(botId).collection('version').doc(version).get()
                .then(doc => doc.data())
                .then((config) => {
                if (!config) {
                    throw new Error(`Couldn't getBotConfig for version and botId: ${version}, ${botId}`);
                }
                return config;
            });
        });
    }
    getVerionForUser(userId, botId, override) {
        return __awaiter(this, void 0, void 0, function* () {
            if (override) {
                return override;
            }
            const user = yield this.getUser(userId, botId);
            if (user.version) {
                //TODO: should also make sure the version code is correct
                return user.version;
            }
            //TODO: default to tz_audio version!
            return Promise.resolve(TwilioTypes_1.VersionId.en_us);
        });
    }
    //
    // Admin Functions
    // ----------------------------
    deployConfigForBotAndVersion(new_botId, versionId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Saving config to bot/${new_botId}/version/${versionId}/`);
            return this.fs.collection('bot').doc(new_botId).collection('version').doc(versionId).set(config);
        });
    }
}
exports.default = FirebaseApi;
//# sourceMappingURL=FirebaseApi.js.map