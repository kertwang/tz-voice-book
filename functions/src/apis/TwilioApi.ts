import twilio from 'twilio';
import { twilioAccountSid, twilioAuthToken, twilioOutboundNumber } from '../utils/Env';
import { log } from '../utils/Log';
import { LogType } from '../types_rn/LogTypes';
import { BotId } from '../types_rn/TwilioTypes';

export class TwilioApi {
  private client: any;

  constructor() {
    this.client = twilio(twilioAccountSid, twilioAuthToken);
  }

  getClient() {
    return this.client;
  }

  /**
   * startCall
   * 
   * Initiate a call to the given number
   * 
   * handle exceptions properly with Twilio.
   * We should move to the SomeResult pattern anyway
   */
  startCall(botId: BotId, mobile: string, url: string): Promise<any> {
    const options = {
      url,
      to: mobile,
      from: twilioOutboundNumber,
      // from: 'client:VoiceBook'
    };

    log({
      type: LogType.TWILIO_API_REQUEST,
      botId,
      method: 'client.calls.create',
      params: options,
    });


    return this.client.calls.create(options)
    .then((call: any) => {
      log({
        type: LogType.TWILIO_API_RESPONSE,
        botId,
        method: 'client.calls.create',
        response: call,
      });

      return call.sid;
    });
  }
}