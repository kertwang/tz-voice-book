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
var _this = this;
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var VBAdminClient_1 = __importDefault(require("../admin/VBAdminClient"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
/*
  Api tests test the end to end running of the api
  They assume that the api is already up and running somewhere
*/
describe('TwimlApi', function () {
    describe('POST /:botId/*', function () {
        it('gets the twiml response', function () { return __awaiter(_this, void 0, void 0, function () {
            var postBotRequest, expected, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postBotRequest = {
                            botId: 'senegalMobileMoney',
                            blockId: 'entrypoint',
                            body: {
                                From: '+1655111222',
                                To: '+1655111222',
                                Direction: 'outbound'
                            },
                            versionOverride: 'wl_audio'
                        };
                        expected = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Play>https://www.googleapis.com/download/storage/v1/b/tz-phone-book-dev.appspot.com/o/wl_audio%2FW1.mp3?alt=media&amp;token=1536715274666696</Play><Redirect method=\"POST\">http://localhost:3000/twiml/senegalMobileMoney/entrypoint_option?versionOverride=wl_audio</Redirect></Response>";
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, VBAdminClient_1["default"].postTwiml(postBotRequest)];
                    case 1:
                        response = _a.apply(void 0, [_b.sent()]);
                        // Assert
                        assert_1["default"].deepStrictEqual(response, expected);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
