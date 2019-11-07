import { IMessage } from '../queries/message';
import { SomeResult } from '../types_rn/AppProviderTypes';
import { AnyMessageType, AnyMessageMap } from '../types_rn/TwilioTypes';
declare function anyMessageToListOfIMessage(input: AnyMessageMap, botId: string, versionId: string): Array<IMessage>;
declare function createMessage(message: IMessage | Array<IMessage>): Promise<SomeResult<Array<IMessage>>>;
/**
 * @function fromIMessage
 * @description Map from a flattened IMessage to an AnyMessageType
 */
declare function fromIMessage(im: IMessage): AnyMessageType;
/**
 * @function fromIMessageList
 * @description Map from a flattened IMessageList to an AnyMessageMap
 */
declare function fromIMessageList(messages: Array<IMessage>): AnyMessageMap;
/**
 * @function getMessagesForBotId
 * @description Get the MessageMap object given a BotId
 */
declare function getMessagesForBotIdAndVersionId(botId: string, versionId: string): Promise<SomeResult<AnyMessageMap>>;
declare const _default: {
    anyMessageToListOfIMessage: typeof anyMessageToListOfIMessage;
    createMessage: typeof createMessage;
    fromIMessage: typeof fromIMessage;
    fromIMessageList: typeof fromIMessageList;
    getMessagesForBotIdAndVersionId: typeof getMessagesForBotIdAndVersionId;
};
export default _default;
