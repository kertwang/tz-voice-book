"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = __importStar(require("twilio"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const utils_1 = require("../utils");
const BenchmarkRouter_1 = require("../types_rn/BenchmarkRouter");
const Env_1 = require("../utils/Env");
const BenchmarkFlows_1 = __importDefault(require("../content/BenchmarkFlows"));
const VoiceResponse = twilio.twiml.VoiceResponse;
class BenchmarkRouter {
    static async nextMessage(ctx, currentBlock) {
        //Not sure if this will work, we may need to nest stuff
        const response = await BenchmarkRouter.getBlock(ctx, currentBlock);
        utils_1.logTwilioResponse(response.toString());
        return response.toString();
    }
    //This is hacky :(
    static async getBlock(ctx, blockName, extraText = '') {
        const path = BenchmarkFlows_1.default[blockName];
        const response = new VoiceResponse();
        switch (blockName) {
            case 'entrypoint': {
                const nextUrl = `${Env_1.baseUrl}/benchmark/${path.success}`;
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
                // gather.say({}, 'Test 1. To learn what is new in your community say sikiliza.To record a message that people in your community can hear, say tuma.To learn more about this service say msaada.To hear these options again say kurudia.');
                gather.say({}, 'Test 1');
                gather.play({}, 'https://s3.amazonaws.com/tzchatbot/000_1abcd_Combined_Voicebook_Swahili.mp3');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case 'test_1_fail': {
                response.say({}, `Test Failed. You said: ${extraText}`);
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
                gather.say({}, 'Test 2- Interruption test.');
                //Please interrupt this message by saying msaada. This message will continue to play but please try to interrupt it. This message will continue to play but please try to interrupt it. I am still playing. Looks like you couldn\'t interrupt me.Herm...');
                gather.play({}, 'https://firebasestorage.googleapis.com/v0/b/tz-phone-book.appspot.com/o/benchmark_test_2.mp3?alt=media&token=7112ffe3-e4b0-4ee1-81f5-6e08d9bccf52');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case 'test_2_fail': {
                response.say({}, `Test Failed. You said: ${extraText}`);
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
                gather.say({}, 'Test 3 - Prefix Test.');
                // Please say asante moja for option 1. Say asante mbili for option 2. Say asante tatu for option 3.');
                gather.play({}, 'https://firebasestorage.googleapis.com/v0/b/tz-phone-book.appspot.com/o/benchmark_test_3.mp3?alt=media&token=5265298b-0af8-4f82-ada5-c202691046da');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case 'test_3_fail': {
                response.say({}, `Test Failed. You said: ${extraText}`);
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
    }
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static async gatherNextMessage(ctx, currentBlock, gatherResult) {
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
                    // const idx = stringMatches.indexOf(gatherResult.speechResult.trim());
                    let idx = -1;
                    const responseText = gatherResult.speechResult.trim();
                    stringMatches.forEach((phrase, i) => {
                        if (phrase.indexOf(responseText) > -1) {
                            idx = i;
                        }
                    });
                    //No match found :(
                    if (idx === -1) {
                        const errorResponse = await this.getBlock(ctx, path.error, responseText);
                        return errorResponse.toString();
                    }
                    const nextBlock = path.matches[idx].nextBlock;
                    const response = new VoiceResponse();
                    response.say({}, `You said: ${responseText}`);
                    response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/benchmark/${nextBlock}`);
                    return response.toString();
                }
            default: {
                console.log(`ERROR: gatherNextMessage not implemented for ${currentBlock}`);
                const response = new VoiceResponse();
                response.say({}, 'Sorry. Something went wrong. Please try again.');
                return response.toString();
            }
        }
    }
}
exports.default = BenchmarkRouter;
