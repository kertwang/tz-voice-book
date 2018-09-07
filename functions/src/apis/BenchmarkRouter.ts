// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
import { lang } from 'moment';
import { logTwilioResponse } from '../utils';
import { BlockId, FlowMap, GatherResult, CallContext } from '../types_rn/BenchmarkRouter';
import { baseUrl } from '../utils/Env';
import BenchmarkFlows from '../content/BenchmarkFlows';
import UserApi, { Recording } from './UserApi';
const VoiceResponse = twilio.twiml.VoiceResponse;


export default class BenchmarkRouter {
  
  public static async nextMessage(ctx: CallContext, currentBlock: BlockId): Promise<string> {
    //Not sure if this will work, we may need to nest stuff
    const response = await BenchmarkRouter.getBlock(ctx, currentBlock);
    logTwilioResponse(response.toString());

    return response.toString();
  }

  //This is hacky :(
  public static async getBlock(ctx: CallContext, blockName: BlockId, extraText: string = ''): Promise<any> {
    const path = BenchmarkFlows[blockName];
    const response = new VoiceResponse();

    switch (blockName) {
      case 'entrypoint': {
        const nextUrl = `${baseUrl}/benchmark/${path.success}`;
        response.say({}, 'This is the Swahili Voice test for Voicebook. Please go through each step and make a note of if it was successful or failed');
        response.redirect({ method: 'POST' }, nextUrl);

        return response;
      }
      case 'test_1': {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/benchmark/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'sikiliza,tuma,msaada,kurudia',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/benchmark/recognitionResults`
        });
        // gather.say({}, 'Test 1. To learn what is new in your community say sikiliza.To record a message that people in your community can hear, say tuma.To learn more about this service say msaada.To hear these options again say kurudia.');
        gather.say({}, 'Test 1');
        gather.play({}, 'https://s3.amazonaws.com/tzchatbot/000_1abcd_Combined_Voicebook_Swahili.mp3');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case 'test_1_fail': {
        response.say({}, `Test Failed. You said: ${extraText}`);
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);
        return response;
      }
      case 'test_1_match': {
        response.say({}, 'Test Success.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);
        return response;
      }
      case 'test_1_partial_match': {
        response.say({}, 'Test Partial match.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);
        return response;
      }
      case 'test_2': {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/benchmark/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'msaada,sada',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/benchmark/recognitionResults`
        });
        gather.say({}, 'Test 2- Interruption test.');
        //Please interrupt this message by saying msaada. This message will continue to play but please try to interrupt it. This message will continue to play but please try to interrupt it. I am still playing. Looks like you couldn\'t interrupt me.Herm...');
        gather.play({}, 'https://firebasestorage.googleapis.com/v0/b/tz-phone-book.appspot.com/o/benchmark_test_2.mp3?alt=media&token=7112ffe3-e4b0-4ee1-81f5-6e08d9bccf52');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case 'test_2_fail': {
        response.say({}, `Test Failed. You said: ${extraText}`);
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);

        return response;
      }
      case 'test_2_match': {
        response.say({}, 'Test Success.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);

        return response;
      }
      case 'test_2_partial_match': {
        response.say({}, 'Test Partial match.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);

        return response;
      }
      case 'test_3': {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/benchmark/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'msaada,sada',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/benchmark/recognitionResults`
        });
        gather.say({}, 'Test 3 - Prefix Test.')
        // Please say asante moja for option 1. Say asante mbili for option 2. Say asante tatu for option 3.');
        gather.play({}, 'https://firebasestorage.googleapis.com/v0/b/tz-phone-book.appspot.com/o/benchmark_test_3.mp3?alt=media&token=5265298b-0af8-4f82-ada5-c202691046da');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case 'test_3_fail': {
        response.say({}, `Test Failed. You said: ${extraText}`);
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);
        
        return response;
      }
      case 'test_3_full_phrase': {
        response.say({}, 'Test success, with full phrase.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);
        
        return response;
      }
      case 'test_3_last_word': {
        response.say({}, 'Test success, but only detected last word.');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);

        return response;
      }
      case 'test_3_prefix_only': {
        response.say({}, 'Test failed. Only detected the first word');
        response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${path.success}`);

        return response;
      }
      case 'end': {
        response.say({}, 'Thanks. Test complete.');
        return response;
      }

      default:
        throw new AppError(404, `called getBlock for unknown block: ${blockName}`);
    }
  }

  /**
   * Handle the output of a gather endpoint, and redirect back
   * into the flow of things
   */
  public static async gatherNextMessage(
    ctx: CallContext,
    currentBlock: BlockId,
    gatherResult: GatherResult): Promise<string> {
    //TODO: parse out the twilio response, and redirect to the appropriate block

    //TODO: we will need to reformat this nicely soon.
    switch (currentBlock) {
      // Default implementation
      case BlockId.test_1:
      case BlockId.test_2:
      case BlockId.test_3:
        {
          const path = BenchmarkFlows[currentBlock];
          //TODO: implement string search better
          //TODO: handle extra spaces??
          const stringMatches: string[] = path.matches.map(m => m.term);
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
          response.redirect({ method: 'POST' }, `${baseUrl}/benchmark/${nextBlock}`);

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