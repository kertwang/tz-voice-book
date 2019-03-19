import { BlockId, CallContext, DigitResult, BotConfig } from '../types_rn/TwilioTypes';
/**
 * TwilioRouter is a stateless router for twilio requests.
 * Given an express request, it generates the next valid
 * twilio response
 */
export default class TwilioRouter {
    static nextMessage(ctx: CallContext, config: BotConfig, currentBlock: BlockId): Promise<string>;
    /**
     * Given a blockId, find the Flow, Block and Messages, and build a
     * twilio response
     */
    static getBlock(ctx: CallContext, config: BotConfig, blockName: BlockId): Promise<any>;
    private static handlePlaybackBlock;
    private static appendMessagesToResponse;
    /**
     * Handle the output of a gather endpoint, and redirect back
     * into the flow of things
     */
    static gatherNextMessage(ctx: CallContext, config: BotConfig, currentBlock: BlockId, gatherResult: DigitResult): Promise<string>;
}
