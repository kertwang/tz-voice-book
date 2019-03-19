import { BlockId, GatherResult, CallContext } from '../types_rn/BenchmarkRouter';
export default class BenchmarkRouter {
    static nextMessage(ctx: CallContext, currentBlock: BlockId): Promise<string>;
    static getBlock(ctx: CallContext, blockName: BlockId, extraText?: string): Promise<any>;
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static gatherNextMessage(ctx: CallContext, currentBlock: BlockId, gatherResult: GatherResult): Promise<string>;
}
