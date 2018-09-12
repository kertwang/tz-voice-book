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
            //TODO: load based on context etc.
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
                            response = yield this.handlePlaybackBlock(blockName, response, ctx, flow, messages);
                            break;
                        }
                        case TwilioTypes_1.BlockType.RECORD: {
                            response = this.appendMessagesToResponse(response, messages);
                            response.record({
                                action: `${Env_1.baseUrl}/twiml/${flow.next}`,
                                maxLength: 10,
                                transcribe: false,
                                recordingStatusCallback: `${Env_1.baseUrl}${block.recordingCallback}`
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
                            const nextUrl = `${Env_1.baseUrl}/twiml/${flow.next}`;
                            this.appendMessagesToResponse(response, messages);
                            response.redirect({ method: 'POST' }, nextUrl);
                        }
                    }
                    return response;
                }
                case TwilioTypes_1.FlowType.GATHER: {
                    const gather = response.gather({
                        action: `${Env_1.baseUrl}/twiml/gather/${blockName}`,
                        method: 'POST',
                        input: 'dtmf',
                        numDigits: 1,
                    });
                    this.appendMessagesToResponse(gather, messages);
                    //This is a backup TODO: remove
                    response.say({}, 'We didn\'t receive any input. Hrrmm.');
                    return response;
                }
                default: {
                    const _exhaustiveMatch = flow;
                    throw new Error(`Non-exhausive match for path: ${_exhaustiveMatch}`);
                }
            }
        });
    }
    static handlePlaybackBlock(blockName, response, ctx, flow, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: figure out how to make more type safe and more generic
            switch (blockName) {
                case (TwilioTypes_1.BlockId.listen_playback): {
                    //TODO: figure out how to wrap this in a gather block!
                    //TODO: this repeats messages when page size > 1
                    //Play all of the pre-recorded messages, then load all of the messages from firestore and play them.
                    const recordings = yield ctx.firebaseApi.getRecordings(ctx.maxMessages);
                    console.log('got recordings back from firebase: ', recordings);
                    const totalCount = messages.length + recordings.length;
                    const { page, pageSize } = ctx;
                    const allToPlay = messages;
                    recordings.forEach(r => allToPlay.push(r));
                    const toPlay = allToPlay.slice(page, page + pageSize);
                    toPlay.forEach(message => {
                        //Warning - not type safe :(
                        //TODO: tidy this up
                        if (message.type === TwilioTypes_1.MessageType.PLAY) {
                            return response.play({}, message.url);
                        }
                        if (message.type === TwilioTypes_1.MessageType.SAY) {
                            return response.say({ language: message.language }, message.text);
                        }
                        console.log("ERROR in handlePlaybackBlock, bad message:", message);
                    });
                    let redirectUrl = `${Env_1.baseUrl}/twiml/${blockName}?page=${page + 1}\&pageSize=${pageSize}\&maxMessages=${ctx.maxMessages}`;
                    if ((page * pageSize) > totalCount) {
                        //We are out of messages, redirect to next block
                        redirectUrl = `${Env_1.baseUrl}/twiml/${flow.next}`;
                    }
                    //call back to this block.
                    response.redirect({ method: 'POST' }, redirectUrl);
                    break;
                }
                case (TwilioTypes_1.BlockId.record_playback): {
                    // const recordings: Recording[] = [];
                    const recordings = yield ctx.firebaseApi.getPendingRecordingsWithRetries(ctx.callSid, 1, 5, 100);
                    if (recordings.length === 0) {
                        //TODO: handle somehow
                        response.say({}, 'There was a problem saving your recording. Please try again.');
                        return response;
                    }
                    const recording = recordings[0];
                    response.say({}, 'You said:');
                    response.play({}, recording.url);
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${flow.next}`);
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
            const flow = config.flows[currentBlock];
            if (flow.type !== TwilioTypes_1.FlowType.GATHER) {
                console.error(`gatherNextMessage tried to handle flow with type: ${flow.type}`);
                const response = new VoiceResponse();
                response.say({}, 'Sorry. Something went wrong. Please try again.');
                return response.toString();
            }
            //TODO: we will need to reformat this nicely soon.
            switch (currentBlock) {
                case TwilioTypes_1.BlockId.record_post_or_delete: {
                    //Handle the case where user wants us to post the message!
                    //Falls through to router
                    if (gatherResult.digits.trim() === '1') {
                        const pendingRecordings = yield ctx.firebaseApi.getPendingRecordings(ctx.callSid, 1);
                        if (pendingRecordings.length === 1) {
                            const recordingId = yield ctx.firebaseApi.postRecording(pendingRecordings[0]);
                            //TODO: make a logger class
                            console.log(`LOG: {"action":"POST_MESSAGE", "recordingId":"${recordingId}"}`);
                        }
                    }
                }
                // Default implementation
                case TwilioTypes_1.BlockId.intro_0:
                case TwilioTypes_1.BlockId.listen_end:
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
                        response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${nextBlock}`);
                        return response.toString();
                    }
                default: {
                    console.log(`ERROR: gatherNextMessage not implemented for ${currentBlock}`);
                    const response = new VoiceResponse();
                    response.say({}, 'Sorry. There was a problem. Please try again.');
                    return response.toString();
                }
            }
        });
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map