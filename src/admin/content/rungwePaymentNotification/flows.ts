import { FlowType, BlockId, RungweGenericFlowMap } from "../../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: RungweGenericFlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.end,
  },
  'end': {
    //This will terminate.
    type: FlowType.DEFAULT,
    next: BlockId.entrypoint,
  }
}

export default TwilioFlows;