import { BlockType, AnyBlockMap, AnyBlock } from "../types_rn/TwilioTypes";
import { makeError, SomeResult, makeSuccess, ResultType } from "../types_rn/AppProviderTypes";
import BlockQueries from '../queries/block'

//This is where we map between the model domain and application domain

export type TBlock = {
  botId: string,
  blockId: string,
  type: BlockType,
}


async function getBlocks(): Promise<SomeResult<Array<TBlock>>> {
  return makeError('not implemented')
}

async function getBlockMapForBotId(botId: string): Promise<SomeResult<AnyBlockMap>> {
  const blockResult = await BlockQueries.getBlocksForBotId(botId);
  if (blockResult.type === ResultType.ERROR) {
    return blockResult;
  }

  const rawBlocks = blockResult.result;
  const blockMap: AnyBlockMap = tBlockListToAnyBlockMap(rawBlocks)
  return makeSuccess(blockMap)
}

async function createBlock(block: TBlock | Array<TBlock>): Promise<SomeResult<Array<TBlock>>> {
  if (!Array.isArray(block)) {
    block = [block]
  }

  try {
    await BlockQueries.createBlocks(block, true)
  } catch (err) {
    return makeError(err)
  }

  return makeSuccess(block)
}

/**
 * convert an AnyBlockMap into a list of TBlocks for
 * the database to handle
 */
function anyBlockMapToListOfTBlock(input: AnyBlockMap, botId: string): Array<TBlock> {
  const blockList: Array<TBlock> = []
  Object.keys(input).forEach(blockId => {
    const anyBlock: AnyBlock = input[blockId]
    const block: TBlock = {
      botId,
      blockId,
      type: anyBlock.type
    }
    blockList.push(block)
  })

  return blockList
}

function tBlockListToAnyBlockMap(input: Array<TBlock>): AnyBlockMap { 
  const blockMap: AnyBlockMap = {}

  input.forEach(inputBlock => {
    blockMap[inputBlock.blockId] = tBlockToAnyBlock(inputBlock)
  })

  return blockMap;
}

function tBlockToAnyBlock(input: TBlock): AnyBlock {
  //TODO: make this type stricter
  const output: any = {
    type: input.type
  }
  
  return output
}

export default {
  anyBlockMapToListOfTBlock,
  createBlock,
  getBlocks,
  getBlockMapForBotId
}