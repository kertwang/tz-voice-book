
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
import { lang } from 'moment';
import { logTwilioResponse } from '../utils';
const VoiceResponse = twilio.twiml.VoiceResponse;

/*Types. TODO: move elsewhere */

export enum Block {
  entrypoint = 'entrypoint',
  intro_0 = 'intro_0',
  menu_0 = 'menu_0',

  listen_0 = 'listen_0',
  listen_end = 'listen_end',
  listen_end_error = 'listen_end_error',
  listen_feedback = 'listen_feedback',
  listen_feedback_complete = 'listen_feedback_complete',

  error_0 = 'error_0',
  record_0 = 'record_0',
  info_0 = 'info_0',

  end = 'end'
}

export type FlowMap = {
  [others: string]: FlowPath;
}

export type FlowPath = {
  success: Block,
  error: Block | null,
  matches: FlowMatch[]
}

export type FlowMatch = {
  term: string,
  nextBlock: Block,
}

export type GatherResult = {
  speechResult: string,
  confidence: number,
}



/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
export const flows: FlowMap = {
  'entrypoint': { 
    success: Block.intro_0, 
    error: null, 
    matches: null 
  },
  'intro_0': { 
    success: null, 
    error: Block.error_0, 
    matches: [
      { term: 'sikiliza', nextBlock: Block.listen_0},
      { term: 'tuma', nextBlock: Block.record_0 },
      { term: 'msaada', nextBlock: Block.info_0 },
      { term: 'kurudia', nextBlock: Block.intro_0 }
    ]
  },
  'error_0': { 
    success: Block.intro_0, 
    error: Block.error_0, 
    matches: null 
  },
  'listen_0': {
    success: Block.listen_end,
    error: null,
    matches: null,
  },
  'listen_end': {
    success: null,
    error: Block.listen_end_error,
    matches: [
      { term: 'sikiliza', nextBlock: Block.record_0 },
      { term: 'maoni', nextBlock: Block.listen_feedback},
    ],
  },
  'listen_feedback': {
    success: Block.listen_feedback_complete,
    error: null,
    matches: null,
  },
  'listen_feedback_complete': {
    success: null,
    error: null,
    matches: null,
  }
}

/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid 
 * twilio response
 */
export default class TwilioRouter {

  public static nextMessage(currentBlock: Block): string {
    //Not sure if this will work, we may need to nest stuff
    const response = TwilioRouter.getBlock(currentBlock);
    logTwilioResponse(response.toString());

    return response.toString();
  }

  public static getBlock(blockName: Block): any {
    const path = flows[blockName];
    const response = new VoiceResponse();
    
    switch(blockName) {
      case 'entrypoint': {
        
        const nextUrl = `./${path.success}`;
        response.say({}, 'Hello, and welcome to voicebook');
        response.redirect({ method: 'POST' }, nextUrl);

        return response;
      }

      case Block.intro_0: {
        //@ts-ignore
        const gather = response.gather({
          action: `./gather/${blockName}`, 
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'sikiliza, tuma, msaada, kurudia',
          partialResultCallbackMethod: 'POST',
          //TODO: env var this shit!
          partialResultCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/recognitionResults'
        });
        gather.say({}, 'To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case Block.error_0: {
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

        //TODO:
        response.say({}, 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.');
        response.say({}, 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.');
        response.say({}, 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.');
        response.say({}, 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.');
        response.redirect({ method: 'POST' }, `./${path.success}`);

        return response;
      }
      case Block.listen_end: {
        //@ts-ignore
        const gather = response.gather({
          action: `./gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'maoni, sikiliza',
          partialResultCallbackMethod: 'POST',
          //TODO: env var this shit!
          partialResultCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/recognitionResults'
        });
        gather.say({}, 'There are no other recent messages for your community. You can hang up now. Or, to leave a message say sikiliza. To tell us how we can improve this service say, maoni.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case Block.listen_end_error: {
        //@ts-ignore
        const gather = response.gather({
          action: `./gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'maoni, sikiliza',
          partialResultCallbackMethod: 'POST',
          //TODO: env var this shit!
          partialResultCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/recognitionResults'
        });
        gather.say({}, 'Sorry. I didn\'t understand you. Please try again.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case Block.listen_feedback: {
        response.say({}, 'We do our best to serve you.If you have any feedback for us, please leave us a message.If you would like us to return your call, please let us know what number to reach you.');
        response.record({
          action: `./${path.success}`,
          maxLength: 10,
          transcribe: false,
          //TODO: env var this shit!
          recordingStatusCallback: 'https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/feedbackResults'
        });
      }
      case Block.listen_feedback_complete: {
        response.say({}, 'Thanks! Your feedback has been recorded.');
      }

      default: 
        throw new AppError(404, `tried to getBlock for unknown block: ${blockName}`);
    }
  }

  /**
   * Handle the output of a gather endpoint, and redirect back
   * into the flow of things
   */
  public static gatherNextMessage(
    currentBlock: Block,
    gatherResult: GatherResult): string {
    //TODO: parse out the twilio response, and redirect to the appropriate block

  
    //TODO: we will need to reformat this nicely soon.
    switch (currentBlock) {
      case Block.intro_0:
      case Block.listen_end:
        {
          const path = flows[currentBlock];
          //TODO: implement string search better
          //TODO: handle extra spaces??
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
        console.log(`ERROR: gatherNextMessage not implemented for ${currentBlock}`)
        const response = new VoiceResponse();
        response.say({}, 'Sorry. Something went wrong. Please try again.');
        return response.toString();
      }
    }
  }


}