import twilio from 'twilio';
import { twilioAccountSid, twilioAuthToken, twilioOutboundNumber } from '../utils/Env';
import { log } from '../utils/Log';
import { LogType } from '../types_rn/LogTypes';
import { BotId } from '../types_rn/TwilioTypes';
import { SomeResult, makeSuccess, makeError } from '../types_rn/AppProviderTypes';
import { CallListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/call';

export class TwilioApi {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(twilioAccountSid, twilioAuthToken);
  }

  getClient() {
    return this.client;
  }

  /**
   * @function startCall
   * @description Initiate a call to the given number
   * 
   */
  async startCall(botId: BotId, mobile: string, url: string): Promise<SomeResult<any>> {
    const options: CallListInstanceCreateOptions = {
      url,
      to: mobile,
      from: twilioOutboundNumber,
    };

    log({
      type: LogType.TWILIO_API_REQUEST,
      botId,
      method: 'client.calls.create',
      params: options,
    });

    return this.client.calls.create(options)
    .then(call => {
      log({
        type: LogType.TWILIO_API_RESPONSE,
        botId,
        method: 'client.calls.create',
        response: call,
      });

      return makeSuccess(call.sid);
    })
    .catch((err: any) => makeError(err));
  }
}