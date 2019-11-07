import { MessageType, SenegalNotificationMessageMap, PlayMessage } from "../../../types_rn/TwilioTypes";
import { generateUrl } from "../../../utils";
import { storageBucket } from "../../../utils/LocalEnv";

const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${storageBucket}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway


function generatePlay(messageId: string): PlayMessage {
  return { type: MessageType.PLAY, url: generateUrl(urlPrefix, `wl_audio/${messageId}.mp3`, firebaseToken) }
}

/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalNotificationMessageMap = {
  'entrypoint': [
    generatePlay('W7'),
  ]
}

export default en_text;