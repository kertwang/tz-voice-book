import * as twilio from 'twilio';
import { twilioAccountSid, twilioAuthToken, twilioOutboundNumber } from '../utils/Env';
import { log } from '../utils/Log';
import { LogType } from '../types_rn/LogTypes';

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
   * TODO: for some reason using the async/await api doesn't
   * handle exceptions properly with Twilio.
   * We should move to the SomeResult pattern anyway
   */
  startCall(mobile: string, url: string): Promise<any> {
    const options = {
      url,
      to: mobile,
      from: twilioOutboundNumber,
      // from: 'client:VoiceBook'
    };

    log({
      type: LogType.TWILIO_API_REQUEST,
      method: 'client.calls.create',
      params: options,
    });


    return this.client.calls.create(options)
    .then((call: any) => {
      log({
        type: LogType.TWILIO_API_RESPONSE,
        method: 'client.calls.create',
        response: call,
      });

      return call.sid;
    });
  }
}