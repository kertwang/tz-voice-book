import { BlockType, AnyBlockMap } from "../types_rn/TwilioTypes";
import { SomeResult } from "../types_rn/AppProviderTypes";
export declare type TBlock = {
    botId: string;
    blockId: string;
    type: BlockType;
};
declare function getBlocks(): Promise<SomeResult<Array<TBlock>>>;
declare function getBlockMapForBotId(botId: string): Promise<SomeResult<AnyBlockMap>>;
declare function createBlock(block: TBlock | Array<TBlock>): Promise<SomeResult<Array<TBlock>>>;
/**
 * convert an AnyBlockMap into a list of TBlocks for
 * the database to handle
 */
declare function anyBlockMapToListOfTBlock(input: AnyBlockMap, botId: string): Array<TBlock>;
declare const _default: {
    anyBlockMapToListOfTBlock: typeof anyBlockMapToListOfTBlock;
    createBlock: typeof createBlock;
    getBlocks: typeof getBlocks;
    getBlockMapForBotId: typeof getBlockMapForBotId;
};
export default _default;
