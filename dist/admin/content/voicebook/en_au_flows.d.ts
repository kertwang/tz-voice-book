import { AnyFlowMap } from "../../../types_rn/TwilioTypes";
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
declare const TwilioFlows: AnyFlowMap;
export default TwilioFlows;
