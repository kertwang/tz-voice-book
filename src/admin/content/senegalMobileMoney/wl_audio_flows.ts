import { FlowType, BlockId, SenegalMobileMoneyFlowMap } from "../../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: SenegalMobileMoneyFlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.entrypoint_option,
  },
  'entrypoint_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.amount_repeat },
      { digits: '2', nextBlock: BlockId.story_option },
    ],
  },
  'amount_repeat': {
    type: FlowType.DEFAULT,
    next: BlockId.story_option,
  },
  'story_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '0', nextBlock: BlockId.error_0 },
      { digits: '1', nextBlock: BlockId.story_1_intro },
      { digits: '2', nextBlock: BlockId.story_2_intro },
      { digits: '3', nextBlock: BlockId.story_3_intro },
    ],
  },
  'story_1_intro': {
    type: FlowType.DEFAULT,
    next: BlockId.story_1_intro_option,
  },
  'story_1_intro_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_1_pin_advice },
      { digits: '2', nextBlock: BlockId.story_1_guess },
    ],
  },
  'story_1_pin_advice': {
    type: FlowType.DEFAULT,
    next: BlockId.story_1_pin_option,
  },
  'story_1_pin_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_1_customer },
      { digits: '2', nextBlock: BlockId.story_1_guess },
    ],
  },
  'story_1_guess': {
    type: FlowType.DEFAULT,
    next: BlockId.story_1_guess_option,
  },
  'story_1_guess_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_1_customer },
      { digits: '2', nextBlock: BlockId.story_1_end },
    ],
  },
  'story_1_customer': {
    type: FlowType.DEFAULT,
    next: BlockId.story_1_customer_option_2,
  },
  'story_1_customer_option_2': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_1_end },
    ],
  },
  'story_1_end': {
    type: FlowType.DEFAULT,
    next: BlockId.story_1_next,
  },
  'story_1_next': {
    type: FlowType.DEFAULT,
    next: BlockId.story_option,
  },
  'story_2_intro': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_intro_option,
  },
  'story_2_intro_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_2_explain },
      { digits: '2', nextBlock: BlockId.story_2_send_explain },
    ],
  },
  'story_2_explain': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_explain_option,
  },
  'story_2_explain_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      //m10
      { digits: '1', nextBlock: BlockId.story_2_customer_care },
      //m5
      { digits: '2', nextBlock: BlockId.story_2_send_no_agent },
    ],
  },
  'story_2_customer_care': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_send_money,
  },
  'story_2_send_no_agent': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_send_agent_option,
  },
  'story_2_send_money': {
    //M11
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_2_send_no_agent },
    ],
  },
  'story_2_send_agent_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_2_send_explain_2 },
    ],
  },
  'story_2_send_explain': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_send_explain_option,
  },
  'story_2_send_explain_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_2_customer_care },
      { digits: '2', nextBlock: BlockId.story_2_send_no_agent },
    ],
  },
  'story_2_send_explain_2': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_send_explain_2_option,
  },
  'story_2_send_explain_2_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_2_end },
    ],
  },
  'story_2_end': {
    type: FlowType.DEFAULT,
    next: BlockId.story_2_next,
  },
  'story_2_next': {
    type: FlowType.DEFAULT,
    next: BlockId.story_option,
  },
  'story_3_intro': {
    type: FlowType.DEFAULT,
    next: BlockId.story_3_intro_option,
  },
  'story_3_intro_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_3_decision },
      { digits: '2', nextBlock: BlockId.story_3_end },
    ],
  },
  'story_3_decision': {
    type: FlowType.DEFAULT,
    next: BlockId.story_3_decision_option,
  },
  'story_3_decision_option': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    digitMatches: [
      { digits: '1', nextBlock: BlockId.story_3_end },
    ],
  },
  'story_3_end': {
    type: FlowType.DEFAULT,
    next: BlockId.story_option,
  },
  'error_0': {
    type: FlowType.DEFAULT,
    //This won't get triggered
    next: BlockId.story_option
  }
}

export default TwilioFlows;