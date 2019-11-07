import { FlowType } from "../types_rn/TwilioTypes";
import { SomeResult } from '../types_rn/AppProviderTypes';
export interface IFlow {
    botId: string;
    flowId: string;
    type: FlowType;
    next?: string;
    digitMatches?: string;
    error?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare function getAllFlows(): Promise<any[]>;
declare function getFlowsForBotId(botId: string): Promise<SomeResult<Array<IFlow>>>;
declare function getFlowForBotIdAndFlowId(botId: string, flowId: string): Promise<IFlow[]>;
declare function createFlows(flows: Array<IFlow>, upsert: boolean): Promise<SomeResult<any>>;
declare function _truncate(): Promise<any[]>;
declare const _default: {
    createFlows: typeof createFlows;
    getAllFlows: typeof getAllFlows;
    getFlowsForBotId: typeof getFlowsForBotId;
    getFlowForBotIdAndFlowId: typeof getFlowForBotIdAndFlowId;
    _truncate: typeof _truncate;
};
export default _default;
