import { FlowMap, BlockId } from "../types_rn/TwilioRouter";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: FlowMap = {
  'entrypoint': {
    // TODO: change back for debugging only.
    success: BlockId.intro_0,
    // success: Block.record_0,
    error: null,
    matches: null
  },
  'intro_0': {
    success: null,
    error: BlockId.error_0,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.listen_0 },
      { term: 'tuma', nextBlock: BlockId.record_0 },
      { term: 'msaada', nextBlock: BlockId.info_0 },
      { term: 'kurudia', nextBlock: BlockId.intro_0 }
    ]
  },
  'error_0': {
    success: BlockId.intro_0,
    error: BlockId.error_0,
    matches: null
  },
  'listen_0': {
    success: BlockId.listen_end,
    error: null,
    matches: null,
  },
  'listen_end': {
    success: null,
    error: BlockId.listen_end_error,
    matches: [
      { term: 'sikiliza', nextBlock: BlockId.record_0 },
      { term: 'maoni', nextBlock: BlockId.listen_feedback },
    ],
  },
  'listen_feedback': {
    success: BlockId.listen_feedback_complete,
    error: null,
    matches: null,
  },
  'listen_feedback_complete': {
    success: null,
    error: null,
    matches: null,
  },
  'record_0': {
    success: BlockId.record_playback,
    error: null,
    matches: null,
  },
  'record_playback': {
    success: BlockId.record_post_or_delete,
    error: null,
    matches: null,
  },
  'record_post_or_delete': {
    success: null,
    error: BlockId.record_post_or_delete_error,
    matches: [
      { term: 'tuma', nextBlock: BlockId.record_save },
      { term: 'anza tena', nextBlock: BlockId.record_delete }
    ]
  },
  'record_post_or_delete_error': {
    success: BlockId.record_post_or_delete,
    error: null,
    matches: null,
  },
  'record_save': {
    success: BlockId.intro_0,
    error: null,
    matches: null,
  },
  'record_delete': {
    success: BlockId.intro_0,
    error: null,
    matches: null,
  },
  'info_0': {
    success: BlockId.intro_0,
    error: null,
    matches: null,
  }
}

export default TwilioFlows;