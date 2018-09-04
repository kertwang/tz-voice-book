
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
const VoiceResponse = twilio.twiml.VoiceResponse;


export type FlowMap = {
  [others: string]: FlowPath;
}

export type FlowPath = {
  success: string,
  error: string | null,
}

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
export const flows: FlowMap = {
  'entrypoint': { success: 'intro_0', error: null },
  'intro_0': { success: 'menu_0', error: 'error_0' },
  'error_0': { success: 'intro_0', error: 'error_0' }

}

// export const blocks = {
//   entrypoint: {}
// }

/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid 
 * twilio response
 */
export default class TwilioRouter {

  public static nextMessage(baseUrl: string, currentMessage: string): string {
    const path = flows[currentMessage];
    const nextUrl = `${baseUrl}/${path.success}`

    //Not sure if this will work, we may need to nest stuff
    const response = TwilioRouter.getBlock('entrypoint');
    response.redirect({method: 'POST'}, nextUrl);

    return response.toString();
  }


  public static getBlock(blockName: string): any {
    switch(blockName) {
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