import { unsafeUnwrap, makeSuccess } from "../types_rn/AppProviderTypes"
import Bot from '../models/Bot'
import assert from 'assert';

import BotQueries from '../queries/bot'


describe('Bot', () => {
  beforeEach(() => {
    //TODO: truncate the table
  })

  afterEach(async () => {
    await BotQueries._truncate()
  })

  describe('getBots', () => {
    it('returns an empty array when there are no bots', async () => {
      // Arrange
      const expected: Array<any> = []
      
      // Act
      const bots = unsafeUnwrap(await Bot.getBots())
      
      // Assert
      assert.deepStrictEqual(bots, expected)
    })

    it('returns a list of bots', async () => {
      // Arrange
      const bots = [
        { id: 'botA', defaultVersionId: 'en_au'},
        { id: 'botB', defaultVersionId: 'en_au'}
      ]
      await Bot.createBot(bots)

      // Act
      const rawResult = unsafeUnwrap(await Bot.getBots())
      //Strip out dates for testing
      const result = rawResult.map(b => {
        delete b.createdAt
        delete b.updatedAt

        return b
      })

      // Assert
      assert.deepStrictEqual(result, bots)
    })
  })

  describe('createBot', () => {
    it('creates a bot given a single instance', async () => {
      // Arrange
      // Act
      await Bot.createBot({ id: 'botA', defaultVersionId: 'en_au'})
      const result = unsafeUnwrap(await Bot.getBots())

      // Assert
      assert.equal(result[0].id, 'botA')
    })

    it('creates a bot given a list of bots', async () => {
      // Arrange
      // Act
      await Bot.createBot([{ id: 'botB', defaultVersionId: 'en_au' }, { id: 'botC', defaultVersionId: 'en_au'}])
      const result = unsafeUnwrap(await Bot.getBots())

      // Assert
      assert.equal(result.length, 2)
    })

    it('creates multiple bots with the same id without failing', async () => {
      // Arrange
      
      // Act
      const botIds = ['abc1', 'abc2']
      await botIds.reduce(async (acc: Promise<any>, curr: string) => {
        await acc
        return Bot.createBot({ id: curr, defaultVersionId: 'en_au'})
      }, Promise.resolve(makeSuccess([])))

      // Assert
    })
  })

})