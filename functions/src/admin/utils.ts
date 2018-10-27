import { SayMessage, MessageType } from "../types_rn/TwilioTypes";

export const generateText = (text): SayMessage => {
  return {
    type: MessageType.SAY,
    text,
    language: 'en-AU'
  }
}
