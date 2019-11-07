import { SomeResult, makeError, makeSuccess } from "../types_rn/AppProviderTypes";
import BotQueries from '../queries/bot'


//This is where we map between the model domain and application domain

export type TBot = {
  id: string,
  defaultVersionId: string,
  createdAt?: Date,
  updatedAt?: Date,
}

async function getBots(): Promise<SomeResult<Array<TBot>>> {
  let bots: Array<TBot> = []
  try {
    bots = await BotQueries.getAllBots()
  } catch (err) {
    return makeError(err)
  }

  return makeSuccess(bots)
}

async function getBotForId(botId: string): Promise<SomeResult<TBot>> {
  return BotQueries.getBotForId(botId)
}

async function createBot(bot: TBot | Array<TBot>, ignoreIfExists = false): Promise<SomeResult<Array<TBot>>> {
  if (!Array.isArray(bot)) {
    bot = [bot]
  }

  try {
    await BotQueries.createBots(bot, ignoreIfExists)
  } catch (err) {
    return makeError(err)
  } 

  return makeSuccess(bot)
}

async function updateBot(id: string, botPartial: any): Promise<SomeResult<any>> {
  return makeError('Not implemented')
}

async function deleteBot(id: string): Promise<SomeResult<null>> {
  try {
    await BotQueries.deleteBot(id)
  } catch (err) {
    return makeError(err)
  }

  return makeSuccess(null)
}

export default {
  createBot,
  getBots,
  getBotForId,
  updateBot,
  deleteBot
}