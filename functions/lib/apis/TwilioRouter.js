"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require("twilio");
const AppError_1 = require("../utils/AppError");
const utils_1 = require("../utils");
const TwilioRouter_1 = require("../Types/TwilioRouter");
const Env_1 = require("../utils/Env");
const TwilioFlows_1 = require("./TwilioFlows");
const VoiceResponse = twilio.twiml.VoiceResponse;
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
class TwilioRouter {
    static nextMessage(currentBlock) {
        //Not sure if this will work, we may need to nest stuff
        const response = TwilioRouter.getBlock(currentBlock);
        utils_1.logTwilioResponse(response.toString());
        return response.toString();
    }
    static getBlock(blockName) {
        const path = TwilioFlows_1.default[blockName];
        const response = new VoiceResponse();
        switch (blockName) {
            case 'entrypoint': {
                const nextUrl = `${Env_1.baseUrl}/twiml/${path.success}`;
                response.say({}, 'Hello, and welcome to voicebook');
                response.redirect({ method: 'POST' }, nextUrl);
                return response;
            }
            case TwilioRouter_1.Block.intro_0: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${blockName}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'sikiliza,tuma,msaada,kurudia',
                    partialResultCallbackMethod: 'POST',
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case TwilioRouter_1.Block.error_0: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${path.success}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'sikiliza,tuma,msaada,kurudia',
                    partialResultCallbackMethod: 'POST',
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'Sorry, I didn\'t catch that. Please try again.');
                return response;
            }
            case TwilioRouter_1.Block.listen_0: {
                //TODO:
                response.say({}, 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.');
                response.say({}, 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.');
                response.say({}, 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.');
                response.say({}, 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.');
                response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${path.success}`);
                return response;
            }
            case TwilioRouter_1.Block.listen_end: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${blockName}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'maoni,sikiliza',
                    partialResultCallbackMethod: 'POST',
                    //TODO: env var this shit!
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'There are no other recent messages for your community. You can hang up now. Or, to leave a message say sikiliza. To tell us how we can improve this service say, maoni.');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case TwilioRouter_1.Block.listen_end_error: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${path.success}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'maoni,sikiliza',
                    partialResultCallbackMethod: 'POST',
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'Sorry. I didn\'t understand you. Please try again.');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case TwilioRouter_1.Block.listen_feedback: {
                response.say({}, 'We do our best to serve you.If you have any feedback for us, please leave us a message.If you would like us to return your call, please let us know what number to reach you.');
                response.record({
                    action: `${Env_1.baseUrl}/twiml/${path.success}`,
                    maxLength: 10,
                    transcribe: false,
                    recordingStatusCallback: `${Env_1.baseUrl}/twiml/recordingCallback?${blockName}`
                });
                return response;
            }
            case TwilioRouter_1.Block.listen_feedback_complete: {
                response.say({}, 'Thanks! Your feedback has been recorded.');
                return response;
            }
            case TwilioRouter_1.Block.record_0: {
                response.say({}, 'Your message will be heard by people who call this number FOR ONE WEEK, so say things that you want other people in your community to hear. This is a great way to let people know about news, business, and social events.');
                response.say({}, 'To record a short message for COMMUNITY, start speaking after you hear a beep. When you are finished, stop talking or press any number on your phone. You will have the opportunity to review your message before we post it.');
                //TODO: we need to get this message back somehow!
                response.record({
                    action: `${Env_1.baseUrl}/twiml/${path.success}`,
                    maxLength: 10,
                    transcribe: false,
                    recordingStatusCallback: `${Env_1.baseUrl}/twiml/recordingCallback?${blockName}`
                });
                return response;
            }
            case TwilioRouter_1.Block.record_playback: {
                response.say({}, 'You said:');
                //TODO: actually get the message from the database!!!
                response.say({}, 'Lewis you are the best');
                response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${path.success}`);
                return response;
            }
            case TwilioRouter_1.Block.record_post_or_delete: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${blockName}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'tuma,anza tena,anza,tena',
                    partialResultCallbackMethod: 'POST',
                    //TODO: env var this shit!
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'To post your message, say tuma. To cancel and start over, say anza tena');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case TwilioRouter_1.Block.record_post_or_delete_error: {
                //@ts-ignore
                const gather = response.gather({
                    action: `${Env_1.baseUrl}/twiml/gather/${path.success}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'tuma,anza tena,anza,tena',
                    partialResultCallbackMethod: 'POST',
                    //TODO: env var this shit!
                    partialResultCallback: `${Env_1.baseUrl}/twiml/recognitionResults`
                });
                gather.say({}, 'Sorry. I didn\'t get that. Please try again.');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case TwilioRouter_1.Block.record_save: {
                //TODO: save the message to public
                response.say({}, 'Thanks! Your message will be posted');
                response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${path.success}`);
                return response;
            }
            case TwilioRouter_1.Block.record_delete: {
                response.say({}, 'Your message was erased and will not be posted.');
                response.redirect({ method: 'POST' }, `${Env_1.baseUrl}/twiml/${path.success}`);
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
    static gatherNextMessage(currentBlock, gatherResult) {
        //TODO: parse out the twilio response, and redirect to the appropriate block
        //TODO: we will need to reformat this nicely soon.
        switch (currentBlock) {
            // Default implementation
            case TwilioRouter_1.Block.intro_0:
            case TwilioRouter_1.Block.listen_end:
            case TwilioRouter_1.Block.record_post_or_delete:
                {
                    const path = TwilioFlows_1.default[currentBlock];
                    //TODO: implement string search better
                    //TODO: handle extra spaces??
                    const stringMatches = path.matches.map(m => m.term);
                    const idx = stringMatches.indexOf(gatherResult.speechResult.trim());
                    if (idx === -1) {
                        return TwilioRouter.getBlock(path.error).toString();
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
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map