import { SomeResult } from "../types_rn/AppProviderTypes";
export interface IBot {
    id: string;
    defaultVersionId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare type UpsertParams = {
    table: string;
    object: any;
    constraint: any;
};
declare function getAllBots(): Promise<IBot[]>;
declare function getBotForId(id: string): Promise<SomeResult<IBot>>;
declare function createBots(bots: Array<IBot>, ignoreIfExists: boolean): Promise<void>;
declare function patchBot(id: string, bot: IBot): Promise<number>;
declare function deleteBot(id: string): Promise<number>;
declare function _truncate(): Promise<any[]>;
declare const _default: {
    createBots: typeof createBots;
    deleteBot: typeof deleteBot;
    getAllBots: typeof getAllBots;
    getBotForId: typeof getBotForId;
    patchBot: typeof patchBot;
    _truncate: typeof _truncate;
};
export default _default;
