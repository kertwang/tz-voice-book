import { TwilioSayLanguage } from "../types_rn/TwilioTypes";
import { SomeResult } from "../types_rn/AppProviderTypes";
export interface IMessage {
    botId: string;
    messageId: string;
    index: number;
    type: string;
    versionId: string;
    text?: string;
    language?: TwilioSayLanguage;
    url?: string;
    func?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
declare function getAllMessages(): Promise<IMessage[]>;
declare function getMessagesForBotIdAndVersionId(botId: string, versionId: string): Promise<IMessage[]>;
declare function createMessage(message: Array<IMessage>): Promise<SomeResult<Array<IMessage>>>;
declare function _truncate(): Promise<any[]>;
declare const _default: {
    createMessage: typeof createMessage;
    getAllMessages: typeof getAllMessages;
    getMessagesForBotIdAndVersionId: typeof getMessagesForBotIdAndVersionId;
    _truncate: typeof _truncate;
};
export default _default;
