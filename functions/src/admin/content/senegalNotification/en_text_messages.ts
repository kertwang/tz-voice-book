import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalNotificationMessageMap = {
  'entrypoint': [
    generateText('Hi, good news! '),
  ],
  'notification_0': [
    generateText("You’ve just received your quarterly Bourse Familiale payment.The amount is 25, 000 francs.You’ve just received a mobile money payment.The amount is twenty - five thousand, five - hundred francs.That’s two - five - five - zero - zero.That’s equivalent to two purple bills, one green bill, and one orange bill.TTo get your money just go to the nearest Orange agent with your National ID Card and tell them the amount that you'd like to withdraw. To get your money just go to the nearest Orange agent and tell them the amount that you’d like to withdraw."),
  ],
}

export default en_text;