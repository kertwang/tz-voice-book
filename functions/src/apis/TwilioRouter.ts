
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
import { lang } from 'moment';
import { logTwilioResponse } from '../utils';
import { BlockId, FlowMap, GatherResult, CallContext } from '../Types/TwilioRouter';
import { baseUrl } from '../utils/Env';
import TwilioFlows from '../content/TwilioFlows';
import UserApi, { Recording } from './UserApi';
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

  public static async getBlock(ctx: CallContext, blockName: BlockId): Promise<any> {
    const path = TwilioFlows[blockName];
    const response = new VoiceResponse();
    
    switch(blockName) {
      case 'entrypoint': {
        
        const nextUrl = `${baseUrl}/twiml/${path.success}`;
        response.say({}, 'Hello, and welcome to voicebook');
        response.redirect({ method: 'POST' }, nextUrl);

        return response;
      }

      case BlockId.intro_0: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${blockName}`, 
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'sikiliza,tuma,msaada,kurudia',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.play({}, 'https://s3.amazonaws.com/tzchatbot/000_1abcd_Combined_Voicebook_Swahili.mp3');
        // gather.say({}, 'To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.');
        // gather.say({}, 'To record a message that people in your community can hear, say tuma. ');
        // gather.say({}, 'To learn more about this service say msaada.');
        // gather.say({}, 'To hear these options again say kurudia.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case BlockId.error_0: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${path.success}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'sikiliza,tuma,msaada,kurudia',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.say({}, 'Sorry, I didn\'t catch that. Please try again.');

        return response;
      }
      case BlockId.listen_0: {

        //TODO: get messages from appApi
        response.say({}, 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.');
        response.say({}, 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.');
        response.say({}, 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.');
        response.say({}, 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.');
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${path.success}`);

        return response;
      }
      case BlockId.listen_end: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'maoni,sikiliza',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.say({}, 'There are no other recent messages for your community.');
        gather.say({}, 'You can hang up now. Or, to leave a message say sikiliza. To tell us how we can improve this service say, maoni.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case BlockId.listen_end_error: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${path.success}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'maoni,sikiliza',
          partialResultCallbackMethod: 'POST',
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.say({}, 'Sorry. I didn\'t understand you. Please try again.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case BlockId.listen_feedback: {
        response.say({}, 'We do our best to serve you.If you have any feedback for us, please leave us a message.If you would like us to return your call, please let us know what number to reach you.');
        response.record({
          action: `${baseUrl}/twiml/${path.success}`,
          maxLength: 10,
          transcribe: false,
          recordingStatusCallback: `${baseUrl}/twiml/recordingCallback/feedback`
        });

        return response;
      }
      case BlockId.listen_feedback_complete: {
        response.say({}, 'Thanks! Your feedback has been recorded.');

        return response;
      }
      case BlockId.record_0: {
        response.say({}, 'Your message will be heard by people who call this number FOR ONE WEEK, so say things that you want other people in your community to hear. This is a great way to let people know about news, business, and social events.');
        response.say({}, 'To record a short message for COMMUNITY, start speaking after you hear a beep. When you are finished, stop talking or press any number on your phone. You will have the opportunity to review your message before we post it.');
        //TODO: debug only
        // response.say({}, 'In the words of JT, say something.');
        response.record({
          action: `${baseUrl}/twiml/${path.success}`,
          maxLength: 10,
          transcribe: false,
          recordingStatusCallback: `${baseUrl}/twiml/recordingCallback/message`
        });

        return response;
      }
      case BlockId.record_playback: {
        console.log("context is:", ctx);
        const recordings: Recording[] = await ctx.firebaseApi.getPendingRecordingsWithRetries(ctx.callSid, 1, 5, 100);
        if (recordings.length === 0) {
          response.say({}, 'There was a problem saving your recording. Please try again.');
          return response;
        }
        const recording = recordings[0];
        
        response.say({}, 'You said:');
        response.play({}, recording.url);
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${path.success}`);
        return response;
      }
      case BlockId.record_post_or_delete: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${blockName}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'tuma,anza tena,anza,tena',
          partialResultCallbackMethod: 'POST',
          //TODO: env var this shit!
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.say({}, 'To post your message, say tuma. To cancel and start over, say anza tena');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case BlockId.record_post_or_delete_error: {
        //@ts-ignore
        const gather = response.gather({
          action: `${baseUrl}/twiml/gather/${path.success}`,
          method: 'POST',
          // API doesn't have this for some reason
          language: 'sw-TZ',
          input: 'speech',
          hints: 'tuma,anza tena,anza,tena',
          partialResultCallbackMethod: 'POST',
          //TODO: env var this shit!
          partialResultCallback: `${baseUrl}/twiml/recognitionResults`
        });
        gather.say({}, 'Sorry. I didn\'t get that. Please try again.');
        response.say({}, 'We didn\'t receive any input. Hrrmm.');

        return response;
      }
      case BlockId.record_save: {
        const recordings: Recording[] = await ctx.firebaseApi.getPendingRecordingsWithRetries(ctx.callSid, 1, 5, 100);
        //TODO: this case should redirect to Block.record_save_err
        if (recordings.length === 0) {
          response.say({}, 'There was a problem saving your recording. Please try again.');
          return response;
        }
        const recording = recordings[0];
        await ctx.firebaseApi.postRecording(recording);

        response.say({}, 'Thanks! Your message will be posted.');
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${path.success}`);
        return response;
      }
      case BlockId.record_delete: {
        await ctx.firebaseApi.deletePendingRecordingsForCall(ctx.callSid);

        response.say({}, 'Your message was erased and will not be posted.');
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${path.success}`);
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
      case BlockId.intro_0:
      case BlockId.listen_end:
      case BlockId.record_post_or_delete:
        {
          const path = TwilioFlows[currentBlock];
          //TODO: implement string search better
          //TODO: handle extra spaces??
          const stringMatches = path.matches.map(m => m.term);
          const idx = stringMatches.indexOf(gatherResult.speechResult.trim());

          //No match found :(
          if (idx === -1) {
            const errorResponse = await TwilioRouter.getBlock(ctx, path.error);
            return errorResponse.toString();
          }

          const nextBlock = path.matches[idx].nextBlock;
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