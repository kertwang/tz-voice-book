import * as twilio from 'twilio';
import { twilioAccountSid, twilioAuthToken } from '../utils/Env';

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
      //Figure out the url we want to trigger
      url,
      to: mobile,
      // from: '+61282947835', //This must be twilio number
      from: '+18442526460',
    };
    return this.client.calls.create(options)
    .then((call: any) => process.stdout.write(call.sid));
  }
}