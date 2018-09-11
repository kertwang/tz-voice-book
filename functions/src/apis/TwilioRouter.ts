
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
import { logTwilioResponse } from '../utils';
import { BlockId, FlowMap, GatherResult, CallContext, DefaultFlow, FlowType, SayMessage, PlayMessage, MessageType, BlockType, DigitResult } from '../types_rn/TwilioTypes';
import { baseUrl } from '../utils/Env';
import TwilioFlows from '../content/TwilioFlows';
import UserApi, { Recording } from './UserApi';
import TwilioMessages from '../content/TwilioMessages';
import TwilioBlocks from '../content/TwilioBlocks';
const VoiceResponse = twilio.twiml.VoiceResponse;

/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid 
 * twilio response
 */
export default class TwilioRouter {

  public static async nextMessage(ctx: CallContext, currentBlock: BlockId): Promise<string> {
    //Not sure if this will work, we may need to nest stuff
    const response = await TwilioRouter.getBlock(ctx, currentBlock);
    logTwilioResponse(response.toString());

    return response.toString();
  }

  /**
   * Given a blockId, find the Flow, Block and Messages, and build a 
   * twilio response
   */
  public static async getBlock(ctx: CallContext, blockName: BlockId): Promise<any> {
    //TODO: load based on context etc.
    const messageBlocks = await ctx.firebaseApi.messagesForMobile(ctx.mobile);
    const flow = TwilioFlows[blockName];
    const block = TwilioBlocks[blockName];
    const messages = messageBlocks[blockName]; //TODO: make type safe?

    let response = new VoiceResponse();

    switch (flow.type) {
      case FlowType.DEFAULT: {
        switch (block.type) {
          case BlockType.PLAYBACK: {
            //TODO: abstract this eventually
            response = await this.handlePlaybackBlock(blockName, response, ctx, flow);
            break;
          }
          case BlockType.RECORD: {
            response = this.appendMessagesToResponse(response, messages);
            response.record({
              action: `${baseUrl}/twiml/${flow.next}`,
              maxLength: 10,
              transcribe: false,
              recordingStatusCallback: `${baseUrl}${block.recordingCallback}`
            });
            break;
          }
          case BlockType.DEFAULT:
          default: {
            const nextUrl = `${baseUrl}/twiml/${flow.next}`;
            this.appendMessagesToResponse(response, messages);
            response.redirect({ method: 'POST' }, nextUrl);
          }
        }

        return response;
      }
      case FlowType.GATHER: {
        //TODO: modify this for digits only
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          // language: 'sw-TZ',
          input: 'dtmf',
          numDigits: 1,
          //TODO: find
          // partialResultCallbackMethod: 'POST',
          // partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        this.appendMessagesToResponse(gather, messages);
        //This is a backup TODO: remove
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      default: {
        const _exhaustiveMatch: never = flow;
        throw new Error(`Non-exhausive match for path: ${_exhaustiveMatch}`);
      }
    }
  }

  private static async handlePlaybackBlock(blockName: BlockId, response: any, ctx: CallContext, flow: DefaultFlow) {

    //TODO: figure out how to make more type safe
    switch(blockName) {
      case(BlockId.listen_0): {
        //TODO: load these messages async
        response.say({ }, 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.');
        response.say({ }, 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.');
        response.say({ }, 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.');
        response.say({ }, 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.');
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${flow.next}`);

        break;
      }
      case (BlockId.record_playback): {
        // const recordings: Recording[] = [];
        const recordings: Recording[] = await ctx.firebaseApi.getPendingRecordingsWithRetries(ctx.callSid, 1, 5, 100);
        if (recordings.length === 0) {
          //TODO: handle somehow
          response.say({}, 'There was a problem saving your recording. Please try again.');
          return response;
        }
        const recording = recordings[0];
      
        response.say({}, 'You said:');
        response.play({}, recording.url);
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${flow.next}`);
      
        break;
      }
      default:
        throw new Error(`Incorrectly handled Playback block: ${blockName}`);
    }

    return response;
  }


  private static appendMessagesToResponse(response, messages): any {
    messages.forEach((m: SayMessage | PlayMessage) => {
      switch (m.type) {
        case (MessageType.SAY):
          //TODO: add language in here.
          response.say({}, m.text);
          break;
        case (MessageType.PLAY):
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
  public static async gatherNextMessage(
    ctx: CallContext,
    currentBlock: BlockId,
    gatherResult: DigitResult): Promise<string> {
    //TODO: parse out the twilio response, and redirect to the appropriate block

    const flow = TwilioFlows[currentBlock];
    if (flow.type !== FlowType.GATHER) {
      console.error(`gatherNextMessage tried to handle flow with type: ${flow.type}`);
      const response = new VoiceResponse();
      response.say({}, 'Sorry. Something went wrong. Please try again.');
      return response.toString();
    }

    //TODO: we will need to reformat this nicely soon.
    switch (currentBlock) {
      // Default implementation
      case BlockId.intro_0:
      case BlockId.listen_end:
      case BlockId.record_post_or_delete:
      //TODO: handle the digits as well!
        {
          const validDigits = flow.digitMatches.map(d => d.digits);
          const idx = validDigits.indexOf(gatherResult.digits.trim());

          //No match found :(
          if (idx === -1) {
            //TODO: should this redirect instead?
            const errorResponse = await TwilioRouter.getBlock(ctx, flow.error);
            return errorResponse.toString();
          }

          const nextBlock = flow.matches[idx].nextBlock;
          const response = new VoiceResponse();
          response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${nextBlock}`);

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