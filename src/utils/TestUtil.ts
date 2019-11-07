
import config from '../admin/content/senegalMobileMoney/index'

import BlockQueries from '../queries/block'
import BotQueries from '../queries/bot'
import FlowQueries from '../queries/flow'
import MessageQueries from '../queries/message'
import UserQueries from '../queries/user'
import AdminHandler from '../handlers/AdminHandler';

export default class TestUtil {

  public static async createDemoContent() {
    const req = {
      params: { botId: 'botA', defaultVersionId: 'en_text' },
      body: config.en_text
    }
    const res = { json: () => {} }

    await AdminHandler.postContent(req, res)
  }

  /**
   * @description Truncate all of the tables. USE ONLY IN TEST
   */
  public static async _truncateAll() {
    await BlockQueries._truncate()
    await BotQueries._truncate()
    await FlowQueries._truncate()
    await MessageQueries._truncate()
    await UserQueries._truncate()
  }

}