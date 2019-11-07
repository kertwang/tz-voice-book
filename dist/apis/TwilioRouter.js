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
var VoiceResponse_1 = __importDefault(require("twilio/lib/twiml/VoiceResponse"));
var utils_1 = require("../utils");
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var Env_1 = require("../utils/Env");
var Log_1 = require("../utils/Log");
var LogTypes_1 = require("../types_rn/LogTypes");
var ZapierApi_1 = __importDefault(require("./ZapierApi"));
var GenericApi_1 = __importDefault(require("./GenericApi"));
/* a temporary object to replace Firebase API */
var dummyApi = new GenericApi_1["default"]();
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
var TwilioRouter = /** @class */ (function () {
    function TwilioRouter() {
    }
    TwilioRouter.nextMessage = function (ctx, config, currentBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TwilioRouter.getBlock(ctx, config, currentBlock)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.toString()];
                }
            });
        });
    };
    /**
     * Given a blockId, find the Flow, Block and Messages, and build a
     * twilio response
     */
    TwilioRouter.getBlock = function (ctx, config, blockName) {
        return __awaiter(this, void 0, void 0, function () {
            var messageBlocks, flow, block, messages, response, _a, _b, nextUrl, gather, nextUrl, _exhaustiveMatch;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messageBlocks = config.messages;
                        flow = config.flows[blockName];
                        if (!flow) {
                            throw new Error("flow not found for blockName: " + blockName);
                        }
                        block = config.blocks[blockName];
                        if (!block) {
                            throw new Error("block not found for blockName: " + blockName);
                        }
                        messages = messageBlocks[blockName];
                        if (!messages) {
                            throw new Error("messages not found for blockName: " + blockName);
                        }
                        response = new VoiceResponse_1["default"]();
                        _a = flow.type;
                        switch (_a) {
                            case TwilioTypes_1.FlowType.DEFAULT: return [3 /*break*/, 1];
                            case TwilioTypes_1.FlowType.GATHER: return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        _b = block.type;
                        switch (_b) {
                            case TwilioTypes_1.BlockType.PLAYBACK: return [3 /*break*/, 2];
                            case TwilioTypes_1.BlockType.RECORD: return [3 /*break*/, 4];
                            case TwilioTypes_1.BlockType.END: return [3 /*break*/, 5];
                            case TwilioTypes_1.BlockType.DEFAULT: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.handlePlaybackBlock(config.botId, blockName, response, ctx, flow.next, messages)];
                    case 3:
                        //TODO: abstract this eventually
                        response = _c.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        {
                            response = this.appendMessagesToResponse(response, messages);
                            response.record({
                                // action: `${baseUrl}/twiml/${config.botId}/${flow.next}`,
                                action: utils_1.buildRedirectUrl({
                                    type: utils_1.NextUrlType.DefaultUrl,
                                    baseUrl: Env_1.baseUrl,
                                    botId: config.botId,
                                    blockName: flow.next,
                                    versionOverride: ctx.versionOverride
                                }),
                                maxLength: 10,
                                transcribe: false,
                                // recordingStatusCallback: `${baseUrl}/twiml/${config.botId}/${block.recordingCallback}`
                                recordingStatusCallback: utils_1.buildRedirectUrl({
                                    type: utils_1.NextUrlType.RecordingCallbackUrl,
                                    baseUrl: Env_1.baseUrl,
                                    botId: config.botId,
                                    recordingCallback: block.recordingCallback
                                })
                            });
                            return [3 /*break*/, 7];
                        }
                        _c.label = 5;
                    case 5:
                        {
                            this.appendMessagesToResponse(response, messages);
                            response.hangup();
                            return [3 /*break*/, 7];
                        }
                        _c.label = 6;
                    case 6:
                        {
                            nextUrl = utils_1.buildRedirectUrl({
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: config.botId,
                                blockName: flow.next,
                                versionOverride: ctx.versionOverride
                            });
                            this.appendMessagesToResponse(response, messages, ctx.dynamicParams);
                            response.redirect({ method: 'POST' }, nextUrl);
                        }
                        _c.label = 7;
                    case 7: return [2 /*return*/, response];
                    case 8:
                        {
                            gather = response.gather({
                                // action: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
                                action: utils_1.buildRedirectUrl({
                                    type: utils_1.NextUrlType.GatherUrl,
                                    baseUrl: Env_1.baseUrl,
                                    botId: config.botId,
                                    blockName: blockName,
                                    versionOverride: ctx.versionOverride
                                }),
                                method: 'POST',
                                input: ['dtmf'],
                                numDigits: 1
                            });
                            this.appendMessagesToResponse(gather, messages);
                            nextUrl = utils_1.buildRedirectUrl({
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: config.botId,
                                blockName: flow.digitMatches[0].nextBlock,
                                versionOverride: ctx.versionOverride
                            });
                            this.appendMessagesToResponse(response, messages);
                            response.redirect({ method: 'POST' }, nextUrl);
                            return [2 /*return*/, response];
                        }
                        _c.label = 9;
                    case 9:
                        {
                            _exhaustiveMatch = flow;
                            throw new Error("Non-exhausive match for path: " + _exhaustiveMatch);
                        }
                        _c.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TwilioRouter.handlePlaybackBlock = function (botId, blockName, response, ctx, nextBlock, messages) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gather_1, recordings, totalCount, page, pageSize, allToPlay_1, toPlay, urlBuilder, recordings, urlBuilder, recording;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = blockName;
                        switch (_a) {
                            case (TwilioTypes_1.BlockId.listen_playback): return [3 /*break*/, 1];
                            case (TwilioTypes_1.BlockId.record_playback): return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        gather_1 = response.gather({
                            // action: `${baseUrl}/twiml/${botId}/gather/${blockName}?page=${ctx.page}\&pageSize=${ctx.pageSize}\&maxMessages=${ctx.maxMessages}`,
                            action: utils_1.buildRedirectUrl({
                                type: utils_1.NextUrlType.PaginatedGatherUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: botId,
                                //I think this should be this block, so that it loops
                                blockName: TwilioTypes_1.BlockId.listen_playback,
                                // blockName: nextBlock,
                                nextPageNo: ctx.page,
                                pageSize: ctx.pageSize,
                                maxMessages: ctx.maxMessages,
                                versionOverride: ctx.versionOverride
                            }),
                            method: 'POST',
                            input: 'dtmf',
                            numDigits: 1
                        });
                        return [4 /*yield*/, dummyApi.getRecordings(ctx.maxMessages, botId)];
                    case 2:
                        recordings = _b.sent();
                        totalCount = recordings.length;
                        if (ctx.enableDemoMessages) {
                            totalCount += messages.length;
                        }
                        page = ctx.page, pageSize = ctx.pageSize;
                        allToPlay_1 = [];
                        if (ctx.enableDemoMessages) {
                            messages.forEach(function (m) { return allToPlay_1.push(m); });
                        }
                        recordings.forEach(function (r) { return allToPlay_1.push(r); });
                        toPlay = allToPlay_1.slice(page, page + pageSize);
                        toPlay.forEach(function (message) {
                            //Warning - not type safe :(
                            //TODO: tidy this up
                            if (message.type === TwilioTypes_1.MessageType.PLAY) {
                                return gather_1.play({}, message.url);
                            }
                            if (message.type === TwilioTypes_1.MessageType.SAY) {
                                return gather_1.say({ language: message.language }, message.text);
                            }
                            console.log("ERROR in handlePlaybackBlock, bad message:", message);
                        });
                        urlBuilder = void 0;
                        if ((page * pageSize) > totalCount) {
                            //Finished listening to messages
                            urlBuilder = {
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: botId,
                                blockName: nextBlock,
                                versionOverride: ctx.versionOverride
                            };
                        }
                        else {
                            //Get the next page of messages
                            urlBuilder = {
                                type: utils_1.NextUrlType.PaginatedUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: botId,
                                blockName: nextBlock,
                                nextPageNo: page + 1,
                                pageSize: pageSize,
                                maxMessages: ctx.maxMessages,
                                versionOverride: ctx.versionOverride
                            };
                        }
                        //call back to this block.
                        response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, dummyApi.getPendingRecordingsWithRetries(botId, ctx.callSid, 1, 8, 100)];
                    case 4:
                        recordings = _b.sent();
                        if (recordings.length === 0) {
                            urlBuilder = {
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: botId,
                                blockName: nextBlock,
                                versionOverride: ctx.versionOverride
                            };
                            response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                            return [2 /*return*/, response];
                        }
                        recording = recordings[0];
                        response.play({}, recording.url);
                        response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl({
                            type: utils_1.NextUrlType.DefaultUrl,
                            baseUrl: Env_1.baseUrl,
                            botId: botId,
                            blockName: nextBlock,
                            versionOverride: ctx.versionOverride
                        }));
                        return [3 /*break*/, 6];
                    case 5: throw new Error("Incorrectly handled Playback block: " + blockName);
                    case 6: return [2 /*return*/, response];
                }
            });
        });
    };
    TwilioRouter.appendMessagesToResponse = function (response, messages, dynamicParams) {
        if (dynamicParams === void 0) { dynamicParams = []; }
        messages.forEach(function (m) {
            switch (m.type) {
                case (TwilioTypes_1.MessageType.SAY):
                    //TODO: add language in here.
                    response.say({ language: m.language }, m.text);
                    break;
                case (TwilioTypes_1.MessageType.PLAY):
                    response.play({}, m.url);
                    break;
                //RW-TODO: implement the appendMessages for our dynamic friends. We will need to figure out how to pass in the params here.
                case (TwilioTypes_1.MessageType.DYNAMIC_SAY): {
                    if (dynamicParams.length === 0) {
                        console.warn("appendMessagesToResponse had a dynamic message type, but no dynamic params were supplied! This could be fatal.");
                    }
                    var resolvedMessages = m.func(dynamicParams);
                    resolvedMessages.forEach(function (nestedMessage) { return response.say({ language: nestedMessage.language }, nestedMessage.text); });
                    break;
                }
                case (TwilioTypes_1.MessageType.DYNAMIC_PLAY): {
                    if (dynamicParams.length === 0) {
                        console.warn("appendMessagesToResponse had a dynamic message type, but no dynamic params were supplied! This could be fatal.");
                    }
                    //Inject the runtime urlGenerator
                    var urlGenerator = function (path) { return utils_1.generateUrl(Env_1.urlPrefix, path, Env_1.firebaseToken); };
                    var resolvedMessages = m.func(dynamicParams, urlGenerator);
                    resolvedMessages.forEach(function (nestedMessage) { return response.play({}, nestedMessage.url); });
                    break;
                }
                default:
                    throw new Error("Non exhausive match for MessageType");
            }
        });
        return response;
    };
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    TwilioRouter.gatherNextMessage = function (ctx, config, currentBlock, gatherResult) {
        return __awaiter(this, void 0, void 0, function () {
            var response, nextPage, urlBuilder, flow, response, _a, pendingRecordings, recordingId, validDigits, idx, nextBlock, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //TODO: parse out the twilio response, and redirect to the appropriate block
                        //TODO: make more generic - this isn't technically a GATHER block, so we shouldn't do this really.
                        /* Handle listen_playback specially */
                        if (currentBlock === TwilioTypes_1.BlockId.listen_playback) {
                            response = new VoiceResponse_1["default"]();
                            nextPage = 0;
                            /* Handle the user skipping or repeating the message*/
                            switch (gatherResult.digits.trim()) {
                                case '1': {
                                    //Skip
                                    nextPage = ctx.page + 1;
                                    break;
                                }
                                case '2': {
                                    //Repeat
                                    nextPage = ctx.page;
                                    break;
                                }
                            }
                            urlBuilder = {
                                type: utils_1.NextUrlType.PaginatedUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: config.botId,
                                blockName: TwilioTypes_1.BlockId.listen_playback,
                                nextPageNo: nextPage,
                                pageSize: ctx.pageSize,
                                maxMessages: ctx.maxMessages,
                                versionOverride: ctx.versionOverride
                            };
                            response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                            return [2 /*return*/, response.toString()];
                        }
                        flow = config.flows[currentBlock];
                        if (flow.type !== TwilioTypes_1.FlowType.GATHER) {
                            console.error("gatherNextMessage tried to handle flow with type: " + flow.type);
                            response = new VoiceResponse_1["default"]();
                            response.say({}, 'Sorry. Something went wrong. Please try again.');
                            return [2 /*return*/, response.toString()];
                        }
                        _a = currentBlock;
                        switch (_a) {
                            case TwilioTypes_1.BlockId.record_post_or_delete: return [3 /*break*/, 1];
                            case TwilioTypes_1.BlockId.stop: return [3 /*break*/, 4];
                            case TwilioTypes_1.BlockId.intro_0: return [3 /*break*/, 5];
                            case TwilioTypes_1.BlockId.listen_end: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(gatherResult.digits.trim() === '1')) return [3 /*break*/, 4];
                        return [4 /*yield*/, dummyApi.getPendingRecordings(ctx.callSid, 1, config.botId)];
                    case 2:
                        pendingRecordings = _b.sent();
                        if (!(pendingRecordings.length === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, dummyApi.postRecording(pendingRecordings[0], config.botId)];
                    case 3:
                        recordingId = _b.sent();
                        Log_1.log({
                            type: LogTypes_1.LogType.POST_MESSAGE,
                            botId: config.botId,
                            recordingId: recordingId,
                            callSid: ctx.callSid,
                            url: pendingRecordings[0].url
                        });
                        _b.label = 4;
                    case 4:
                        {
                            if (gatherResult.digits.trim() === '3') {
                                //Send a call to the spreadsheet api, append this number
                                try {
                                    ZapierApi_1["default"].optOut(ctx.toMobile);
                                }
                                catch (err) {
                                    console.warn("Non fatal error: zapier api opt out failed.");
                                }
                            }
                            //Don't break at the end, since we want this to continue.
                        }
                        _b.label = 5;
                    case 5:
                        {
                            validDigits = flow.digitMatches.map(function (d) { return d.digits; });
                            idx = validDigits.indexOf(gatherResult.digits.trim());
                            //No match found :(
                            if (idx === -1) {
                                idx = 0; //default to first option if someone presses the wrong number
                            }
                            nextBlock = flow.digitMatches[idx].nextBlock;
                            response = new VoiceResponse_1["default"]();
                            response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl({
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: config.botId,
                                blockName: nextBlock,
                                versionOverride: ctx.versionOverride
                            }));
                            return [2 /*return*/, response.toString()];
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return TwilioRouter;
}());
exports["default"] = TwilioRouter;
