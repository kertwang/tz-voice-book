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
const AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
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
            const version = yield this.getVersionForUser(userId, botId);
            return this.getBotConfigForVersion(userId, botId, version);
        });
    }
    /**
     * getBotConfigOverride
     *
     * Get the bot config, but override the user's version. This is useful for testing
     * different versions when the user can't configure the version for themselves
     */
    getBotConfigOverride(userId, botId, versionOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield this.getVersionForUser(userId, botId, versionOverride);
            return this.getBotConfigForVersion(userId, botId, version);
        });
    }
    getBotConfigForVersion(userId, botId, version) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fs.collection('bot').doc(botId).collection('version').doc(version).get()
                .then(doc => doc.data())
                .then((rawConfig) => {
                if (!rawConfig) {
                    throw new Error(`Couldn't getBotConfig for version and botId: ${version}, ${botId}`);
                }
                //RW-TODO: inject a dynamic level of bot config here?
                //we need to deserialize the functions that we saved for dynamic requests
                const configString = JSON.stringify(rawConfig, null, 2);
                const config = JSON.parse(configString, utils_1.functionReviver);
                const anyMessage = config.messages.entrypoint[1];
                if (anyMessage.type === TwilioTypes_1.MessageType.DYNAMIC_SAY) {
                    console.log("message is", anyMessage);
                    console.log("saying message,", anyMessage.func(['HELLO WORLD']));
                }
                console.log("getBotConfigForVersion, Bot config is");
                return config;
            });
        });
    }
    //RW-TODO: specify other params here that can be overriden?
    //This makes it backwards compatible with storing vars in the users object, or specifying them dynamically at runtime
    getVersionForUser(userId, botId, override) {
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
            //Serialize the functions in BotConfig so they can be saved in firebase
            const serialized = JSON.parse(JSON.stringify(config, utils_1.functionReplacer, 2));
            return this.fs.collection('bot').doc(new_botId).collection('version').doc(versionId).set(serialized);
        });
    }
    //
    // DialogFlow API
    // ----------------------------
    getDFUser(botId, sessionId) {
        return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).get()
            .then((doc) => doc.data())
            .then((user) => {
            if (!user) {
                throw new Error(`No user found for sessionId: ${sessionId}`);
            }
            return { type: AppProviderTypes_1.ResultType.SUCCESS, result: user };
        })
            .catch(err => {
            return { type: AppProviderTypes_1.ResultType.ERROR, message: err.message };
        });
    }
    saveDFUser(botId, sessionId, user) {
        return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).set(user)
            .then(() => ({ type: AppProviderTypes_1.ResultType.SUCCESS, result: null }))
            .catch(err => ({ type: AppProviderTypes_1.ResultType.ERROR, message: err.message }));
    }
    saveResponse(botId, intent, response) {
        return this.fs.collection('df').doc(botId).collection(intent).add({ response })
            .then(() => ({ type: AppProviderTypes_1.ResultType.SUCCESS, result: null }))
            .catch(err => ({ type: AppProviderTypes_1.ResultType.ERROR, message: err.message }));
    }
    getResponses(botId, intent) {
        return this.fs.collection('df').doc(botId).collection(intent).get()
            .then((sn) => {
            console.log();
            const responses = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const response = doc.data().response;
                responses.push(response);
            });
            return {
                type: AppProviderTypes_1.ResultType.SUCCESS,
                result: responses,
            };
        })
            .catch(err => {
            console.log("getResponses error: ", err);
            return {
                type: AppProviderTypes_1.ResultType.ERROR,
                message: err,
            };
        });
    }
}
exports.default = FirebaseApi;
//# sourceMappingURL=FirebaseApi.js.map