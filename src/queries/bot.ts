import db from "../service/db";
import { SomeResult, makeError, makeSuccess } from "../types_rn/AppProviderTypes";

const table = 'bot'

// A block is a represenation of a single component of an IVR message

/* remember: this is in the `model` domain, not application domain */
export interface IBot {
  id: string,
  defaultVersionId: string,
  createdAt?: Date,
  updatedAt?: Date
}

export type UpsertParams = {
  table: string,
  object: any,
  constraint: any
}

async function getAllBots() {
  return db<IBot>(table)
    .select('*')
}

async function getBotForId(id: string): Promise<SomeResult<IBot>> {
  return db<IBot>(table)
    .where({
      id
    })
    .select('*')
    .then(bots => {
      if (bots.length === 0) {
        throw new Error(`Could not find bot for id: ${id}`)
      }

      //We can assume there won't be more than 1 bot thanks to the database
      return makeSuccess(bots[0])
    })
    .catch(err => makeError<IBot>(err))
}

async function createBots(bots: Array<IBot>, ignoreIfExists: boolean) {
  //knex has no ignore feature, so we just have to do it manually
  //TODO: revamp this with other upsert example
  if (ignoreIfExists) {
    const botsDict: {[index:string]: IBot} = {}
    bots.forEach(b => botsDict[b.id] = b)

    const existingBots = await getAllBots()
    existingBots.map(b => b.id).forEach(botId => delete botsDict[botId])

    bots = Object.keys(botsDict).map(botId => botsDict[botId])
  }

  try {
    await db.insert(bots)
    .into(table)
  } catch (err) {
    if (ignoreIfExists) {
      console.log("warning: ignoring Error in createBots")
      return;
    }

    throw err
  }
}

async function patchBot(id: string, bot: IBot) {
  return db('bot')
    .where({id})
    .update(bot)
}

async function deleteBot(id: string) {
  return db('bot')
    .where({id})
    .delete()
}

/* FOR TESTING ONLY */
async function _truncate() {
  return db.raw('TRUNCATE TABLE bot, block CASCADE')
}

export default {
  createBots,
  deleteBot,
  getAllBots,
  getBotForId,
  patchBot,
  _truncate,
}