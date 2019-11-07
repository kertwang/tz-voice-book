// import util from 'util'

import { FlowType } from "../types_rn/TwilioTypes";
import db from "../service/db";
// import { getFieldsIfExist } from '../utils';
import { makeSuccess, makeError, SomeResult } from '../types_rn/AppProviderTypes';

const table = 'flow'
// A block is a represenation of a single component of an IVR message

/* remember: this is in the `model` domain, not application domain */
export interface IFlow {
  botId: string,
  flowId: string,
  type: FlowType,
  next?: string,
  digitMatches?: string, //JSON string
  error?: string,
  createdAt?: Date,
  updatedAt?: Date
}


async function getAllFlows() {
  return db(table)
    .select('*')
}

async function getFlowsForBotId(botId: string): Promise<SomeResult<Array<IFlow>>> {
  return db<IFlow>(table)
    .where({
      botId
    })
    .select('*')
    .then(r => makeSuccess(r))
    .catch(err => makeError<Array<IFlow>>(err))
}

async function getFlowForBotIdAndFlowId(botId: string, flowId: string) {
  return db<IFlow>(table)
    .where({
      botId,
      flowId
    })
    .select('*')
}

async function createFlows(flows: Array<IFlow>, upsert: boolean): Promise<SomeResult<any>> {
  if (!upsert) {
    return db(table)
      .insert(flows)
      .then(() => makeSuccess(undefined))
      .catch(err => makeError(err))
  }

  const insert = db(table)
    .insert(flows)
    .toString()

  const query = `
   ${insert}
    ON CONFLICT ("bot_id", "flow_id") DO UPDATE
    SET 
      type = excluded.type, 
      next = excluded.next, 
      digit_matches = excluded.digit_matches, 
      error = excluded.error;
  `

  return db.raw(query)
    .then(() => makeSuccess(undefined))
    .catch(err => makeError(err))
}

/* FOR TESTING ONLY */
async function _truncate() {
  // return db('bot').truncate()

  return db.raw('TRUNCATE TABLE flow CASCADE')
}


export default {
  createFlows,
  getAllFlows,
  getFlowsForBotId,
  getFlowForBotIdAndFlowId,
  _truncate
}