import { FlowMap, FlowType, BlockId, AnyFlowMap, SenegalNotificationFlowMap } from "../../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: SenegalNotificationFlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  },
  // TODO: Not sure how to end the call...
  'notification_0': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  },
}

export default TwilioFlows;