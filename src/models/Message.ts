import MessageQueries, { IMessage } from '../queries/message'
import { SomeResult, makeError, makeSuccess } from '../types_rn/AppProviderTypes';
import { AnyMessageType, MessageType, AnyMessageMap } from '../types_rn/TwilioTypes';
import { unique, functionReviver, functionReplacer } from '../utils';

function anyMessageToListOfIMessage(input: AnyMessageMap, botId: string, versionId: string): Array<IMessage> {
  const messageList: Array<IMessage> = []
  Object.keys(input).forEach(messageId => {
    const messages: Array<AnyMessageType> = input[messageId]
    messages.forEach((message, index) => {
      let specificFields = {}
      switch (message.type) {
        case (MessageType.SAY):
          specificFields = {
            text: message.text,
            language: message.language,
          }
          break;
        case (MessageType.PLAY):
          specificFields = {
            url: message.url,
          }
          break;
        case (MessageType.DYNAMIC_PLAY):
        case (MessageType.DYNAMIC_SAY):
          specificFields = {
            func: functionReplacer(null, message.func)
          }
          break;
      }

      const iMessage: IMessage = {
        botId,
        messageId,
        index,
        versionId,
        type: message.type,
        ...specificFields
      }

      messageList.push(iMessage)
    })
  })

  return messageList;
}

async function createMessage(message: IMessage | Array<IMessage>): Promise<SomeResult<Array<IMessage>>> {
  if (!Array.isArray(message)) {
    message = [message]
  }

  return MessageQueries.createMessage(message)
}


/**
 * @function fromIMessage
 * @description Map from a flattened IMessage to an AnyMessageType
 */
function fromIMessage(im: IMessage): AnyMessageType {
  switch (im.type) {
    case (MessageType.SAY):
      return {
        type: MessageType.SAY,
        text: im.text!,
        language: im.language!,
      }
    case (MessageType.PLAY):
      return {
        type: MessageType.PLAY,
        url: im.url!
      }

    case (MessageType.DYNAMIC_PLAY):
      return {
        type: MessageType.DYNAMIC_PLAY,
        func: functionReviver(null, im.func)
      }
    case (MessageType.DYNAMIC_SAY):
      return {
        type: MessageType.DYNAMIC_SAY,
        func: functionReviver(null, im.func)
      }
    default: {
      throw new Error(`Non Exhausive match on IMessage.type: ${im.type}`)
    }
  }
}


/**
 * @function fromIMessageList
 * @description Map from a flattened IMessageList to an AnyMessageMap
 */
function fromIMessageList(messages: Array<IMessage>): AnyMessageMap {
  const messageMap: AnyMessageMap = {
    //By default, but in the `end` message map, as it is mandatory
    end: []
  }

  //Prefill map with empty arrays
  unique(messages.map(im => im.messageId)).forEach(messageId => messageMap[messageId] = [])
  messages.forEach(im => {
    let anyMessage: AnyMessageType = fromIMessage(im)
    const messageList = messageMap[im.messageId]
    messageList.push(anyMessage)

    //TODO: will order be maintained?
    messageMap[im.messageId] = messageList
  })

  return messageMap;
}

/**
 * @function getMessagesForBotId
 * @description Get the MessageMap object given a BotId
 */
async function getMessagesForBotIdAndVersionId(botId: string, versionId: string): Promise<SomeResult<AnyMessageMap>> {
  let messages: Array<IMessage> = []
  try {
    messages = await MessageQueries.getMessagesForBotIdAndVersionId(botId, versionId)
  } catch (err) {
    return makeError(err)
  }

  if (messages.length === 0) {
    return makeError(`No messages found for BotId ${botId} and VersionId:${versionId}`)
  }

  //Hydrate AnyMessageMaps from IMessage
  const messageMap: AnyMessageMap = fromIMessageList(messages)

  return makeSuccess(messageMap);
}

export default {
  anyMessageToListOfIMessage,
  createMessage,
  fromIMessage,
  fromIMessageList,
  getMessagesForBotIdAndVersionId
}