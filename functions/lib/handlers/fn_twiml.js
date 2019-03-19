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
var _this = this;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var moment_1 = __importDefault(require("moment"));
var morgan_1 = __importDefault(require("morgan"));
//@ts-ignore
var morgan_body_1 = __importDefault(require("morgan-body"));
var TwilioRouter_1 = __importDefault(require("../apis/TwilioRouter"));
var ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
var utils_1 = require("../utils");
var FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
var Firestore_1 = __importDefault(require("../apis/Firestore"));
var Log_1 = require("../utils/Log");
var TwilioApi_1 = require("../apis/TwilioApi");
var Env_1 = require("../utils/Env");
var LogTypes_1 = require("../types_rn/LogTypes");
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var responses2_template_1 = __importDefault(require("./responses2.template"));
var mustache_1 = __importDefault(require("mustache"));
//TODO: make newer import format
require('express-async-errors');
var bodyParser = require('body-parser');
var twilioApi = new TwilioApi_1.TwilioApi();
module.exports = function (functions) {
    var app = express_1["default"]();
    app.use(bodyParser.json());
    var firebaseApi = new FirebaseApi_1["default"](Firestore_1["default"]);
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan_1["default"](':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morgan_body_1["default"](app);
    }
    /* CORS Configuration */
    var openCors = cors_1["default"]({ origin: '*' });
    app.use(openCors);
    /**
     * Collect partial results for debugging purposes.
     */
    app.post('/recognitionResults', function (req, res) {
        console.log("stable: '" + req.body.StableSpeechResult + "' unstable: '" + req.body.UnstableSpeechResult + "'");
        res.json(true);
    });
    /**
     * Get the responses from the chatbot in a simple text format
     */
    app.get('/:botId/responses', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var botId, intents, responsesResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botId = req.params.botId;
                    intents = [
                        { intent: 'shareQuestionCapture', question: 'Great. Would you mind sharing one of your questions with me? You can type it below:', responses: [] },
                        { intent: 'improveNotificationMessageCapture', question: 'Is there anything about the notification text message that you think could be improved? Take a minute and jot down any ideas you have that might improve it. What’s one thing you jotted down?', responses: [] },
                        { intent: 'conclusionOneThingCapture', question: 'One quick question: What would you most like to get out of the exercise today?', responses: [] },
                        { intent: 'tripSummaryStruggleCapture', question: 'In one word, what do you now think is the most important key to using automated digital tools with low-income clients?', responses: [] },
                    ];
                    return [4 /*yield*/, Promise.all(intents.map(function (i) { return firebaseApi.getResponses(botId, i.intent); }))];
                case 1:
                    responsesResult = _a.sent();
                    responsesResult.forEach(function (result, idx) {
                        if (result.type === AppProviderTypes_1.ResultType.ERROR) {
                            return;
                        }
                        //@ts-ignore
                        intents[idx].responses = result.result;
                    });
                    res.status(200).send(mustache_1["default"].render(responses2_template_1["default"], { intents: intents }));
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * Callback triggered once feedback recording is finished
     */
    app.post('/:botId/recordingCallback/feedback', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var botId, recording, pendingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botId = utils_1.getBotId(req.params.botId);
                    recording = {
                        url: req.body.RecordingUrl,
                        createdAt: moment_1["default"]().toISOString(),
                        callSid: req.body.CallSid
                    };
                    return [4 /*yield*/, firebaseApi.saveFeedbackRecording(recording, botId)];
                case 1:
                    pendingId = _a.sent();
                    Log_1.log({
                        type: LogTypes_1.LogType.PENDING_MESSAGE,
                        botId: botId,
                        pendingId: pendingId,
                        callSid: recording.callSid,
                        url: recording.url
                    });
                    res.json(pendingId);
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * triggerCall
     *
     * triggers a call.
     * TODO: set up auth
     *
     * example body:
     * {
     *   "mobile": "+61410237238",
     *   "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
     *   "botId": "senegalNotification",
     * }
     *
     */
    app.post('/triggerCall', function (req, res) {
        if (!req.query.temporaryInsecureAuthKey) {
            res.status(401).send('apiKey is required');
        }
        if (req.query.temporaryInsecureAuthKey !== Env_1.temporaryInsecureAuthKey) {
            res.status(401).send('Invalid Api Key');
        }
        return twilioApi.startCall(req.body.botId, req.body.mobile, req.body.url)
            .then(function (response) { return res.json(response); });
    });
    /**
     * Handle Twilio Callback to save the recording for pending submission.
     */
    app.post('/:botId/recordingCallback/message', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var botId, recording, pendingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botId = utils_1.getBotId(req.params.botId);
                    recording = {
                        url: req.body.RecordingUrl,
                        createdAt: moment_1["default"]().toISOString(),
                        callSid: req.body.CallSid
                    };
                    return [4 /*yield*/, firebaseApi.savePendingRecording(recording, botId)];
                case 1:
                    pendingId = _a.sent();
                    Log_1.log({
                        type: LogTypes_1.LogType.PENDING_MESSAGE,
                        botId: botId,
                        pendingId: pendingId,
                        callSid: recording.callSid,
                        url: recording.url
                    });
                    res.json(pendingId);
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * Action callback handlers.
     */
    app.post('/:botId/gather/*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var botId, blockName, mobile, user, pageParams, dynamicParams, botConfig, ctx, gatherResult, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botId = utils_1.getBotId(req.params.botId);
                    blockName = utils_1.pathToBlock(req.path);
                    console.log("Block Name: " + blockName + ". Query Params: " + JSON.stringify(req.query));
                    mobile = utils_1.getUserMobile(req.body);
                    return [4 /*yield*/, firebaseApi.getUserFromMobile(mobile, botId)];
                case 1:
                    user = _a.sent();
                    pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
                    dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
                    if (!pageParams.versionOverride) return [3 /*break*/, 3];
                    return [4 /*yield*/, firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride)];
                case 2:
                    botConfig = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, firebaseApi.getBotConfig(user.id, botId)];
                case 4:
                    botConfig = _a.sent();
                    _a.label = 5;
                case 5:
                    ctx = __assign({ callSid: req.body.CallSid, mobile: mobile, toMobile: req.body.To, userId: user.id, firebaseApi: firebaseApi,
                        dynamicParams: dynamicParams }, pageParams, { enableDemoMessages: false });
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
                case 6:
                    result = _a.sent();
                    utils_1.logTwilioResponse(result);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(result);
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * Handle all normal routes
     */
    app.post('/:botId/*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var botId, blockName, mobile, user, pageParams, dynamicParams, botConfig, ctx, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botId = utils_1.getBotId(req.params.botId);
                    blockName = utils_1.pathToBlock(req.path);
                    mobile = utils_1.getUserMobile(req.body);
                    return [4 /*yield*/, firebaseApi.getUserFromMobile(mobile, botId)];
                case 1:
                    user = _a.sent();
                    pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
                    dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
                    if (!pageParams.versionOverride) return [3 /*break*/, 3];
                    return [4 /*yield*/, firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride)];
                case 2:
                    //RW-TODO: change this to getBotConfig with params
                    botConfig = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, firebaseApi.getBotConfig(user.id, botId)];
                case 4:
                    botConfig = _a.sent();
                    _a.label = 5;
                case 5:
                    console.log("POST /:botId/ bot config is:", botConfig);
                    ctx = __assign({ callSid: req.body.CallSid, mobile: mobile, toMobile: req.body.To, userId: user.id, versionOverride: req.query.versionOverride || null, firebaseApi: firebaseApi,
                        dynamicParams: dynamicParams }, pageParams, { enableDemoMessages: false });
                    Log_1.log({
                        type: LogTypes_1.LogType.BLOCK,
                        botId: botId,
                        callSid: ctx.callSid,
                        blockId: blockName,
                        mobile: ctx.mobile,
                        pageParams: pageParams
                    });
                    return [4 /*yield*/, TwilioRouter_1["default"].nextMessage(ctx, botConfig, blockName)];
                case 6:
                    result = _a.sent();
                    utils_1.logTwilioResponse(result);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(result);
                    return [2 /*return*/];
            }
        });
    }); });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1["default"]);
    return functions.https.onRequest(app);
};
