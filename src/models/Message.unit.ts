import assert from 'assert'

import Message from "./Message"
import botConfig from '../admin/content/rungweDeposit/index'
import { IMessage } from '../queries/message'


describe('Message', () => {

  describe('anyMessageToListOfIMessage', () => {
    it('converts an AnyMessage to a list of IMessages', () => {
      // Arrange
      const input = botConfig.en_text.messages
      const expected = [
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 0,
          type: 'SAY',
          text: 'Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing',
          language: 'en-US',
          versionId: "en_us"
        },
        { 
          botId: 'botA',
          messageId: 'entrypoint',
          index: 1,
          type: 'DYNAMIC_SAY',
          func: {
            type: 'function',
            arguments: 'params',
            body: '\n                return [{\n                        type: \'SAY\',\n                        text: params[0],\n                        language: \'en-US\'\n                    }];\n            ' 
          },
          versionId: "en_us",
        },
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 2,
          type: 'SAY',
          text: 'kg of green leaf at',
          language: 'en-US',
          versionId: "en_us"
        },
        { 
          botId: 'botA',
          messageId: 'entrypoint',
          index: 3,
          type: 'SAY',
          text: 'LOCATION.',
          language: 'en-US',
          versionId: "en_us"
        },
      ]

      // Act
      const result = Message.anyMessageToListOfIMessage(input, 'botA', 'en_us')
      
      // Assert
      assert.deepStrictEqual(result, expected)
    })
  })

  describe('fromIMessage', () => {
    it('converts from IMessage to AnyMessageType dict', () => {
      // Arrange
      const input: Array<IMessage> = [
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 0,
          type: 'SAY',
          text: 'Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing',
          language: 'en-US',
          versionId: 'en_us'
        },
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 1,
          type: 'DYNAMIC_SAY',
          func: {
            type: 'function',
            arguments: 'params',
            body: '\n                return [{\n                        type: \'SAY\',\n                        text: params[0],\n                        language: \'en-US\'\n                    }];\n            '
          },
          versionId: 'en_us'
        },
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 2,
          type: 'SAY',
          text: 'kg of green leaf at',
          language: 'en-US',
          versionId: 'en_us'
        },
        {
          botId: 'botA',
          messageId: 'entrypoint',
          index: 3,
          type: 'SAY',
          text: 'LOCATION.',
          language: 'en-US',
          versionId: 'en_us'
        }]
      
      // Act
      const result = Message.fromIMessageList(input)

      // Assert
      // We need to filter out the func to make sure the objects match exactly
      assert.deepStrictEqual(
        JSON.parse(JSON.stringify(result, null, 2)), 
        JSON.parse(JSON.stringify(botConfig.en_text.messages, null, 2))
      )
    })
  })
})