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
const AppError_1 = require("../utils/AppError");
const utils_1 = require("../utils");
const BenchmarkRouter_1 = require("../Types/BenchmarkRouter");
const Env_1 = require("../utils/Env");
const BenchmarkFlows_1 = require("../content/BenchmarkFlows");
const VoiceResponse = twilio.twiml.VoiceResponse;
class BenchmarkRouter {
    static nextMessage(ctx, currentBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            //Not sure if this will work, we may need to nest stuff
            const response = yield BenchmarkRouter.getBlock(ctx, currentBlock);
            utils_1.logTwilioResponse(response.toString());
            return response.toString();
        });
    }
    static getBlock(ctx, blockName) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = BenchmarkFlows_1.default[blockName];
            const response = new VoiceResponse();
            switch (blockName) {
                case 'entrypoint': {
                    const nextUrl = `${Env_1.baseUrl}/twiml/${path.success}`;
                    response.say({}, 'This is the Swahili Voice test for Voicebook. Please go through each step and make a note of if it was successful or failed');
                    response.redirect({ method: 'POST' }, nextUrl);
                    return response;
                }
                case 'test_1': {
                    //@ts-ignore
                    const gather = response.gather({
                        action: `${Env_1.baseUrl}/benchmark/gather/${blockName}`,
                        method: 'POST',
                        // API doesn't have this for some reason
                        language: 'sw-TZ',
                        input: 'speech',
                        hints: 'sikiliza,tuma,msaada,kurudia',
                        partialResultCallbackMethod: 'POST',
                        partialResultCallback: `${Env_1.baseUrl}/benchmark/recognitionResults`
                    });
                    gather.say({}, 'Test 1. To learn what is new in your community say sikiliza.To record a message that people in your community can hear, say tuma.To learn more about this service say msaada.To hear these options again say kurudia.');
                    response.say({}, 'We didn\'t receive any input. Hrrmm.');
                    return response;
                }
                case 'test_1_fail': {
                    response.say({}, 'Test Failed.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_1_match': {
                    response.say({}, 'Test Success.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_1_partial_match': {
                    response.say({}, 'Test Partial match.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_2': {
                    //@ts-ignore
                    const gather = response.gather({
                        action: `${Env_1.baseUrl}/benchmark/gather/${blockName}`,
                        method: 'POST',
                        // API doesn't have this for some reason
                        language: 'sw-TZ',
                        input: 'speech',
                        hints: 'msaada,sada',
                        partialResultCallbackMethod: 'POST',
                        partialResultCallback: `${Env_1.baseUrl}/benchmark/recognitionResults`
                    });
                    gather.say({}, 'Test 2- Interruption test. Please interrupt this message by saying the word msaada. This message will continue to play but please try to interrupt it. This message will continue to play but please try to interrupt it. I am still playing. Looks like you couldn\'t interrupt me.Herm...');
                    response.say({}, 'We didn\'t receive any input. Hrrmm.');
                    return response;
                }
                case 'test_2_fail': {
                    response.say({}, 'Test Failed.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_2_match': {
                    response.say({}, 'Test Success.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_2_partial_match': {
                    response.say({}, 'Test Partial match.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_3': {
                    //@ts-ignore
                    const gather = response.gather({
                        action: `${Env_1.baseUrl}/benchmark/gather/${blockName}`,
                        method: 'POST',
                        // API doesn't have this for some reason
                        language: 'sw-TZ',
                        input: 'speech',
                        hints: 'msaada,sada',
                        partialResultCallbackMethod: 'POST',
                        partialResultCallback: `${Env_1.baseUrl}/benchmark/recognitionResults`
                    });
                    gather.say({}, 'Test 3 - Prefix Test. Please say asante moja for option 1. Say asante mbili for option 2. Say asante tatu for option 3.');
                    response.say({}, 'We didn\'t receive any input. Hrrmm.');
                    return response;
                }
                case 'test_3_fail': {
                    response.say({}, 'Test Failed.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_3_full_phrase': {
                    response.say({}, 'Test success, with full phrase.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_3_last_word': {
                    response.say({}, 'Test success, but only detected last word.');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'test_3_prefix_only': {
                    response.say({}, 'Test failed. Only detected the first word');
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${path.success}`);
                    return response;
                }
                case 'end': {
                    response.say({}, 'Thanks. Test complete.');
                    return response;
                }
                default:
                    throw new AppError_1.default(404, `called getBlock for unknown block: ${blockName}`);
            }
        });
    }
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static gatherNextMessage(ctx, currentBlock, gatherResult) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: parse out the twilio response, and redirect to the appropriate block
            //TODO: we will need to reformat this nicely soon.
            switch (currentBlock) {
                // Default implementation
                case BenchmarkRouter_1.BlockId.test_1:
                case BenchmarkRouter_1.BlockId.test_2:
                case BenchmarkRouter_1.BlockId.test_3:
                    {
                        const path = BenchmarkFlows_1.default[currentBlock];
                        //TODO: implement string search better
                        //TODO: handle extra spaces??
                        const stringMatches = path.matches.map(m => m.term);
                        const idx = stringMatches.indexOf(gatherResult.speechResult.trim());
                        //No match found :(
                        if (idx === -1) {
                            const errorResponse = yield this.getBlock(ctx, path.error);
                            return errorResponse.toString();
                        }
                        const nextBlock = path.matches[idx].nextBlock;
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
exports.default = BenchmarkRouter;
//# sourceMappingURL=BenchmarkRouter.js.map