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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
exports.__esModule = true;
var gulp_1 = __importDefault(require("gulp"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var Env = __importStar(require("../utils/Env"));
/* import your bot configs here */
var index_1 = __importDefault(require("./content/voicebook/index"));
var index_2 = __importDefault(require("./content/senegalNotification/index"));
var index_3 = __importDefault(require("./content/senegalMobileMoney/index"));
var index_4 = __importDefault(require("./content/rungweIntro/index"));
var index_5 = __importDefault(require("./content/rungweDeposit/index"));
var index_6 = __importDefault(require("./content/rungwePaymentDate/index"));
var index_7 = __importDefault(require("./content/rungwePaymentNotification/index"));
var VBAdminClient_1 = __importDefault(require("./VBAdminClient"));
gulp_1["default"].task('deploy_config', function () { return __awaiter(_this, void 0, void 0, function () {
    var botConfig;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("deploying conversation config for /twiml");
                botConfig = [
                    /* Voicebook Bots */
                    index_1["default"].en_us,
                    index_1["default"].en_au,
                    index_1["default"].tz_audio,
                    // /* Senegal Notifiction Bot */
                    index_2["default"].en_text,
                    index_2["default"].fr_audio,
                    index_2["default"].wl_audio,
                    // /* Senegal Mobile Money 101 Bot */
                    index_3["default"].en_text,
                    index_3["default"].fr_audio,
                    index_3["default"].wl_audio,
                    // /* Rungwe Intro Bot */
                    index_4["default"].en_text,
                    index_4["default"].tz_audio,
                    // /* Rungwe Deposit Bot */
                    index_5["default"].en_text,
                    index_5["default"].en_audio,
                    index_5["default"].tz_audio,
                    // /* Rungwe PaymentDate Bot */
                    index_6["default"].en_text,
                    /* Rungwe PaymentNotification Bot */
                    index_7["default"].en_text,
                    index_7["default"].tz_audio,
                ];
                return [4 /*yield*/, botConfig.reduce(function (acc, curr) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, curr];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, VBAdminClient_1["default"].createContent(curr)];
                            }
                        });
                    }); }, Promise.resolve(AppProviderTypes_1.makeSuccess(undefined)))];
            case 1:
                _a.sent();
                console.log("Deployed config for " + botConfig.length + " bots.");
                return [2 /*return*/];
        }
    });
}); });
// gulp.task('deploy_audio', async () => {
//   const audioDir = `../../../audio_processing/audio_new/`;
//   //Iterate through each /version/filename in ./content/audio, and upload
//   const versionDirs = await fs.readdir(audioDir);
//   const audioFiles: string[][] = await Promise.all(versionDirs.map(dir => {
//     return fs.readdir(`${audioDir}${dir}/`)
//       .then(childs => childs.map(child => `${dir}/${child}`))
//   }));
//   const flatAudioFiles: string[] = [];
//   audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
//   //TODO: make this process nicer
//   await Promise.all(flatAudioFiles.map(file => {
//     return storage.upload(`${audioDir}${file}`, {
//       destination: file,
//       public: true,
//       metadata: {
//         metadata: {
//           firebaseStorageDownloadTokens: '1536715274666696'
//         }
//       }
//     })
//     //Get the public url:
//     .then(([thing1, thing2]) => {
//       console.log(`   Uploaded: ${file}`);
//     })
//     .catch(err => {
//       console.log("Error uploading file:", err);
//     })
//   }));
// });
/**
 * A simple test of the call trigger
 * Assumes that the bot config already exists
 */
gulp_1["default"].task('admin-trigger-test-call', function () { return __awaiter(_this, void 0, void 0, function () {
    var request, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                request = {
                    mobile: Env.testMobile,
                    url: Env.baseUrl + "/twiml/senegalMobileMoney/entrypoint?versionOverride=wl_audio",
                    botId: "senegalNotification"
                };
                _a = AppProviderTypes_1.unsafeUnwrap;
                return [4 /*yield*/, VBAdminClient_1["default"].triggerCall(request)];
            case 1:
                _a.apply(void 0, [_b.sent()]);
                return [2 /*return*/];
        }
    });
}); });
/**
 * A simple test to make sure the server is alive
 * and config is valid
 */
gulp_1["default"].task('admin-health-check', function () { return __awaiter(_this, void 0, void 0, function () {
    var response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = AppProviderTypes_1.unsafeUnwrap;
                return [4 /*yield*/, VBAdminClient_1["default"].getHealth()];
            case 1:
                response = _a.apply(void 0, [_b.sent()]);
                console.log(response);
                return [2 /*return*/];
        }
    });
}); });
/**
 * Get the config for a bot id
 */
gulp_1["default"].task('admin-get-config', function () { return __awaiter(_this, void 0, void 0, function () {
    var response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = AppProviderTypes_1.unsafeUnwrap;
                return [4 /*yield*/, VBAdminClient_1["default"].getBotConfig('voicebook', 'en-US')];
            case 1:
                response = _a.apply(void 0, [_b.sent()]);
                console.log(response);
                return [2 /*return*/];
        }
    });
}); });
