import { BlockType, SenegalMobileMoneyBlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: SenegalMobileMoneyBlockMap = {
  'entrypoint': { type: BlockType.DEFAULT},
  'story_1_intro_option': { type: BlockType.DEFAULT},
  'story_1_pin_advice': { type: BlockType.DEFAULT},
  'story_1_pin_option': { type: BlockType.DEFAULT},
  'story_1_guess': { type: BlockType.DEFAULT},
  'story_1_guess_option': { type: BlockType.DEFAULT},
  'story_1_customer': { type: BlockType.DEFAULT},
  'story_1_customer_option_2': { type: BlockType.DEFAULT},
  'story_1_end': { type: BlockType.DEFAULT},
  'story_1_next': { type: BlockType.DEFAULT},
  'story_2_intro' : { type: BlockType.DEFAULT},
  'story_2_intro_option' : { type: BlockType.DEFAULT},
  'story_2_explain' : { type: BlockType.DEFAULT},
  'story_2_explain_option' : { type: BlockType.DEFAULT},
  'story_2_customer_care' : { type: BlockType.DEFAULT},
  'story_2_send_no_agent' : { type: BlockType.DEFAULT},
  'story_2_send_agent_option' : { type: BlockType.DEFAULT},
  'story_2_send_explain' : { type: BlockType.DEFAULT},
  'story_2_send_explain_option' : { type: BlockType.DEFAULT},
  'story_2_send_explain_2' : { type: BlockType.DEFAULT},
  'story_2_end' : { type: BlockType.DEFAULT},
  'story_2_next' : { type: BlockType.DEFAULT},
  'story_3_intro' : { type: BlockType.DEFAULT},
  'story_3_intro_option' : { type: BlockType.DEFAULT},
  'story_3_decision' : { type: BlockType.DEFAULT},
  'story_3_decision_option' : { type: BlockType.DEFAULT},
  'story_3_end' : { type: BlockType.END},
}

export default TwilioBlocks;