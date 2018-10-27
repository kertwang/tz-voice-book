import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap } from "../../../types_rn/TwilioTypes";

const generateText = (text): SayMessage => {
  return {
    type: MessageType.SAY,
    text,
    language: 'en-AU' 
  }
}

/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalNotificationMessageMap = {
  'entrypoint': [
    generateText('Hello. This is an automated notification.'),
  ],
  'notification_0': [
    generateText('You have recieved some money.'),
  ],
}

export default en_text;