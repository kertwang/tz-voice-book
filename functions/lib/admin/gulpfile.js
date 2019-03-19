"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var gulp = __importStar(require("gulp"));
var Firestore_1 = __importStar(require("../apis/Firestore"));
var fs = __importStar(require("async-file"));
var FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
/* import your bot configs here */
var index_1 = __importDefault(require("./content/voicebook/index"));
var index_2 = __importDefault(require("./content/senegalNotification/index"));
var index_3 = __importDefault(require("./content/senegalMobileMoney/index"));
var index_4 = __importDefault(require("./content/rungweIntro/index"));
var index_5 = __importDefault(require("./content/rungweDeposit/index"));
var index_6 = __importDefault(require("./content/rungwePaymentDate/index"));
var index_7 = __importDefault(require("./content/rungwePaymentNotification/index"));
var fbApi = new FirebaseApi_1["default"](Firestore_1["default"]);
gulp.task('deploy_config', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("deploying conversation config for /twiml");
                //TODO: how can we make this auto discover files?
                /* Voicebook Bots */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, index_1["default"].en_us)];
            case 1:
                //TODO: how can we make this auto discover files?
                /* Voicebook Bots */
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_au, index_1["default"].en_au)];
            case 2:
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.tz_audio, index_1["default"].tz_audio)];
            case 3:
                _a.sent();
                /* Senegal Notifiction Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.en_text, index_2["default"].en_text)];
            case 4:
                /* Senegal Notifiction Bot */
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.fr_audio, index_2["default"].fr_audio)];
            case 5:
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.wl_audio, index_2["default"].wl_audio)];
            case 6:
                _a.sent();
                /* Senegal Mobile Money 101 Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.en_text, index_3["default"].en_text)];
            case 7:
                /* Senegal Mobile Money 101 Bot */
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.fr_audio, index_3["default"].fr_audio)];
            case 8:
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.wl_audio, index_3["default"].wl_audio)];
            case 9:
                _a.sent();
                /* Rungwe Intro Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweIntro, TwilioTypes_1.VersionId.en_text, index_4["default"].en_text)];
            case 10:
                /* Rungwe Intro Bot */
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweIntro, TwilioTypes_1.VersionId.tz_audio, index_4["default"].tz_audio)];
            case 11:
                _a.sent();
                /* Rungwe Deposit Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.en_text, index_5["default"].en_text)];
            case 12:
                /* Rungwe Deposit Bot */
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.en_audio, index_5["default"].en_audio)];
            case 13:
                _a.sent();
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.tz_audio, index_5["default"].tz_audio)];
            case 14:
                _a.sent();
                /* Rungwe PaymentDate Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungwePaymentDate, TwilioTypes_1.VersionId.en_text, index_6["default"].en_text)];
            case 15:
                /* Rungwe PaymentDate Bot */
                _a.sent();
                /* Rungwe PaymentNotification Bot */
                return [4 /*yield*/, fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungwePaymentNotification, TwilioTypes_1.VersionId.en_text, index_7["default"].en_text)];
            case 16:
                /* Rungwe PaymentNotification Bot */
                _a.sent();
                console.log("deployed config.");
                return [2 /*return*/];
        }
    });
}); });
gulp.task('deploy_audio', function () { return __awaiter(_this, void 0, void 0, function () {
    var audioDir, versionDirs, audioFiles, flatAudioFiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                audioDir = "../../../audio_processing/audio_new/";
                return [4 /*yield*/, fs.readdir(audioDir)];
            case 1:
                versionDirs = _a.sent();
                return [4 /*yield*/, Promise.all(versionDirs.map(function (dir) {
                        return fs.readdir("" + audioDir + dir + "/")
                            .then(function (childs) { return childs.map(function (child) { return dir + "/" + child; }); });
                    }))];
            case 2:
                audioFiles = _a.sent();
                flatAudioFiles = [];
                audioFiles.forEach(function (fileList) { return fileList.forEach(function (file) { return flatAudioFiles.push(file); }); });
                //TODO: make this process nicer
                return [4 /*yield*/, Promise.all(flatAudioFiles.map(function (file) {
                        return Firestore_1.storage.upload("" + audioDir + file, {
                            destination: file,
                            public: true,
                            metadata: {
                                metadata: {
                                    firebaseStorageDownloadTokens: '1536715274666696'
                                }
                            }
                        })
                            //Get the public url:
                            .then(function (_a) {
                            var thing1 = _a[0], thing2 = _a[1];
                            console.log("   Uploaded: " + file);
                        })["catch"](function (err) {
                            console.log("Error uploading file:", err);
                        });
                    }))];
            case 3:
                //TODO: make this process nicer
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
