import assert from 'assert'

import AdminHandler from "./AdminHandler"
import Sinon from 'sinon'

import rungwePaymentNotification from '../admin/content/rungwePaymentNotification/index';
import TestUtil from '../utils/TestUtil'


let sandbox: Sinon.SinonSandbox
describe('AdminHandler', () => {
  before(() => {
    sandbox = Sinon.createSandbox()
  })

  afterEach(async () => {
    sandbox.restore()
    
    //Clear the database
    await TestUtil._truncateAll()
  })

  describe('postContent', () => {
    it('creates the necessary content', async () => {
      // Arrange
      // TODO: be more strict here
      const req = {
        params: { botId: 'botA'},
        body: rungwePaymentNotification.en_text
      }
      const res = {json: sandbox.mock()}
      
      // Act
      await AdminHandler.postContent(req, res)
      
      // Assert
      assert(res.json.calledOnce)
    })
  })
})