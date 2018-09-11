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
const TwilioFlows_1 = require("../content/TwilioFlows");
const TwilioBlocks_1 = require("../content/TwilioBlocks");
const VoiceResponse = twilio.twiml.VoiceResponse;
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
class TwilioRouter {
    static nextMessage(ctx, currentBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            //Not sure if this will work, we may need to nest stuff
            const response = yield TwilioRouter.getBlock(ctx, currentBlock);
            utils_1.logTwilioResponse(response.toString());
            return response.toString();
        });
    }
    /**
     * Given a blockId, find the Flow, Block and Messages, and build a
     * twilio response
     */
    static getBlock(ctx, blockName) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: load based on context etc.
            const messageBlocks = yield ctx.firebaseApi.messagesForMobile(ctx.mobile);
            const flow = TwilioFlows_1.default[blockName];
            const block = TwilioBlocks_1.default[blockName];
            const messages = messageBlocks[blockName]; //TODO: make type safe?
            let response = new VoiceResponse();
            switch (flow.type) {
                case TwilioTypes_1.FlowType.DEFAULT: {
                    switch (block.type) {
                        case TwilioTypes_1.BlockType.PLAYBACK: {
                            //TODO: abstract this eventually
                            response = yield this.handlePlaybackBlock(blockName, response, ctx, flow);
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
                    //TODO: modify this for digits only
                    //@ts-ignore
                    const gather = response.gather({
                        action: `${Env_1.baseUrl}/twiml/gather/${blockName}`,
                        method: 'POST',
                        // API doesn't have this for some reason
                        // language: 'sw-TZ',
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
    static handlePlaybackBlock(blockName, response, ctx, flow) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: figure out how to make more type safe
            switch (blockName) {
                case (TwilioTypes_1.BlockId.listen_0): {
                    //TODO: load these messages async
                    response.say({}, 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.');
                    response.say({}, 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.');
                    response.say({}, 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.');
                    response.say({}, 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${flow.next}`);
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
                    response.say({}, m.text);
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
    static gatherNextMessage(ctx, currentBlock, gatherResult) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: parse out the twilio response, and redirect to the appropriate block
            const flow = TwilioFlows_1.default[currentBlock];
            if (flow.type !== TwilioTypes_1.FlowType.GATHER) {
                console.error(`gatherNextMessage tried to handle flow with type: ${flow.type}`);
                const response = new VoiceResponse();
                response.say({}, 'Sorry. Something went wrong. Please try again.');
                return response.toString();
            }
            //TODO: we will need to reformat this nicely soon.
            switch (currentBlock) {
                // Default implementation
                case TwilioTypes_1.BlockId.intro_0:
                case TwilioTypes_1.BlockId.listen_end:
                case TwilioTypes_1.BlockId.record_post_or_delete:
                    //TODO: handle the digits as well!
                    {
                        const validDigits = flow.digitMatches.map(d => d.digits);
                        const idx = validDigits.indexOf(gatherResult.digits.trim());
                        //No match found :(
                        if (idx === -1) {
                            //TODO: should this redirect instead?
                            const errorResponse = yield TwilioRouter.getBlock(ctx, flow.error);
                            return errorResponse.toString();
                        }
                        const nextBlock = flow.matches[idx].nextBlock;
                        const response = new VoiceResponse();
                        response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${nextBlock}`);
                        return response.toString();
                    }
                default: {
                    console.log(`ERROR: gatherNextMessage not implemented for ${currentBlock}`);
                    const response = new VoiceResponse();
                    response.say({}, 'Sorry. Something went wrong. Please try again.');
                    return response.toString();
                }
            }
        });
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map