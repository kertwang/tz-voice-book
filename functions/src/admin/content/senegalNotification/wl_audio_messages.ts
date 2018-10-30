import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";
import { generateUrl } from "../../../utils";

const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${process.env.storageBucket.replace("\"", '')}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway

/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalNotificationMessageMap = {
  'entrypoint': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'wl_audio/W1.mp3', firebaseToken) },
  ],
  'notification_0': [
    generateText('You have recieved some money.'),
  ],
}

export default en_text;