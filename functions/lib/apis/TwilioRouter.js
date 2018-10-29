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
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require("twilio");
const utils_1 = require("../utils");
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const Env_1 = require("../utils/Env");
const Log_1 = require("../utils/Log");
const LogTypes_1 = require("../types_rn/LogTypes");
const VoiceResponse = twilio.twiml.VoiceResponse;
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
class TwilioRouter {
    static nextMessage(ctx, config, currentBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            //Not sure if this will work, we may need to nest stuff
            const response = yield TwilioRouter.getBlock(ctx, config, currentBlock);
            utils_1.logTwilioResponse(response.toString());
            return response.toString();
        });
    }
    /**
     * Given a blockId, find the Flow, Block and Messages, and build a
     * twilio response
     */
    static getBlock(ctx, config, blockName) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageBlocks = config.messages;
            const flow = config.flows[blockName];
            const block = config.blocks[blockName];
            const messages = messageBlocks[blockName]; //TODO: make type safe?
            let response = new VoiceResponse();
            switch (flow.type) {
                case TwilioTypes_1.FlowType.DEFAULT: {
                    switch (block.type) {
                        case TwilioTypes_1.BlockType.PLAYBACK: {
                            //TODO: abstract this eventually
                            response = yield this.handlePlaybackBlock(config.botId, blockName, response, ctx, flow.next, messages);
                            break;
                        }
                        case TwilioTypes_1.BlockType.RECORD: {
                            response = this.appendMessagesToResponse(response, messages);
                            response.record({
                                // action: `${baseUrl}/twiml/${config.botId}/${flow.next}`,
                                action: utils_1.buildRedirectUrl({
                                    type: utils_1.NextUrlType.DefaultUrl,
                                    baseUrl: Env_1.baseUrl,
                                    botId: config.botId,
                                    blockName: flow.next,
                                    versionOverride: ctx.versionOverride,
                                }),
                                maxLength: 10,
                                transcribe: false,
                                // recordingStatusCallback: `${baseUrl}/twiml/${config.botId}/${block.recordingCallback}`
                                recordingStatusCallback: utils_1.buildRedirectUrl({
                                    type: utils_1.NextUrlType.RecordingCallbackUrl,
                                    baseUrl: Env_1.baseUrl,
                                    botId: config.botId,
                                    recordingCallback: block.recordingCallback,
                                })
                            });
                            break;
                        }
                        case TwilioTypes_1.BlockType.END: {
                            this.appendMessagesToResponse(response, messages);
                            response.hangup();
                            break;
                        }
                        case TwilioTypes_1.BlockType.DEFAULT:
                        default: {
                            // const nextUrl = `${baseUrl}/twiml/${config.botId}/${flow.next}`;
                            const nextUrl = utils_1.buildRedirectUrl({
                                type: utils_1.NextUrlType.DefaultUrl,
                                baseUrl: Env_1.baseUrl,
                                botId: config.botId,
                                blockName: flow.next,
                                versionOverride: ctx.versionOverride,
                            });
                            this.appendMessagesToResponse(response, messages);
                            response.redirect({ method: 'POST' }, nextUrl);
                        }
                    }
                    return response;
                }
                case TwilioTypes_1.FlowType.GATHER: {
                    const gather = response.gather({
                        // action: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
                        action: utils_1.buildRedirectUrl({
                            type: utils_1.NextUrlType.GatherUrl,
                            baseUrl: Env_1.baseUrl,
                            botId: config.botId,
                            blockName,
                            versionOverride: ctx.versionOverride,
                        }),
                        method: 'POST',
                        input: 'dtmf',
                        numDigits: 1,
                    });
                    this.appendMessagesToResponse(gather, messages);
                    //Default to first option
                    const nextUrl = utils_1.buildRedirectUrl({
                        type: utils_1.NextUrlType.DefaultUrl,
                        baseUrl: Env_1.baseUrl,
                        botId: config.botId,
                        blockName: flow.digitMatches[0].nextBlock,
                        versionOverride: ctx.versionOverride,
                    });
                    this.appendMessagesToResponse(response, messages);
                    response.redirect({ method: 'POST' }, nextUrl);
                    return response;
                }
                default: {
                    const _exhaustiveMatch = flow;
                    throw new Error(`Non-exhausive match for path: ${_exhaustiveMatch}`);
                }
            }
        });
    }
    static handlePlaybackBlock(botId, blockName, response, ctx, nextBlock, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: figure out how to make more type safe and more generic - eg a custom block definition, with a function for how to handle it defined elsewhere
            switch (blockName) {
                //this has a flow type of gather- breaking some weird stuff
                case (TwilioTypes_1.BlockId.listen_playback): {
                    const gather = response.gather({
                        // action: `${baseUrl}/twiml/${botId}/gather/${blockName}?page=${ctx.page}\&pageSize=${ctx.pageSize}\&maxMessages=${ctx.maxMessages}`,
                        action: utils_1.buildRedirectUrl({
                            type: utils_1.NextUrlType.PaginatedGatherUrl,
                            baseUrl: Env_1.baseUrl,
                            botId,
                            blockName: nextBlock,
                            nextPageNo: ctx.page,
                            pageSize: ctx.pageSize,
                            maxMessages: ctx.maxMessages,
                            versionOverride: ctx.versionOverride,
                        }),
                        method: 'POST',
                        input: 'dtmf',
                        numDigits: 1,
                    });
                    //TODO: figure out how to wrap this in a gather block!
                    //TODO: fixme this repeats messages when page size > 1
                    //Play all of the pre-recorded messages, then load all of the messages from firestore and play them.
                    const recordings = yield ctx.firebaseApi.getRecordings(ctx.maxMessages, botId);
                    const totalCount = messages.length + recordings.length;
                    const { page, pageSize } = ctx;
                    const allToPlay = messages;
                    recordings.forEach(r => allToPlay.push(r));
                    const toPlay = allToPlay.slice(page, page + pageSize);
                    toPlay.forEach(message => {
                        //Warning - not type safe :(
                        //TODO: tidy this up
                        if (message.type === TwilioTypes_1.MessageType.PLAY) {
                            return gather.play({}, message.url);
                        }
                        if (message.type === TwilioTypes_1.MessageType.SAY) {
                            return gather.say({ language: message.language }, message.text);
                        }
                        console.log("ERROR in handlePlaybackBlock, bad message:", message);
                    });
                    let urlBuilder;
                    if ((page * pageSize) > totalCount) {
                        urlBuilder = {
                            type: utils_1.NextUrlType.DefaultUrl,
                            baseUrl: Env_1.baseUrl,
                            botId,
                            blockName: nextBlock,
                            versionOverride: ctx.versionOverride,
                        };
                    }
                    else {
                        urlBuilder = {
                            type: utils_1.NextUrlType.PaginatedUrl,
                            baseUrl: Env_1.baseUrl,
                            botId,
                            blockName: nextBlock,
                            nextPageNo: page + 1,
                            pageSize,
                            maxMessages: ctx.maxMessages,
                            versionOverride: ctx.versionOverride,
                        };
                    }
                    //call back to this block.
                    response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                    break;
                }
                case (TwilioTypes_1.BlockId.record_playback): {
                    // const recordings: Recording[] = [];
                    const recordings = yield ctx.firebaseApi.getPendingRecordingsWithRetries(botId, ctx.callSid, 1, 8, 100);
                    if (recordings.length === 0) {
                        //Try again
                        //TODO: fix slow infinte loop here :(
                        const urlBuilder = {
                            type: utils_1.NextUrlType.DefaultUrl,
                            baseUrl: Env_1.baseUrl,
                            botId,
                            blockName: nextBlock,
                            versionOverride: ctx.versionOverride,
                        };
                        response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                        return response;
                    }
                    const recording = recordings[0];
                    response.play({}, recording.url);
                    response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl({
                        type: utils_1.NextUrlType.DefaultUrl,
                        baseUrl: Env_1.baseUrl,
                        botId,
                        blockName: nextBlock,
                        versionOverride: ctx.versionOverride,
                    }));
                    break;
                }
                default:
                    throw new Error(`Incorrectly handled Playback block: ${blockName}`);
            }
            return response;
        });
    }
    static appendMessagesToResponse(response, messages) {
        messages.forEach((m) => {
            switch (m.type) {
                case (TwilioTypes_1.MessageType.SAY):
                    //TODO: add language in here.
                    response.say({ language: m.language }, m.text);
                    break;
                case (TwilioTypes_1.MessageType.PLAY):
                    response.play({}, m.url);
                    break;
            }
        });
        return response;
    }
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static gatherNextMessage(ctx, config, currentBlock, gatherResult) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: parse out the twilio response, and redirect to the appropriate block
            //TODO: make more generic - this isn't technically a GATHER block, so we shouldn't do this really.
            console.log("currentBlock", currentBlock);
            if (currentBlock === TwilioTypes_1.BlockId.listen_playback) {
                const response = new VoiceResponse();
                let nextPage;
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
                // const redirectUrl = buildPaginatedUrl(baseUrl, config.botId, BlockId.listen_playback, nextPage, ctx.pageSize, ctx.maxMessages);
                const urlBuilder = {
                    type: utils_1.NextUrlType.PaginatedUrl,
                    baseUrl: Env_1.baseUrl,
                    botId: config.botId,
                    blockName: TwilioTypes_1.BlockId.listen_playback,
                    nextPageNo: nextPage,
                    pageSize: ctx.pageSize,
                    maxMessages: ctx.maxMessages,
                    versionOverride: ctx.versionOverride,
                };
                console.log("redirect url is:", utils_1.buildRedirectUrl(urlBuilder));
                response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl(urlBuilder));
                return response.toString();
            }
            const flow = config.flows[currentBlock];
            if (flow.type !== TwilioTypes_1.FlowType.GATHER) {
                console.error(`gatherNextMessage tried to handle flow with type: ${flow.type}`);
                const response = new VoiceResponse();
                response.say({}, 'Sorry. Something went wrong. Please try again.');
                return response.toString();
            }
            //TODO: we will need to reformat this nicely soon. maybe have custom action handlers or something
            switch (currentBlock) {
                case TwilioTypes_1.BlockId.record_post_or_delete: {
                    //Handle the case where user wants us to post the message!
                    //Falls through to router
                    if (gatherResult.digits.trim() === '1') {
                        const pendingRecordings = yield ctx.firebaseApi.getPendingRecordings(ctx.callSid, 1, config.botId);
                        if (pendingRecordings.length === 1) {
                            const recordingId = yield ctx.firebaseApi.postRecording(pendingRecordings[0], config.botId);
                            //TODO: make a logger class
                            console.log(`LOG: {"action":"POST_MESSAGE", "recordingId":"${recordingId}"}`);
                            Log_1.log({
                                type: LogTypes_1.LogType.POST_MESSAGE,
                                botId: config.botId,
                                recordingId,
                                callSid: ctx.callSid,
                                url: pendingRecordings[0].url,
                            });
                        }
                    }
                }
                // Default implementation
                case TwilioTypes_1.BlockId.intro_0:
                case TwilioTypes_1.BlockId.listen_end:
                default:
                    //TODO: handle the digits as well!
                    {
                        const validDigits = flow.digitMatches.map(d => d.digits);
                        const idx = validDigits.indexOf(gatherResult.digits.trim());
                        //No match found :(
                        if (idx === -1) {
                            //TODO: should this redirect instead?
                            const errorResponse = yield TwilioRouter.getBlock(ctx, config, flow.error);
                            return errorResponse.toString();
                        }
                        const nextBlock = flow.digitMatches[idx].nextBlock;
                        const response = new VoiceResponse();
                        //TODO: here
                        // response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${config.botId}/${nextBlock}`);
                        response.redirect({ method: 'POST' }, utils_1.buildRedirectUrl({
                            type: utils_1.NextUrlType.DefaultUrl,
                            baseUrl: Env_1.baseUrl,
                            botId: config.botId,
                            blockName: nextBlock,
                            versionOverride: ctx.versionOverride,
                        }));
                        return response.toString();
                    }
            }
        });
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map