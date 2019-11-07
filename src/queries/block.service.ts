import assert from 'assert'

import { BlockType } from '../types_rn/TwilioTypes'
import BlockQueries, { IBlock } from './block'
import BotQueries from './bot'


describe('block queries', () => {
  describe('createBlocks', () => {
    beforeEach(async () => {
      await BotQueries.createBots([{ id: 'botA', defaultVersionId: 'en_au'}], true)
    })
    
    afterEach(async () => {
      await BlockQueries._truncate()
      await BotQueries._truncate()
    })

    it('creates a new block', async () => {
      // Arrange
      const blocks: Array<IBlock> = [
        { botId: 'botA', blockId: 'block1', type: BlockType.DEFAULT},
      ]

      // Act
      await BlockQueries.createBlocks(blocks, false)
      
      // Assert
      // Assume this didn't fail
    })

    it('fails to upsert on multiple rows of the same key', async () => {
      // Arrange
      const blocks: Array<IBlock> = [
        { botId: 'botA', blockId: 'block1', type: BlockType.DEFAULT },
        { botId: 'botA', blockId: 'block1', type: BlockType.END }
      ]
      
      // Act
      const action = async () => await BlockQueries.createBlocks(blocks, true)

      // Assert 
      await assert.rejects(action)
    })

    it('performs an upsert when updating an existing block', async () => {
      // Arrange
      const blocks1: Array<IBlock> = [
        { botId: 'botA', blockId: 'block1', type: BlockType.DEFAULT },
      ]

      const blocks2: Array<IBlock> = [
        { botId: 'botA', blockId: 'block1', type: BlockType.END },
        { botId: 'botA', blockId: 'block2', type: BlockType.END }
      ]

      // First create a block, that will cause the next step to not upsert and fail
      await BlockQueries.createBlocks([blocks1[0]], false)
      
      // Act
      await BlockQueries.createBlocks(blocks2, true)

      // Assert 
      const result = await BlockQueries.getBlockForBotIdAndBlockId('botA', 'block1')
      assert.equal(result[0].type, BlockType.END)
    })

    it('performs an upsert with only 1 row', async () => {
      // Arrange
      const blocks: Array<IBlock> = [
        { botId: 'botA', blockId: 'block1', type: BlockType.RECORD },
      ]

      // Act
      await BlockQueries.createBlocks(blocks, true)

      // Assert 
      const result = await BlockQueries.getBlockForBotIdAndBlockId('botA', 'block1')
      assert.equal(result[0].type, BlockType.RECORD)
    })
  })
})