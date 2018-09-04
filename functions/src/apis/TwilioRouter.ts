
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
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

  public static nextMessage(currentBlock: string): string {
    //Not sure if this will work, we may need to nest stuff
    const response = TwilioRouter.getBlock(currentBlock);

    return response.toString();
  }

  /**
   * Handle the output of a gather endpoint, and redirect back
   * into the flow of things
   */
  public static gatherNextMessage(currentBlock: string): string {
    //TODO: parse out the twilio response, and redirect to the appropriate block

    return '12345';
  }


  public static getBlock(blockName: string): any {
    switch(blockName) {
      case 'entrypoint': {
        const path = flows[blockName];
        const nextUrl = `../${path.success}`

        const response = new VoiceResponse();
        response.say({}, 'Hello, and welcome to voicebook');
        response.redirect({ method: 'POST' }, nextUrl);

        return response;
      }

      case 'intro_0': {
        const response = new VoiceResponse();
        //Is this right? Do we route to a gather handler first?
        response.gather({action: `/gather/${blockName}`, method: 'POST'});
        response.say({}, 'To learn what is new in your community say SIKILIZA. To record a message that people in your community can hear, say TUMA. To learn more about this service say MSAADA. To hear these options again say KURUDIA.')

        return response;
      }
      case 'error_0':


      break;
      default: 
        throw new AppError(404, `tried to getBlock for unknown block: ${blockName}`);
    }
  }

}