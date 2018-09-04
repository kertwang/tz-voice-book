"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require("twilio");
const AppError_1 = require("../utils/AppError");
const VoiceResponse = twilio.twiml.VoiceResponse;
/*Types. TODO: move elsewhere */
var Block;
(function (Block) {
    Block["entrypoint"] = "entrypoint";
    Block["intro_0"] = "intro_0";
    Block["menu_0"] = "menu_0";
    Block["listen_0"] = "listen_0";
    Block["error_0"] = "error_0";
})(Block = exports.Block || (exports.Block = {}));
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
exports.flows = {
    'entrypoint': {
        success: Block.intro_0,
        error: null,
        matches: null
    },
    'intro_0': {
        success: Block.menu_0,
        error: Block.error_0,
        matches: [
            { term: 'sikiliza', nextBlock: Block.listen_0 },
            { term: 'tuma', nextBlock: Block.listen_0 },
            { term: 'msaada', nextBlock: Block.listen_0 },
            { term: 'kurudia', nextBlock: Block.listen_0 }
        ]
    },
    'error_0': {
        success: Block.intro_0,
        error: Block.error_0,
        matches: null
    }
};
// export const blocks = {
//   entrypoint: {}
// }
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
class TwilioRouter {
    static nextMessage(currentBlock) {
        //Not sure if this will work, we may need to nest stuff
        const response = TwilioRouter.getBlock(currentBlock);
        return response.toString();
    }
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static gatherNextMessage(currentBlock, gatherResult) {
        //TODO: parse out the twilio response, and redirect to the appropriate block
        const path = exports.flows[currentBlock];
        //TODO: we will need to reformat this nicely soon.
        switch (currentBlock) {
            case 'intro_0': {
                const stringMatches = path.matches.map(m => m.term);
                const idx = stringMatches.indexOf(gatherResult.speechResult);
                if (idx === -1) {
                    return TwilioRouter.getBlock(path.error).toString();
                }
                const nextBlock = path.matches[idx].nextBlock;
                const response = new VoiceResponse();
                response.redirect({ method: 'POST' }, `../${nextBlock}`);
                return response.toString();
            }
            default: {
                const response = new VoiceResponse();
                response.say({}, 'Sorry. Something went wrong. Please try again.');
                return response.toString();
            }
        }
    }
    static getBlock(blockName) {
        const path = exports.flows[blockName];
        switch (blockName) {
            case 'entrypoint': {
                const nextUrl = `./${path.success}`;
                const response = new VoiceResponse();
                response.say({}, 'Hello, and welcome to voicebook');
                response.redirect({ method: 'POST' }, nextUrl);
                return response;
            }
            case Block.intro_0: {
                const response = new VoiceResponse();
                //@ts-ignore
                const gather = response.gather({
                    action: `./gather/${blockName}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'sikiliza,tuma,msaada,kurudia',
                    partialResultCallbackMethod: 'POST',
                    //TODO: env var this shit!
                    partialResultCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/recognitionResults'
                });
                gather.say({}, 'To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.');
                response.say({}, 'We didn\'t receive any input. Hrrmm.');
                return response;
            }
            case Block.error_0: {
                const response = new VoiceResponse();
                //@ts-ignore
                const gather = response.gather({
                    action: `./${path.success}`,
                    method: 'POST',
                    // API doesn't have this for some reason
                    language: 'sw-TZ',
                    input: 'speech',
                    hints: 'sikiliza, tuma, msaada, kurudia',
                    partialResultCallbackMethod: 'POST',
                    //TODO: env var this shit!
                    partialResultCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/recognitionResults'
                });
                gather.say({}, 'Sorry, I didn\'t catch that. Please try again.');
                return response;
            }
            case Block.listen_0: {
                const response = new VoiceResponse();
                response.say({}, 'Here are the latest messages for Bagamoyo.');
                return response;
            }
            default:
                throw new AppError_1.default(404, `tried to getBlock for unknown block: ${blockName}`);
        }
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map