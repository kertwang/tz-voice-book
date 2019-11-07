import assert from 'assert'
import Sinon from 'sinon'

import TwimlHandler from './TwimlHandler'
import { TwilioApi } from "../apis/TwilioApi";
import { makeSuccess, makeError } from '../types_rn/AppProviderTypes';


let sandbox: Sinon.SinonSandbox
describe('TwimlHandler', () => {
  before(async () => {
    sandbox = Sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('postTriggerCall', () => {
    it('triggers a call', async () => {
      // Arrange
      sandbox.stub(TwilioApi.prototype, 'startCall').resolves(makeSuccess('12345'))
      const req = {
        body: {
          mobile: "+61411222333",
          url: "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
          botId: "senegalNotification",
        }
      }

      const res = {
        json: sandbox.mock(),
      }
      const expected = ['12345']

      // Act
      await TwimlHandler.postTriggerCall(req, res)

      // Assert
      const calledWith = res.json.getCall(0).args
      assert.deepStrictEqual(calledWith, expected)
    })

    it('handles an error when twilio api fails', async () => {
      // Arrange
      sandbox.stub(TwilioApi.prototype, 'startCall').resolves(makeError('Error starting call'))
      const req = {
        body: {
          mobile: "+61411222333",
          url: "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
          botId: "senegalNotification",
        }
      }

      const res = {
        json: sandbox.mock(),
      }

      // Act
      const action = async () => await TwimlHandler.postTriggerCall(req, res)

      // Assert
      await assert.rejects(action)
    })
  })
})