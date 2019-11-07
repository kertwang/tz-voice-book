import assert from 'assert'
import Sinon from 'sinon'

import TestUtil from '../utils/TestUtil'
import TwimlHandler from './TwimlHandler'

let sandbox: Sinon.SinonSandbox
describe('TwimlHandler', () => {
  before(async () => {
    sandbox = Sinon.createSandbox()
  })

  afterEach(async () => {
    sandbox.restore()

    //Clear the database
    await TestUtil._truncateAll()
  })

  describe('postGather', () => {
    beforeEach(async () => {
      await TestUtil.createDemoContent()
    })

    it('handles a simple gather', async () => {
      // Arrange
      const baseUrl = 'http://localhost:3000'
      const req = {
        params: {
          botId: 'botA',
        },
        path: `${baseUrl}/twiml/botA/entrypoint_option`,
        body: {
          From: '+61555666777',
          To: '+1655111222',
          Direction: 'outbound-api',
          Digits: '0'
        },
        query: {
          page: 0,
          pageSize: 1,
          maxMessages: 3,
          // versionOverride:'en_au' //TODO: another test with versionOverride
        }
      }
      const res = {
        end: sandbox.mock(),
        writeHead: sandbox.mock()
      }

      //Very specific to the demo content
      const expected = [
        '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">http://localhost:3000/twiml/botA/amount_repeat</Redirect></Response>'
      ]

      // Act
      await TwimlHandler.postGather(req, res)

      // Assert
      assert(res.writeHead.calledOnce)
      assert(res.end.calledOnce)

      const calledWith = res.end.getCall(0).args
      assert.deepStrictEqual(calledWith, expected)
    })
  })

  describe('postBot', () => {
    beforeEach(async () => {
      await TestUtil.createDemoContent()
    })

    it('handles the entrypoint message', async () => {
      // Arrange
      const baseUrl = 'http://localhost:3000'
      const req = {
        params: {
          botId: 'botA',
        },
        path: `${baseUrl}/twiml/botA/entrypoint`,
        body: {
          From: '+61555666777',
          To: '+1655111222',
          Direction: 'outbound-api'
        },
        query: {
          page: 0,
          pageSize: 1,
          maxMessages: 3,
          // versionOverride:'en_au' //TODO: another test with versionOverride
        }
      }
      const res = { 
        end: sandbox.mock(),
        writeHead: sandbox.mock()
      }
      
      // Act
      await TwimlHandler.postBot(req, res)
      
      // Assert
      assert(res.writeHead.calledOnce)
      assert(res.end.calledOnce)
    })

    it('returns a 404 when blockId could not be found');
    it('returns a 404 when blockId is missing from Config.messages');
  })
})