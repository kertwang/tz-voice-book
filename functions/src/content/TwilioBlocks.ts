import { BlockMap } from "../types_rn/TwilioRouter";

/**
 * Twilioblocks contain the individual messages to be played 
 * inside each block.
 * 
 * When getting a block, TwilioRouter will iterate through each of the messages
 * and play/say it.
 * 
 * Id is the blockId, each containing an array of message ids to be played
 */
const TwilioBlocks: BlockMap = {
  'entrypoint': ['001'],
  'intro_0': ['001', '002', '003', '004'],
  'error_0': ['001'],
  'record_0': ['001', '002'],
  'record_playback': ['001'],
  'record_playback_err': ['001'],
  'record_post_or_delete': ['001'],
  'record_post_or_delete_err': ['001'],
  'record_save': ['001'],
  'record_save_err': ['001'],
  'record_delete': ['001'],
  'listen_0': ['001', '002', '003', '004'],
  'listen_end': ['001', '002'],
  'listen_end_error': ['001'],
  'listen_feedback': ['001'],
  'listen_feedback_complete': ['001'],
}

export default TwilioBlocks;