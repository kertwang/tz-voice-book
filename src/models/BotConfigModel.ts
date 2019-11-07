import { SomeResult, ResultType, makeSuccess } from "../types_rn/AppProviderTypes";
import { BotConfig } from "../types_rn/TwilioTypes";
import Bot from "./Bot";
import Block from "./Block";
import Flow from "./Flow";
import Message from "./Message";


async function getBotConfigForBotIdAndVersionId(botId: string, versionId: string): Promise<SomeResult<BotConfig>> {
  const botResult = await Bot.getBotForId(botId);

  if (botResult.type === ResultType.ERROR) {
    return botResult;
  }

  const blockResult = await Block.getBlockMapForBotId(botId)
  const flowResult  = await Flow.getFlowsForBotId(botId)
  const messageResult = await Message.getMessagesForBotIdAndVersionId(botId, versionId)

  if (blockResult.type === ResultType.ERROR) {
    return blockResult
  }
  if (flowResult.type === ResultType.ERROR) {
    return flowResult
  }
  if (messageResult.type === ResultType.ERROR) {
    return messageResult
  }

  const config: BotConfig = {
    botId,
    versionId,
    blocks: blockResult.result,
    flows: flowResult.result,
    messages: messageResult.result,
  }

  return makeSuccess(config)
}

export default {
  getBotConfigForBotIdAndVersionId
}