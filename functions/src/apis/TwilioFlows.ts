import { FlowMap, Block } from "../Types/TwilioRouter";

/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows: FlowMap = {
  'entrypoint': {
    // TODO: change back for debugging only.
    // success: Block.intro_0,
    success: Block.record_0,
    error: null,
    matches: null
  },
  'intro_0': {
    success: null,
    error: Block.error_0,
    matches: [
      { term: 'sikiliza', nextBlock: Block.listen_0 },
      { term: 'tuma', nextBlock: Block.record_0 },
      { term: 'msaada', nextBlock: Block.info_0 },
      { term: 'kurudia', nextBlock: Block.intro_0 }
    ]
  },
  'error_0': {
    success: Block.intro_0,
    error: Block.error_0,
    matches: null
  },
  'listen_0': {
    success: Block.listen_end,
    error: null,
    matches: null,
  },
  'listen_end': {
    success: null,
    error: Block.listen_end_error,
    matches: [
      { term: 'sikiliza', nextBlock: Block.record_0 },
      { term: 'maoni', nextBlock: Block.listen_feedback },
    ],
  },
  'listen_feedback': {
    success: Block.listen_feedback_complete,
    error: null,
    matches: null,
  },
  'listen_feedback_complete': {
    success: null,
    error: null,
    matches: null,
  },
  'record_0': {
    success: Block.record_playback,
    error: null,
    matches: null,
  },
  'record_playback': {
    success: Block.record_post_or_delete,
    error: null,
    matches: null,
  },
  'record_post_or_delete': {
    success: null,
    error: Block.record_post_or_delete_error,
    matches: [
      { term: 'tuma', nextBlock: Block.record_save },
      { term: 'anza tena', nextBlock: Block.record_delete }
    ]
  },
  'record_post_or_delete_error': {
    success: Block.record_post_or_delete,
    error: null,
    matches: null,
  },
  'record_save': {
    success: Block.intro_0,
    error: null,
    matches: null,
  },
  'record_delete': {
    success: Block.intro_0,
    error: null,
    matches: null,
  },
  'info_0': {
    success: Block.intro_0,
    error: null,
    matches: null,
  }
}

export default TwilioFlows;