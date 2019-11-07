import Sinon from 'sinon'
import assert from 'assert'

import { BotConfig } from "../types_rn/TwilioTypes";
import { unsafeUnwrap } from "../types_rn/AppProviderTypes";

import BotConfigModel from './BotConfigModel'
import TestUtil from "../utils/TestUtil";
import rungwePaymentNotification from '../admin/content/rungwePaymentNotification/index';
import AdminHandler from '../handlers/AdminHandler';

let sandbox: Sinon.SinonSandbox
describe('BotConfig', () => {
  describe('getBotConfigForBotIdAndVersionId', () => {

    before(async () => {
      sandbox = Sinon.createSandbox()
      //Override for testing purposes
      rungwePaymentNotification.en_text.botId = 'botA'
      const req = {
        params: { botId: 'botA' },
        body: rungwePaymentNotification.en_text
      }
      const res = { json: sandbox.mock() }

      await AdminHandler.postContent(req, res)
    })

    after(async () => {
      await TestUtil._truncateAll()
    })

    it('gets the bot config', async () => {
      // Arrange
      
      // Act
      const config: BotConfig = unsafeUnwrap(await BotConfigModel.getBotConfigForBotIdAndVersionId('botA', 'en_text'))
      
      // Assert
      // parse and stringify to easily remove the functions
      assert.deepStrictEqual(
        JSON.parse(JSON.stringify(config, null, 2)),
        JSON.parse(JSON.stringify(rungwePaymentNotification.en_text, null, 2))
      )      
    });
  });
})