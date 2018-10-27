import { FlowMap, FlowType, BlockId, AnyFlowMap, SenegalNotificationFlowMap, SenegalMobileMoneyFlowMap } from "../../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: SenegalMobileMoneyFlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.notification_0,
  },
  // TODO: Not sure how to end the call...
  'notification_0': {
    type: FlowType.DEFAULT,
    next: BlockId.entrypoint,
  },
}

export default TwilioFlows;