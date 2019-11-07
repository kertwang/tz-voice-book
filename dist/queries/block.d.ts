import { BlockType } from "../types_rn/TwilioTypes";
import { SomeResult } from "../types_rn/AppProviderTypes";
export interface IBlock {
    botId: string;
    blockId: string;
    type: BlockType;
    createdAt?: Date;
    updatedAt?: Date;
}
declare function getAllBlocks(): Promise<any[]>;
declare function getBlocksForBotId(botId: string): Promise<SomeResult<Array<IBlock>>>;
declare function getBlockForBotIdAndBlockId(botId: string, blockId: string): Promise<IBlock[]>;
declare function createBlocks(blocks: Array<IBlock>, upsert: boolean): Promise<any[]>;
declare function _truncate(): Promise<any[]>;
declare const _default: {
    createBlocks: typeof createBlocks;
    getAllBlocks: typeof getAllBlocks;
    getBlocksForBotId: typeof getBlocksForBotId;
    getBlockForBotIdAndBlockId: typeof getBlockForBotIdAndBlockId;
    _truncate: typeof _truncate;
};
export default _default;
