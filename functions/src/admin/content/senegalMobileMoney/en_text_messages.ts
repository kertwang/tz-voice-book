import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap, SenegalMobileMoneyMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";


/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalMobileMoneyMessageMap = {
  entrypoint: [
    //W1
    generateText("W1"),
  ],
  entrypoint_option: [
    //W2
    generateText("W2"),
  ],
  amount_repeat: [
    //W3
    generateText("W3"),

    //W4
    generateText("W4"),
  ],
  story_option: [
    //W5
    generateText("W5"),
  ],
  story_1_intro: [
    //W8
    generateText("W8"),
  ],
  story_1_intro_option: [
    //W9
    generateText("W9"),
  ],
  story_1_pin_advice: [
    //W10
    generateText("W10")
  ],
  story_1_pin_option: [
    //W11
    generateText("W11"),
  ],
  story_1_guess: [
    //M1
    generateText("M1"),
  ],
  story_1_guess_option: [
    //M2
    generateText("M2"),
  ],
  story_1_customer: [
    //W12
    generateText("W12"),
  ],
  story_1_customer_option_2: [
    //W13
    generateText("W13"),
  ],
  story_1_end: [
    //W14
    generateText("W14"),
  ],
  story_1_next: [
    //W6
    generateText("W6"),
  ],
  story_2_intro: [
    //M3
    generateText("M3"),
  ],
  story_2_intro_option: [
    //M4
    generateText("M4"),
  ],
  story_2_explain: [
    //M8
    generateText("M8"),
  ],
  story_2_explain_option: [
    //M9
    generateText("M9"),
  ],
  story_2_customer_care: [
    //M10
    generateText("M10"),
  ],
  story_2_send_no_agent: [
    //M5
    generateText("M5"),
  ],
  story_2_send_money: [
    //M11
    generateText("M11"),
  ],
  story_2_send_agent_option: [
    //M6
    generateText("M6"),
  ],
  story_2_send_explain: [
    //M8
    generateText("M8"),
  ],
  story_2_send_explain_option: [
    //M9 
    generateText("M9"),
  ],
  story_2_send_explain_2: [
    //M12
    generateText("M12"),
  ],
  story_2_send_explain_2_option: [
    //M13
    generateText("M13"),
  ],
  story_2_end: [
    //M7
    generateText("M7"),
  ],
  story_2_next: [
    //W6
    generateText("W6"),
  ],
  story_3_intro: [
    //W15
    generateText("W15"),
  ],
  story_3_intro_option: [
    //W16
    generateText("W16"),
  ],
  story_3_decision: [
    //W17
    generateText("W17"),
  ],
  story_3_decision_option: [
    //W18
    generateText("W18"),
  ],
  story_3_end: [
    //W19
    generateText("W19"),
  ],

}

export default en_text;