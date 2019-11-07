import { FlowType, AnyFlowMap } from "../types_rn/TwilioTypes";
import { SomeResult } from "../types_rn/AppProviderTypes";
export declare type TFlow = {
    botId: string;
    flowId: string;
    type: FlowType;
    next?: string;
    digitMatches?: string;
    error?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
declare function anyFlowMapToListOfTFlow(input: AnyFlowMap, botId: string): Array<TFlow>;
declare function getFlows(): Promise<SomeResult<Array<TFlow>>>;
declare function getFlowsForBotId(botId: string): Promise<SomeResult<AnyFlowMap>>;
declare function createFlow(flow: TFlow | Array<TFlow>): Promise<SomeResult<Array<TFlow>>>;
declare const _default: {
    anyFlowMapToListOfTFlow: typeof anyFlowMapToListOfTFlow;
    createFlow: typeof createFlow;
    getFlows: typeof getFlows;
    getFlowsForBotId: typeof getFlowsForBotId;
};
export default _default;
