// import util from 'util'

import { BlockType } from "../types_rn/TwilioTypes";
import db from "../service/db";
import { makeSuccess, SomeResult, makeError } from "../types_rn/AppProviderTypes";

const table = 'block'
// A block is a represenation of a single component of an IVR message

/* remember: this is in the `model` domain, not application domain */
export interface IBlock {
  botId: string,
  blockId: string,
  type: BlockType,
  createdAt?: Date,
  updatedAt?: Date
}

async function getAllBlocks() {
  return db(table)
    .select('*')
}

async function getBlocksForBotId(botId: string): Promise<SomeResult<Array<IBlock>>> {
  return db<IBlock>(table)
    .where({
      botId
    })
    .select('*')
    .then(blocks => makeSuccess(blocks))
    .catch(err => makeError<Array<IBlock>>(err))
}

async function getBlockForBotIdAndBlockId(botId: string, blockId: string) {
  return db<IBlock>(table)
    .where({
      botId,
      blockId,
    })
    .select('*')
}

async function createBlocks(blocks: Array<IBlock>, upsert: boolean) {
  if (!upsert) {
    return db(table)
    .insert(blocks)
  }

  const insert = db(table)
    .insert(blocks)
    .toString()

  const query = `
    ${insert}
    ON CONFLICT ("bot_id", "block_id") DO UPDATE
    SET type = excluded.type;   
  `

  return db.raw(query)
}

/* FOR TESTING ONLY */
async function _truncate() {
  return db.raw('TRUNCATE TABLE block CASCADE')
}

export default {
  createBlocks,
  getAllBlocks,
  getBlocksForBotId,
  getBlockForBotIdAndBlockId,
  _truncate
}