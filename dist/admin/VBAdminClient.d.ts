import { BotConfig } from "../types_rn/TwilioTypes";
import { SomeResult } from "../types_rn/AppProviderTypes";
export declare type TriggerCallRequest = {
    mobile: string;
    url: string;
    botId: string;
};
export declare type PostBotRequest = {
    botId: string;
    blockId: string;
    body: {
        From: string;
        To: string;
        Direction: string;
        Digits?: string;
    };
    versionOverride: string;
};
export default class VBAdminClient {
    static createContent(botConfig: BotConfig): Promise<SomeResult<void>>;
    static getHealth(): Promise<SomeResult<any>>;
    static triggerCall(req: TriggerCallRequest): Promise<SomeResult<void>>;
    static postTwiml(req: PostBotRequest): Promise<SomeResult<string>>;
    static getBotConfig(botId: string, versionId: string): Promise<SomeResult<BotConfig>>;
}
