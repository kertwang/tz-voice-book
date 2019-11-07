import { SomeResult } from "../types_rn/AppProviderTypes";
import { BotConfig } from "../types_rn/TwilioTypes";
declare function getBotConfigForBotIdAndVersionId(botId: string, versionId: string): Promise<SomeResult<BotConfig>>;
declare const _default: {
    getBotConfigForBotIdAndVersionId: typeof getBotConfigForBotIdAndVersionId;
};
export default _default;
