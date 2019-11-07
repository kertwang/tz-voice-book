import twilio from 'twilio';
import { BotId } from '../types_rn/TwilioTypes';
import { SomeResult } from '../types_rn/AppProviderTypes';
export declare class TwilioApi {
    private client;
    constructor();
    getClient(): twilio.Twilio;
    /**
     * @function startCall
     * @description Initiate a call to the given number
     *
     */
    startCall(botId: BotId, mobile: string, url: string): Promise<SomeResult<any>>;
}
