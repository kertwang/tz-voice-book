import * as twilio from 'twilio';
import { twilioAccountSid, twilioAuthToken, twilioOutboundNumber } from '../utils/Env';
import { log } from '../utils/Log';
import { LogType } from '../types_rn/TwilioTypes';

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
   */
  async startCall(mobile: string, url: string): Promise<any> {
    const options = {
      url,
      to: mobile,
      from: twilioOutboundNumber,
    };

    log({
      type: LogType.TWILIO_API,
      method: 'client.calls.create',
      params: options,
    });


    return this.client.calls.create(options)
    .then((call: any) => process.stdout.write(call.sid));
  }
}