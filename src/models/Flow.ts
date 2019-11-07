import { FlowType, AnyFlowMap, GatherFlow, DefaultFlow, DigitMatch, BlockId } from "../types_rn/TwilioTypes";
import { SomeResult, makeError, makeSuccess, ResultType } from "../types_rn/AppProviderTypes";

import FlowQueries from '../queries/flow'
import { as, exists } from "../utils";

export type TFlow = {
  botId: string,
  flowId: string,
  type: FlowType,

  //DefaultFlow Only
  next?: string, 

  //GatherFlow Only
  digitMatches?: string,
  error?: string,
  createdAt?: Date,
  updatedAt?: Date
}

function anyFlowMapToListOfTFlow(input: AnyFlowMap, botId: string): Array<TFlow> {
  const flowList: Array<TFlow> = []
  Object.keys(input).forEach(flowId => {
    const anyFlow: DefaultFlow | GatherFlow = input[flowId]
    let flow: TFlow = {
      botId,
      flowId,
      type: anyFlow.type,
    }

    switch (anyFlow.type) {
      case FlowType.DEFAULT: {
        flow = {
          ...flow,
          next: anyFlow.next
        }
        break;
      }
      case FlowType.GATHER: {
        flow = {
          ...flow,
          digitMatches: JSON.stringify(anyFlow.digitMatches),
          error: anyFlow.error,
        }
      }
    }
    flowList.push(flow)
  })

  return flowList
}

function tFlowListToAnyFlowMap(input: Array<TFlow>): AnyFlowMap {
  const anyFlowMap: AnyFlowMap = {}

  input.forEach(tflow => {
    anyFlowMap[tflow.flowId] = tFlowToAnyFlow(tflow)
  })

  return anyFlowMap
}

function tFlowToAnyFlow(input: TFlow): DefaultFlow | GatherFlow {
  switch (input.type) {
    case FlowType.DEFAULT: 
      return {
        next: as<string, BlockId>(exists<string>(input.next)),
        type: FlowType.DEFAULT,
      }
    case FlowType.GATHER: 
      return {
        type: FlowType.GATHER,
        error: as<string, BlockId>(exists<string>(input.error)),
        digitMatches: as<string, DigitMatch[]>(exists<string>(input.digitMatches))
      }
  }
}

async function getFlows(): Promise<SomeResult<Array<TFlow>>> {
  return makeError<Array<TFlow>>('not implemented')
}

async function getFlowsForBotId(botId: string): Promise<SomeResult<AnyFlowMap>> {
  const queryResult = await FlowQueries.getFlowsForBotId(botId);

  if (queryResult.type === ResultType.ERROR) {
    return queryResult;
  }

  const anyFlowMap: AnyFlowMap = tFlowListToAnyFlowMap(queryResult.result)

  return makeSuccess(anyFlowMap);
}

async function createFlow(flow: TFlow | Array<TFlow>): Promise<SomeResult<Array<TFlow>>> {
  if (!Array.isArray(flow)) {
    flow = [flow]
  }

  try {
    await FlowQueries.createFlows(flow, true)
  } catch (err) {
    return makeError(err)
  }

  return makeSuccess(flow)
}

export default {
  anyFlowMapToListOfTFlow,
  createFlow,
  getFlows,
  getFlowsForBotId,
}