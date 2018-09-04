"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require("twilio");
const AppError_1 = require("../utils/AppError");
const VoiceResponse = twilio.twiml.VoiceResponse;
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
exports.flows = {
    'entrypoint': { success: 'intro_0', error: null },
    'intro_0': { success: 'menu_0', error: 'error_0' },
    'error_0': { success: 'intro_0', error: 'error_0' }
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
    static gatherNextMessage(currentBlock) {
        //TODO: parse out the twilio response, and redirect to the appropriate block
        return '12345';
    }
    static getBlock(blockName) {
        switch (blockName) {
            case 'entrypoint': {
                const path = exports.flows[blockName];
                const nextUrl = `../${path.success}`;
                const response = new VoiceResponse();
                response.say({}, 'Hello, and welcome to voicebook');
                response.redirect({ method: 'POST' }, nextUrl);
                return response;
            }
            case 'intro_0': {
                const response = new VoiceResponse();
                //Is this right? Do we route to a gather handler first?
                response.gather({ action: `/gather/${blockName}`, method: 'POST' });
                response.say({}, 'To learn what is new in your community say SIKILIZA. To record a message that people in your community can hear, say TUMA. To learn more about this service say MSAADA. To hear these options again say KURUDIA.');
                return response;
            }
            case 'error_0':
                break;
            default:
                throw new AppError_1.default(404, `tried to getBlock for unknown block: ${blockName}`);
        }
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map