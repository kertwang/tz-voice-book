import { SomeResult } from "../types_rn/AppProviderTypes";
export declare type TBot = {
    id: string;
    defaultVersionId: string;
    createdAt?: Date;
    updatedAt?: Date;
};
declare function getBots(): Promise<SomeResult<Array<TBot>>>;
declare function getBotForId(botId: string): Promise<SomeResult<TBot>>;
declare function createBot(bot: TBot | Array<TBot>, ignoreIfExists?: boolean): Promise<SomeResult<Array<TBot>>>;
declare function updateBot(id: string, botPartial: any): Promise<SomeResult<any>>;
declare function deleteBot(id: string): Promise<SomeResult<null>>;
declare const _default: {
    createBot: typeof createBot;
    getBots: typeof getBots;
    getBotForId: typeof getBotForId;
    updateBot: typeof updateBot;
    deleteBot: typeof deleteBot;
};
export default _default;
