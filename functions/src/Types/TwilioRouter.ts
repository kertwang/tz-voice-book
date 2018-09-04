
/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 */
export enum Block {
  entrypoint = 'entrypoint',
  intro_0 = 'intro_0',
  menu_0 = 'menu_0',

  listen_0 = 'listen_0',
  listen_end = 'listen_end',
  listen_end_error = 'listen_end_error',
  listen_feedback = 'listen_feedback',
  listen_feedback_complete = 'listen_feedback_complete',

  error_0 = 'error_0',
  info_0 = 'info_0',
  
  record_0 = 'record_0',
  record_1 = 'record_1',
  record_playback = 'record_playback',
  record_post_or_delete = 'record_post_or_delete',
  record_save = 'record_save',
  record_delete ='record_delete',
  record_post_or_delete_error = 'record_post_or_delete_error',

  end = 'end'
}

export type FlowMap = {
  [others: string]: FlowPath;
}

export type FlowPath = {
  success: Block,
  error: Block | null,
  matches: FlowMatch[]
}

export type FlowMatch = {
  term: string,
  nextBlock: Block,
}

export type GatherResult = {
  speechResult: string,
  confidence: number,
}
