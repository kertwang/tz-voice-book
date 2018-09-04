"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require("twilio");
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
    static nextMessage(baseUrl, currentMessage) {
        const path = exports.flows[currentMessage];
        const nextUrl = `${baseUrl}/${path.success}`;
        //Not sure if this will work, we may need to nest stuff
        const response = TwilioRouter.getBlock('entrypoint');
        response.redirect({ method: 'POST' }, nextUrl);
        return response.toString();
    }
    static getBlock(blockName) {
        switch (blockName) {
            case 'entrypoint':
                const response = new VoiceResponse();
                response.say({}, 'Hello, and welcome to voicebook');
                return response;
                break;
            case 'intro_0':
                break;
            case 'error_0':
                break;
            default:
                throw new Error(`tried to getBlock for unknown block: ${blockName}`);
        }
    }
}
exports.default = TwilioRouter;
//# sourceMappingURL=TwilioRouter.js.map