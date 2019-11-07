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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var utils_1 = require("../utils");
var BotConfigModel_1 = __importDefault(require("../models/BotConfigModel"));
var Log_1 = require("../utils/Log");
var LogTypes_1 = require("../types_rn/LogTypes");
var TwilioRouter_1 = __importDefault(require("../apis/TwilioRouter"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var User_1 = __importDefault(require("../models/User"));
var TwilioApi_1 = require("../apis/TwilioApi");
// const firebaseApi = new GenericApi();
var twilioApi = new TwilioApi_1.TwilioApi();
var TwimlHandler = /** @class */ (function () {
    function TwimlHandler() {
    }
    TwimlHandler.postRecognitionResults = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not Implemented');
            });
        });
    };
    TwimlHandler.getResponses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not Implemented');
            });
        });
    };
    TwimlHandler.postFeedback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not Implemented');
            });
        });
    };
    TwimlHandler.postTriggerCall = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var callSid, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, twilioApi.startCall(req.body.botId, req.body.mobile, req.body.url)];
                    case 1:
                        callSid = _a.apply(void 0, [_b.sent()]);
                        res.json(callSid);
                        return [2 /*return*/];
                }
            });
        });
    };
    TwimlHandler.postRecordingCallback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not Implemented');
            });
        });
    };
    TwimlHandler.postGather = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var botId, blockName, mobile, user, _a, pageParams, dynamicParams, version, botConfig, _b, ctx, gatherResult, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        botId = utils_1.getBotId(req.params.botId);
                        blockName = utils_1.pathToBlock(req.path);
                        mobile = utils_1.getUserMobile(req.body);
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, User_1["default"].getOrCreateUserForMobile(mobile, botId)];
                    case 1:
                        user = _a.apply(void 0, [_c.sent()]);
                        pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
                        dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
                        version = user.version;
                        if (pageParams.versionOverride) {
                            version = pageParams.versionOverride;
                        }
                        _b = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, BotConfigModel_1["default"].getBotConfigForBotIdAndVersionId(botId, version)];
                    case 2:
                        botConfig = _b.apply(void 0, [_c.sent()]);
                        ctx = __assign({ callSid: req.body.CallSid, mobile: mobile, toMobile: req.body.To, userId: user.id, dynamicParams: dynamicParams }, pageParams, { enableDemoMessages: false });
                        Log_1.log({
                            type: LogTypes_1.LogType.BLOCK,
                            botId: botId,
                            callSid: ctx.callSid,
                            blockId: blockName,
                            mobile: ctx.mobile,
                            pageParams: pageParams
                        });
                        gatherResult = {
                            digits: req.body.Digits
                        };
                        return [4 /*yield*/, TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, blockName, gatherResult)];
                    case 3:
                        result = _c.sent();
                        utils_1.logTwilioResponse(result);
                        res.writeHead(200, { 'Content-Type': 'text/xml' });
                        res.end(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    TwimlHandler.postBot = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var botId, blockName, mobile, user, _a, pageParams, dynamicParams, version, botConfig, _b, ctx, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        botId = utils_1.getBotId(req.params.botId);
                        blockName = utils_1.pathToBlock(req.path);
                        mobile = utils_1.getUserMobile(req.body);
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, User_1["default"].getOrCreateUserForMobile(mobile, botId)];
                    case 1:
                        user = _a.apply(void 0, [_c.sent()]);
                        pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
                        dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
                        version = user.version;
                        if (pageParams.versionOverride) {
                            version = pageParams.versionOverride;
                        }
                        _b = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, BotConfigModel_1["default"].getBotConfigForBotIdAndVersionId(botId, version)];
                    case 2:
                        botConfig = _b.apply(void 0, [_c.sent()]);
                        ctx = __assign({ callSid: req.body.CallSid, mobile: mobile, toMobile: req.body.To, userId: user.id, versionOverride: req.query.versionOverride || null, dynamicParams: dynamicParams }, pageParams, { enableDemoMessages: false });
                        Log_1.log({
                            type: LogTypes_1.LogType.BLOCK,
                            botId: botId,
                            callSid: ctx.callSid,
                            blockId: blockName,
                            mobile: ctx.mobile,
                            pageParams: pageParams
                        });
                        return [4 /*yield*/, TwilioRouter_1["default"].nextMessage(ctx, botConfig, blockName)];
                    case 3:
                        result = _c.sent();
                        utils_1.logTwilioResponse(result);
                        res.writeHead(200, { 'Content-Type': 'text/xml' });
                        res.end(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TwimlHandler;
}());
exports["default"] = TwimlHandler;
