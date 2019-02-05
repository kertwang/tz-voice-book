import { FlowType, BlockId, RungweGenericFlowMap } from "../../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: RungweGenericFlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.stop,
  },
  'stop': {
    //TODO: how do we make this default to end?
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      //I'm pretty sure the first option is the default.
      { digits: '1', nextBlock: BlockId.end },
      { digits: '2', nextBlock: BlockId.end },
      { digits: '3', nextBlock: BlockId.stop_confirm },
    ],
  },
  'stop_confirm': {
    //This will terminate.
    type: FlowType.DEFAULT,
    next: BlockId.entrypoint,
  },
  'end': {
    //This will terminate.
    type: FlowType.DEFAULT,
    next: BlockId.entrypoint,
  }
}

export default TwilioFlows;