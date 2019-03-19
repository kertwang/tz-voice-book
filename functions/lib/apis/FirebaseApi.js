"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../utils");
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var util_1 = require("util");
var FirebaseApi = /** @class */ (function () {
    function FirebaseApi(fs) {
        this.fs = fs;
    }
    FirebaseApi.prototype.getUser = function (userId, botId) {
        return this.fs.collection('bot').doc(botId).collection('users').doc(userId).get()
            .then(function (doc) { return doc.data(); });
    };
    FirebaseApi.prototype.createUserForMobile = function (mobile, botId) {
        var user = {
            mobile: mobile,
            //This is the version that new users will use by default.
            version: utils_1.getDefaultVersionForBot(botId)
        };
        //TODO: should we add the id in here?
        return this.fs.collection('bot').doc(botId).collection('users').add(user);
    };
    /**
     * Get the user from their mobile number.
     * If we don't already have a user for this number, lazy create one
     */
    FirebaseApi.prototype.getUserFromMobile = function (mobile, botId) {
        var _this = this;
        return this.fs.collection('bot').doc(botId).collection('users').where('mobile', '==', mobile).limit(1).get()
            .then(function (sn) {
            var users = [];
            sn.forEach(function (doc) {
                var data = doc.data();
                data.id = doc.id;
                users.push(data);
            });
            return users;
        })
            .then(function (users) {
            if (users.length !== 0) {
                return users[0];
            }
            return _this.createUserForMobile(mobile, botId);
        });
    };
    FirebaseApi.prototype.getRecordings = function (limit, botId) {
        return this.fs.collection('bot').doc(botId).collection('recordings').orderBy('createdAt', 'asc').limit(limit).get()
            .then(function (sn) {
            var messages = [];
            sn.forEach(function (doc) {
                //Get each document, put in the id
                var data = doc.data();
                data.id = doc.id;
                messages.push({
                    type: TwilioTypes_1.MessageType.PLAY,
                    url: data.url
                });
            });
            return messages;
        });
    };
    /**
     * Save a feedback recording
     */
    FirebaseApi.prototype.saveFeedbackRecording = function (recording, botId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fs.collection('bot').doc(botId).collection('feedback').add(recording)
                        .then(function (ref) { return ref.id; })["catch"](function (err) {
                        console.log("Error in savePendingRecording", err);
                        return Promise.reject(err);
                    })];
            });
        });
    };
    /**
     * Save a reading to the pending collection
     *
     * Returns the id of the pending reading
     */
    FirebaseApi.prototype.savePendingRecording = function (recording, botId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fs.collection('bot').doc(botId).collection('pendingRecordings').add(recording)
                        .then(function (ref) { return ref.id; })["catch"](function (err) {
                        console.log("Error in savePendingRecording", err);
                        return Promise.reject(err);
                    })];
            });
        });
    };
    /**
     * Get all pending recordings for a given callSid, newest first
     */
    FirebaseApi.prototype.getPendingRecordings = function (callSid, limit, botId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fs.collection('bot').doc(botId).collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
                        .then(function (sn) {
                        var recordings = [];
                        sn.forEach(function (doc) {
                            //Get each document, put in the id
                            //@ts-ignore 
                            //TODO: fix deser
                            var recording = __assign({}, doc.data());
                            recordings.push(recording);
                        });
                        return recordings;
                    })];
            });
        });
    };
    /**
     * call getPendingRecordings with a number of retries.
     * This is because the callback to save the pending recording sometimes takes
     * too long, and causes the call to die
     */
    FirebaseApi.prototype.getPendingRecordingsWithRetries = function (botId, callSid, limit, retries, timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPendingRecordings(callSid, limit, botId)];
                    case 1:
                        result = _a.sent();
                        if (result.length > 0) {
                            return [2 /*return*/, result];
                        }
                        if (retries === 0) {
                            console.log('Out of retries.');
                            console.warn("No pendingRecording found for botId: " + botId + ", callSid: " + callSid);
                            return [2 /*return*/, result];
                        }
                        return [4 /*yield*/, utils_1.sleep(timeoutMs)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.getPendingRecordingsWithRetries(botId, callSid, limit, retries - 1, timeoutMs * 2)];
                }
            });
        });
    };
    FirebaseApi.prototype.deletePendingRecordingsForCall = function (callSid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //TODO: implement this
                return [2 /*return*/, Promise.resolve(true)];
            });
        });
    };
    /**
     * Publish a recording for everyone else to listen to.
     * Returns the id of the recording
     */
    FirebaseApi.prototype.postRecording = function (recording, botId) {
        return this.fs.collection('bot').doc(botId).collection('recordings').add(recording)
            .then(function (ref) { return ref.id; });
    };
    /**
     * Get the block content for the given call id and user.
     *
     * This will be stored in firebase, parsed, and filled into the context object
     */
    FirebaseApi.prototype.getBotConfig = function (userId, botId) {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersionForUser(userId, botId)];
                    case 1:
                        version = _a.sent();
                        return [2 /*return*/, this.getBotConfigForVersion(userId, botId, version)];
                }
            });
        });
    };
    /**
     * getBotConfigOverride
     *
     * Get the bot config, but override the user's version. This is useful for testing
     * different versions when the user can't configure the version for themselves
     */
    FirebaseApi.prototype.getBotConfigOverride = function (userId, botId, versionOverride) {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersionForUser(userId, botId, versionOverride)];
                    case 1:
                        version = _a.sent();
                        return [2 /*return*/, this.getBotConfigForVersion(userId, botId, version)];
                }
            });
        });
    };
    FirebaseApi.prototype.getBotConfigForVersion = function (userId, botId, version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fs.collection('bot').doc(botId).collection('version').doc(version).get()
                        .then(function (doc) { return doc.data(); })
                        .then(function (rawConfig) {
                        if (!rawConfig) {
                            throw new Error("Couldn't getBotConfig for version: " + version + " and botId: " + botId);
                        }
                        //RW-TODO: inject a dynamic level of bot config here?
                        //we need to deserialize the functions that we saved for dynamic requests
                        var configString = JSON.stringify(rawConfig, null, 2);
                        var config = JSON.parse(configString, utils_1.functionReviver);
                        // const anyMessage: AnyMessageType = config.messages.entrypoint[0];
                        // if (anyMessage.type === MessageType.DYNAMIC_SAY) {
                        //   console.log("message is", anyMessage);
                        //   console.log("saying message,",  anyMessage.func(['HELLO WORLD']));
                        // }
                        // console.log("getBotConfigForVersion, Bot config is", );
                        return config;
                    })["catch"](function (err) {
                        console.warn(err.message);
                        throw new Error("Couldn't getBotConfig for version: " + version + " and botId: " + botId);
                    })];
            });
        });
    };
    //RW-TODO: specify other params here that can be overriden?
    //This makes it backwards compatible with storing vars in the users object, or specifying them dynamically at runtime
    FirebaseApi.prototype.getVersionForUser = function (userId, botId, override) {
        return __awaiter(this, void 0, void 0, function () {
            var user, defaultVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //@ts-ignore
                        if (!util_1.isNullOrUndefined(override) && override !== "undefined") {
                            return [2 /*return*/, override];
                        }
                        return [4 /*yield*/, this.getUser(userId, botId)];
                    case 1:
                        user = _a.sent();
                        if (user.version) {
                            //TODO: should also make sure the version code is correct
                            return [2 /*return*/, user.version];
                        }
                        defaultVersion = TwilioTypes_1.VersionId.tz_audio;
                        console.warn("No version found for userId: " + userId + ", botId: " + botId + ". Defaulting to: " + defaultVersion);
                        //TODO: default to tz_audio version!
                        return [2 /*return*/, Promise.resolve(defaultVersion)];
                }
            });
        });
    };
    //
    // Admin Functions
    // ----------------------------
    FirebaseApi.prototype.deployConfigForBotAndVersion = function (new_botId, versionId, config) {
        return __awaiter(this, void 0, void 0, function () {
            var serialized;
            return __generator(this, function (_a) {
                console.log("Saving config to bot/" + new_botId + "/version/" + versionId + "/");
                serialized = JSON.parse(JSON.stringify(config, utils_1.functionReplacer, 2));
                return [2 /*return*/, this.fs.collection('bot').doc(new_botId).collection('version').doc(versionId).set(serialized)];
            });
        });
    };
    //
    // DialogFlow API
    // ----------------------------
    FirebaseApi.prototype.getDFUser = function (botId, sessionId) {
        return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).get()
            .then(function (doc) { return doc.data(); })
            .then(function (user) {
            if (!user) {
                throw new Error("No user found for sessionId: " + sessionId);
            }
            return { type: AppProviderTypes_1.ResultType.SUCCESS, result: user };
        })["catch"](function (err) {
            return { type: AppProviderTypes_1.ResultType.ERROR, message: err.message };
        });
    };
    FirebaseApi.prototype.saveDFUser = function (botId, sessionId, user) {
        return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).set(user)
            .then(function () { return ({ type: AppProviderTypes_1.ResultType.SUCCESS, result: null }); })["catch"](function (err) { return ({ type: AppProviderTypes_1.ResultType.ERROR, message: err.message }); });
    };
    FirebaseApi.prototype.saveResponse = function (botId, intent, response) {
        return this.fs.collection('df').doc(botId).collection(intent).add({ response: response })
            .then(function () { return ({ type: AppProviderTypes_1.ResultType.SUCCESS, result: null }); })["catch"](function (err) { return ({ type: AppProviderTypes_1.ResultType.ERROR, message: err.message }); });
    };
    FirebaseApi.prototype.getResponses = function (botId, intent) {
        return this.fs.collection('df').doc(botId).collection(intent).get()
            .then(function (sn) {
            console.log();
            var responses = [];
            sn.forEach(function (doc) {
                //Get each document, put in the id
                var response = doc.data().response;
                responses.push(response);
            });
            return {
                type: AppProviderTypes_1.ResultType.SUCCESS,
                result: responses
            };
        })["catch"](function (err) {
            console.log("getResponses error: ", err);
            return {
                type: AppProviderTypes_1.ResultType.ERROR,
                message: err
            };
        });
    };
    //
    // VB Relay API
    //------------------------------
    FirebaseApi.prototype.getRelayUser = function (botId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fs.collection('relay').doc(botId).collection('user').doc(userId).get()
                        .then(function (doc) {
                        var data = doc.data();
                        if (!data) {
                            return AppProviderTypes_1.makeError("No data found for userId: " + userId);
                        }
                        var user = {
                            callCount: data.callCount,
                            countryCode: data.countryCode
                        };
                        return AppProviderTypes_1.makeSuccess(user);
                    })["catch"](function (err) { return AppProviderTypes_1.makeError(err.message); })];
            });
        });
    };
    return FirebaseApi;
}());
exports["default"] = FirebaseApi;
