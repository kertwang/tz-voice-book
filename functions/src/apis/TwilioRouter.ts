
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import * as twilio from 'twilio';
import AppError from '../utils/AppError';
import { logTwilioResponse, buildPaginatedUrl } from '../utils';
import { BlockId, FlowMap, GatherResult, CallContext, DefaultFlow, FlowType, SayMessage, PlayMessage, MessageType, BlockType, DigitResult, BotConfig, GatherFlow, BotId } from '../types_rn/TwilioTypes';
import { baseUrl } from '../utils/Env';
import UserApi, { Recording } from './UserApi';
import { log } from '../utils/Log';
import { LogType } from '../types_rn/LogTypes';
const VoiceResponse = twilio.twiml.VoiceResponse;

/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid 
 * twilio response
 */
export default class TwilioRouter {

  public static async nextMessage(ctx: CallContext, config: BotConfig, currentBlock: BlockId): Promise<string> {
    //Not sure if this will work, we may need to nest stuff
    const response = await TwilioRouter.getBlock(ctx, config, currentBlock);
    logTwilioResponse(response.toString());

    return response.toString();
  }

  /**
   * Given a blockId, find the Flow, Block and Messages, and build a 
   * twilio response
   */
  public static async getBlock(ctx: CallContext, config: BotConfig, blockName: BlockId): Promise<any> {
    const messageBlocks = config.messages;
    const flow = config.flows[blockName];
    const block = config.blocks[blockName];
    const messages = messageBlocks[blockName]; //TODO: make type safe?

    let response = new VoiceResponse();

    switch (flow.type) {
      case FlowType.DEFAULT: {
        switch (block.type) {
          case BlockType.PLAYBACK: {
            //TODO: abstract this eventually
            response = await this.handlePlaybackBlock(config.botId, blockName, response, ctx, flow.next, messages);
            break;
          }
          case BlockType.RECORD: {
            response = this.appendMessagesToResponse(response, messages);
            response.record({
              action: `${baseUrl}/twiml/${config.botId}/${flow.next}`,
              maxLength: 10,
              transcribe: false,
              recordingStatusCallback: `${baseUrl}/twiml/${config.botId}/${block.recordingCallback}`
            });
            break;
          }
          case BlockType.END: {
            this.appendMessagesToResponse(response, messages);
            response.hangup();
            break;
          }
          case BlockType.DEFAULT:
          default: {
            const nextUrl = `${baseUrl}/twiml/${config.botId}/${flow.next}`;
            this.appendMessagesToResponse(response, messages);
            response.redirect({ method: 'POST' }, nextUrl);
          }
        }

        return response;
      }

      case FlowType.GATHER: {
        const gather = response.gather({
          action: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
          method: 'POST',
          input: 'dtmf',
          numDigits: 1,
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

  private static async handlePlaybackBlock(botId: BotId, blockName: BlockId, response: any, ctx: CallContext, nextBlock: BlockId, messages: SayMessage[] | PlayMessage []) {
    //TODO: figure out how to make more type safe and more generic - eg a custom block definition, with a function for how to handle it defined elsewhere
    switch(blockName) {
      //this has a flow type of gather- breaking some weird stuff
      case(BlockId.listen_playback): {
        const gather = response.gather({
          action: `${baseUrl}/twiml/${botId}/gather/${blockName}?page=${ctx.page}\&pageSize=${ctx.pageSize}\&maxMessages=${ctx.maxMessages}`,
          method: 'POST',
          input: 'dtmf',
          numDigits: 1,
        });
        //TODO: figure out how to wrap this in a gather block!
        //TODO: fixme this repeats messages when page size > 1
        //Play all of the pre-recorded messages, then load all of the messages from firestore and play them.
        const recordings = await ctx.firebaseApi.getRecordings(ctx.maxMessages, botId);
        const totalCount = messages.length + recordings.length;
        const {page, pageSize} = ctx

        const allToPlay: any[] = messages;
        recordings.forEach(r => allToPlay.push(r));
        const toPlay = allToPlay.slice(page, page + pageSize);
        toPlay.forEach(message => {
          //Warning - not type safe :(
          //TODO: tidy this up
          if(message.type === MessageType.PLAY) {
            return gather.play({}, message.url);
          }

          if (message.type === MessageType.SAY) {
            return gather.say({language: message.language}, message.text);
          }

          console.log("ERROR in handlePlaybackBlock, bad message:", message);
        });

        let redirectUrl = buildPaginatedUrl(baseUrl, botId, blockName, page + 1, pageSize, ctx.maxMessages);
        if ((page * pageSize) > totalCount) {
          //We are out of messages, redirect to next block
          redirectUrl = `${baseUrl}/twiml/${botId}/${nextBlock}`;
        }

        //call back to this block.
        response.redirect({ method: 'POST' }, redirectUrl);
        break;
      }
      case (BlockId.record_playback): {
        // const recordings: Recording[] = [];
        const recordings: Recording[] = await ctx.firebaseApi.getPendingRecordingsWithRetries(botId, ctx.callSid, 1, 8, 100);
        if (recordings.length === 0) {
          //Try again
          //TODO: fix slow infinte loop here :(
          response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${botId}/${BlockId.record_delete}`);
          return response;
        }
        const recording = recordings[0];
      
        // response.say({}, 'You said:');
        response.play({}, recording.url);
        response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${botId}/${nextBlock}`);
      
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
          response.say({language: m.language}, m.text);
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
    config: BotConfig,
    currentBlock: BlockId,
    gatherResult: DigitResult): Promise<string> {
    //TODO: parse out the twilio response, and redirect to the appropriate block
    
    //TODO: make more generic - this isn't technically a GATHER block, so we shouldn't do this really.
    console.log("currentBlock", currentBlock);
    if (currentBlock === BlockId.listen_playback) {
      const response = new VoiceResponse();
      let nextPage

      switch (gatherResult.digits.trim()) {
        case '1': {
          //Skip
          nextPage = ctx.page + 1;
          break;
        }
        case '2': {
          //Repeat
          nextPage = ctx.page;
          break;
        }
      }

      const redirectUrl = buildPaginatedUrl(baseUrl, config.botId, BlockId.listen_playback, nextPage, ctx.pageSize, ctx.maxMessages);
      console.log("redirect url is:", redirectUrl);
      response.redirect({ method: 'POST' }, redirectUrl);
      return response.toString();
    }

    const flow = config.flows[currentBlock];

    if (flow.type !== FlowType.GATHER) {
      console.error(`gatherNextMessage tried to handle flow with type: ${flow.type}`);
      const response = new VoiceResponse();
      response.say({}, 'Sorry. Something went wrong. Please try again.');
      return response.toString();
    }

    //TODO: we will need to reformat this nicely soon. maybe have custom action handlers or something

    switch (currentBlock) {
      case BlockId.record_post_or_delete: {
        //Handle the case where user wants us to post the message!
        //Falls through to router
        if (gatherResult.digits.trim() === '1') {
          const pendingRecordings = await ctx.firebaseApi.getPendingRecordings(ctx.callSid, 1, config.botId);
          if (pendingRecordings.length === 1) {
            const recordingId = await ctx.firebaseApi.postRecording(pendingRecordings[0], config.botId);
            //TODO: make a logger class
            console.log(`LOG: {"action":"POST_MESSAGE", "recordingId":"${recordingId}"}`);

            log({
              type: LogType.POST_MESSAGE,
              recordingId,
              callSid: ctx.callSid,
              url: pendingRecordings[0].url,
            });
          }
        }
      }
    
      // Default implementation
      case BlockId.intro_0:
      case BlockId.listen_end:
      //TODO: handle the digits as well!
        {
          const validDigits = flow.digitMatches.map(d => d.digits);
          const idx = validDigits.indexOf(gatherResult.digits.trim());

          //No match found :(
          if (idx === -1) {
            //TODO: should this redirect instead?
            const errorResponse = await TwilioRouter.getBlock(ctx, config, flow.error);
            return errorResponse.toString();
          }

          const nextBlock = flow.digitMatches[idx].nextBlock;
          const response = new VoiceResponse();
          response.redirect({ method: 'POST' }, `${baseUrl}/twiml/${config.botId}/${nextBlock}`);

          return response.toString();
        }
      default: {
        console.log(`ERROR: gatherNextMessage not implemented for ${currentBlock}`)
        const response = new VoiceResponse();
        response.say({}, 'Sorry. There was a problem. Please try again.');
        return response.toString();
      }
    }
  }
}