
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
}