import { BotId } from '../types_rn/TwilioTypes';
export declare class TwilioApi {
    private client;
    constructor();
    getClient(): any;
    /**
     * startCall
     *
     * Initiate a call to the given number
     *
     * handle exceptions properly with Twilio.
     * We should move to the SomeResult pattern anyway
     */
    startCall(botId: BotId, mobile: string, url: string): Promise<any>;
}
