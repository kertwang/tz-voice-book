import { MessageType, MessageMap, SayMessage, AnyMessageMap } from "../../../types_rn/TwilioTypes";

const generateText = (text): SayMessage => {
  return {
    type: MessageType.SAY,
    text,
    language: 'en-AU' 
  }
}

/* the deploy script will automatically fill in the urls for us */
const en_text: AnyMessageMap = {
  'entrypoint': [
    generateText('Hello. This is an automated notification.'),
  ],
  'notification_0': [
    generateText('You have recieved some money.'),
  ],
}

export default en_text;