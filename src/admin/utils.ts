import { SayMessage, MessageType, PlayMessage } from "../types_rn/TwilioTypes";
import { generateUrl } from "../utils";
import { storageBucket } from "../utils/LocalEnv";

export const generateText = (text: string): SayMessage => {
  return {
    type: MessageType.SAY,
    text,
    language: 'en-US'
  }
}

const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${storageBucket}/o/`;
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway


export function generatePlay(prefix: string, messageId: string): PlayMessage {
  return { type: MessageType.PLAY, url: generateUrl(urlPrefix, `${prefix}/${messageId}.mp3`, firebaseToken) }
}