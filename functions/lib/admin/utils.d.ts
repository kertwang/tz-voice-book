import { SayMessage, PlayMessage } from "../types_rn/TwilioTypes";
export declare const generateText: (text: any) => SayMessage;
export declare function generatePlay(prefix: string, messageId: string): PlayMessage;
