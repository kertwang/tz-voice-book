import { unsafeUnwrap } from '../types_rn/AppProviderTypes';
import Bot from '../models/Bot'
import Block, { TBlock } from '../models/Block'

import Flow, { TFlow } from '../models/Flow';
import Message from '../models/Message';
import { IMessage } from '../queries/message';
import { BotConfig } from '../types_rn/TwilioTypes';
import BotConfigModel from '../models/BotConfigModel';

export default class AdminHandler {

  public static async getContent(req: any, res: any) {
    const { botId, versionId } = req.params;
    const config = unsafeUnwrap(await BotConfigModel.getBotConfigForBotIdAndVersionId(botId, versionId)) 

    res.json(config)
  }

  public static async postContent(req: any, res: any) {
    const { botId } = req.params
    let { defaultVersionId } = req.params;
    if (!defaultVersionId) {
      defaultVersionId = 'en_au'
    }
    const botConfig: BotConfig = req.body

    console.log('creating botConfig', botConfig)

    unsafeUnwrap(await Bot.createBot({ id: botId, defaultVersionId}, true))

    const blocks: Array<TBlock> = Block.anyBlockMapToListOfTBlock(botConfig.blocks, botId)
    const flows: Array<TFlow> = Flow.anyFlowMapToListOfTFlow(botConfig.flows, botId)
    const messages: Array<IMessage> = Message.anyMessageToListOfIMessage(botConfig.messages, botId, botConfig.versionId)

    unsafeUnwrap(await Block.createBlock(blocks))
    unsafeUnwrap(await Flow.createFlow(flows))
    unsafeUnwrap(await Message.createMessage(messages))

    res.json(true)
  }
}