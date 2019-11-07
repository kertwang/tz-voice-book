import { SayMessage, PlayMessage } from "../types_rn/TwilioTypes";
export declare const generateText: (text: string) => SayMessage;
export declare function generatePlay(prefix: string, messageId: string): PlayMessage;
