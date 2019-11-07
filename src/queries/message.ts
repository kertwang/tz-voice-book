import { TwilioSayLanguage } from "../types_rn/TwilioTypes";
import db from "../service/db";
import { SomeResult, makeSuccess, makeError } from "../types_rn/AppProviderTypes";
import { as } from "../utils";

const tableName = 'message'
// A block is a represenation of a single component of an IVR message

/* remember: this is in the `model` domain, not application domain */
export interface IMessage {
  botId: string,
  messageId: string,
  index: number,
  type: string,
  versionId: string, //e.g. en_text, en_audio etc.
  text?: string,
  language?: TwilioSayLanguage,
  url?: string,
  func?: any, //a function turned into a string
  createdAt?: Date,
  updatedAt?: Date
}

async function getAllMessages() {
  return db<IMessage>(tableName)
    .select('*')
}

async function getMessagesForBotIdAndVersionId(botId: string, versionId: string) {
  return db<IMessage>(tableName)
    .where({
      botId,
      versionId
    })
    .select('*')
}

async function createMessage(message: Array<IMessage>): Promise<SomeResult<Array<IMessage>>> {
  return db<IMessage>(tableName)
    .insert(message)
    .returning('*')
    .then(r => makeSuccess<Array<IMessage>>(as<Array<Partial<IMessage>>, Array<IMessage>>(r)))
    .catch(err => makeError<Array<IMessage>>(err))
}

/* FOR TESTING ONLY */
async function _truncate() {
  return db.raw('TRUNCATE TABLE message CASCADE')
}

export default {
  createMessage,
  getAllMessages,
  getMessagesForBotIdAndVersionId,
  _truncate
}