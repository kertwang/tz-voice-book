import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap, SenegalMobileMoneyMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalMobileMoneyMessageMap = {
  'entrypoint': [
    generateText('Hello. This is an automated notification.'),
  ],
  'notification_0': [
    generateText('You have recieved some money.'),
  ],
}

export default en_text;