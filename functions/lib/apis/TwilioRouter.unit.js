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
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var TwilioRouter_1 = __importDefault(require("./TwilioRouter"));
var mocha_1 = require("mocha");
var FirebaseApi_1 = __importDefault(require("./FirebaseApi"));
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
//@ts-ignore
var xml_formatter_1 = __importDefault(require("xml-formatter"));
var Firestore_1 = __importDefault(require("./Firestore"));
var index_1 = __importDefault(require("../admin/content/voicebook/index"));
var botConfig = index_1["default"].en_us;
var cleanXML = function (xml) {
    return xml.replace(/<Play>(.*?)<\/Play>/g, "<Play></Play>");
};
var ctx = {
    callSid: '12345',
    mobile: '+61410233233',
    toMobile: '+61410233233',
    firebaseApi: new FirebaseApi_1["default"](Firestore_1["default"]),
    userId: 'user_12345',
    versionOverride: null,
    dynamicParams: [],
    page: 1,
    pageSize: 1,
    maxMessages: 3,
    enableDemoMessages: false
};
mocha_1.describe('TwilioRouter', function () {
    var _this = this;
    mocha_1.describe('/entrypoint', function () {
        it('gets the default next message', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TwilioRouter_1["default"].nextMessage(ctx, botConfig, TwilioTypes_1.BlockId.entrypoint)];
                    case 1:
                        result = _a.sent();
                        expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say language="en-US">Hello, and welcome to voicebook</Say><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/intro_0</Redirect></Response>';
                        assert_1["default"].strictEqual(result, expected);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe.skip('/intro_0', function () {
        it('gets the default next message', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TwilioRouter_1["default"].nextMessage(ctx, botConfig, TwilioTypes_1.BlockId.intro_0)];
                    case 1:
                        result = _a.sent();
                        expected = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Gather action=\"./gather/intro_0\" method=\"POST\" language=\"sw-TZ\" input=\"speech\" hints=\"sikiliza,tuma,msaada,kurudia\"><Say>To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.</Say></Gather><Say>We didn't receive any input. Hrrmm.</Say></Response>";
                        // console.log("result", format(result));
                        // console.log("expected", format(expected));
                        assert_1["default"].strictEqual(xml_formatter_1["default"](result), xml_formatter_1["default"](expected));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe('Handles User Input', function () {
        var _this = this;
        this.timeout(5000);
        it('handles error case', function () { return __awaiter(_this, void 0, void 0, function () {
            var gatherResult, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gatherResult = {
                            digits: '10'
                        };
                        return [4 /*yield*/, TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.intro_0, gatherResult)];
                    case 1:
                        result = _a.sent();
                        expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_0</Redirect></Response>';
                        assert_1["default"].strictEqual(expected, result);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles a success case', function () { return __awaiter(_this, void 0, void 0, function () {
            var gatherResult, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gatherResult = {
                            digits: '1'
                        };
                        return [4 /*yield*/, TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.intro_0, gatherResult)];
                    case 1:
                        result = _a.sent();
                        expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_0</Redirect></Response>';
                        assert_1["default"].strictEqual(expected, result);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gets the listen_playback block', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = cleanXML("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Gather action=\"https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/gather/listen_playback?page=1&amp;pageSize=1&amp;maxMessages=3\" method=\"POST\" input=\"dtmf\" numDigits=\"1\"><Play>123123asdafas</Play></Gather><Redirect method=\"POST\">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_end?page=2&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>");
                        return [4 /*yield*/, TwilioRouter_1["default"].nextMessage(ctx, botConfig, TwilioTypes_1.BlockId.listen_playback)];
                    case 1:
                        result = _a.sent();
                        //Assert
                        assert_1["default"].strictEqual(xml_formatter_1["default"](cleanXML(result)), xml_formatter_1["default"](expected));
                        return [2 /*return*/];
                }
            });
        }); });
        it('skips a message correctly', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect method=\"POST\">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_playback?page=2&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>";
                        return [4 /*yield*/, TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.listen_playback, { digits: "1" })];
                    case 1:
                        result = _a.sent();
                        //Assert
                        assert_1["default"].strictEqual(xml_formatter_1["default"](result), xml_formatter_1["default"](expected));
                        return [2 /*return*/];
                }
            });
        }); });
        it('repeats a message correctly', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect method=\"POST\">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_playback?page=1&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>";
                        return [4 /*yield*/, TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.listen_playback, { digits: "2" })];
                    case 1:
                        result = _a.sent();
                        //Assert
                        assert_1["default"].strictEqual(xml_formatter_1["default"](result), xml_formatter_1["default"](expected));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
