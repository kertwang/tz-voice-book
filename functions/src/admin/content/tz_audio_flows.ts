import { FlowMap, FlowType, BlockId } from "../../types_rn/TwilioTypes";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: FlowMap = {
  'entrypoint': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  },
  'intro_0': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.listen_0 },
      { term: 'tuma', nextBlock: BlockId.record_0 },
      { term: 'msaada', nextBlock: BlockId.info_0 },
      { term: 'kurudia', nextBlock: BlockId.intro_0 }
    ],
    digitMatches: [
      { digits:'1', nextBlock: BlockId.listen_0 },
      { digits:'2', nextBlock: BlockId.record_0 },
      { digits:'3', nextBlock: BlockId.info_0 },
      { digits:'4', nextBlock: BlockId.intro_0 }
    ],
  },
  'error_0': {
    type: FlowType.GATHER,
    error: BlockId.error_0,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.listen_0 },
      { term: 'tuma', nextBlock: BlockId.record_0 },
      { term: 'msaada', nextBlock: BlockId.info_0 },
      { term: 'kurudia', nextBlock: BlockId.intro_0 }
    ],
    digitMatches: [
      { digits: '1', nextBlock: BlockId.listen_0 },
      { digits: '2', nextBlock: BlockId.record_0 },
      { digits: '3', nextBlock: BlockId.info_0 },
      { digits: '4', nextBlock: BlockId.intro_0 }
    ],
  },
  'listen_0': {
    type: FlowType.DEFAULT,
    next: BlockId.listen_end,
  },
  'listen_end': {
    type: FlowType.GATHER,
    error: BlockId.listen_end_error,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.record_0 },
      { term: 'maoni', nextBlock: BlockId.listen_feedback },
    ],
    digitMatches: [
      { digits: '1', nextBlock: BlockId.record_0 },
      { digits: '2', nextBlock: BlockId.listen_feedback },
    ],
  },
  'listen_end_error': {
    type: FlowType.GATHER,
    error: BlockId.listen_end_error,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.record_0 },
      { term: 'maoni', nextBlock: BlockId.listen_feedback },
    ],
    digitMatches: [
      { digits: '1', nextBlock: BlockId.record_0 },
      { digits: '2', nextBlock: BlockId.listen_feedback },
    ],
  },
  'listen_feedback': {
    type: FlowType.DEFAULT,
    next: BlockId.listen_feedback_complete,
  },
  'listen_feedback_complete': {
    type: FlowType.DEFAULT,
    next: null,
  },
  'record_0': {
    type: FlowType.DEFAULT,
    next: BlockId.record_playback,
  },
  'record_playback': {
    type: FlowType.DEFAULT,
    next: BlockId.record_post_or_delete,
  },
  'record_post_or_delete': {
    type: FlowType.GATHER,
    error: BlockId.record_post_or_delete_error,
    matches: [
      { term: 'tuma', nextBlock: BlockId.record_save },
      { term: 'anza tena', nextBlock: BlockId.record_delete }
    ],
    digitMatches: [
      { digits: '1', nextBlock: BlockId.record_save },
      { digits: '2', nextBlock: BlockId.record_delete }
    ],
  },
  'record_post_or_delete_error': {
    type: FlowType.GATHER,
    error: BlockId.record_post_or_delete_error,
    matches: [
      { term: 'tuma', nextBlock: BlockId.record_save },
      { term: 'anza tena', nextBlock: BlockId.record_delete }
    ],
    digitMatches: [
      { digits: '1', nextBlock: BlockId.record_save },
      { digits: '2', nextBlock: BlockId.record_delete }
    ],
  },
  'record_save': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  },
  'record_delete': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  },
  'info_0': {
    type: FlowType.DEFAULT,
    next: BlockId.intro_0,
  }
}

export default TwilioFlows;