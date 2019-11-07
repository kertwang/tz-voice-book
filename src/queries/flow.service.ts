import assert from 'assert'


import FlowQueries, { IFlow } from './flow'
import BotQueries from './bot'
import { FlowType } from '../types_rn/TwilioTypes'
import { unsafeUnwrap } from '../types_rn/AppProviderTypes'


describe('flow queries', () => {
  describe('createFlows', () => {
    beforeEach(async () => {
      await BotQueries.createBots([{ id: 'botA', defaultVersionId: 'en_au' }], true)
    })

    afterEach(async () => {
      await FlowQueries._truncate()
      await BotQueries._truncate()
    })

    it('creates a new flow', async () => {
      // Arrange
      const flows: Array<IFlow> = [
        { botId: 'botA', flowId: 'entrypoint', type: FlowType.DEFAULT, next: 'entrypoint'}
      ]
      
      // Act
      await FlowQueries.createFlows(flows, false)
      
      // Assert
    })

    it('fails to upsert on multiple rows of the same key', async () => {
      // Arrange
      const digitMatches = JSON.stringify([
        { digits: '1', nextBlock: 'amount_repeat' },
        { digits: '2', nextBlock: 'story_option' },
      ])

      const flows: Array<IFlow> = [
        { botId: 'botA', flowId: 'entrypoint', type: FlowType.DEFAULT, next: 'entrypoint' },
        { botId: 'botA', flowId: 'entrypoint', type: FlowType.GATHER, error: 'error_0', digitMatches},
      ]
      // First create a block, that will cause the next step to not upsert and fail
      unsafeUnwrap(await FlowQueries.createFlows([flows[0]], false))

      // Act
      const action = async () => unsafeUnwrap(await FlowQueries.createFlows(flows, true))

      // Assert 
      await assert.rejects(action)
    })

    it('performs an upsert when updating an existing block', async () => {
      // Arrange
      const digitMatches = JSON.stringify([
        { digits: '1', nextBlock: 'amount_repeat' },
        { digits: '2', nextBlock: 'story_option' },
      ])

      const flows1: Array<IFlow> = [
        { botId: 'botA', flowId: 'entrypoint1', type: FlowType.DEFAULT, next: 'entrypoint' },
        { botId: 'botA', flowId: 'entrypoint2', type: FlowType.GATHER, error: 'error_0', digitMatches },
      ]

      const flows2: Array<IFlow> = [
        { botId: 'botA', flowId: 'entrypoint1', type: FlowType.GATHER, error: 'error_0', digitMatches },
        { botId: 'botA', flowId: 'entrypoint2', type: FlowType.DEFAULT, next: 'entrypoint' },
      ]
      // First create a block, that will cause the next step to not upsert and fail
      unsafeUnwrap(await FlowQueries.createFlows(flows1, false))

      // Act
      unsafeUnwrap(await FlowQueries.createFlows(flows2, true))

      // Assert 
      const result = await FlowQueries.getFlowForBotIdAndFlowId('botA', 'entrypoint1')

      assert.equal(result[0].type, FlowType.GATHER)
      assert.equal(result[0].next, null)
    })
  })
})