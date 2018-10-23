import { BlockType, BlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: BlockMap = {
  // change this to voicebook?
  'entrypoint': { type: BlockType.DEFAULT }, 
  'intro_0': { type: BlockType.DEFAULT }, 
  'listen_0': { type: BlockType.DEFAULT }, 
  'listen_playback': { type: BlockType.PLAYBACK }, 
  'listen_end': { type: BlockType.DEFAULT }, 
  'listen_end_error': { type: BlockType.DEFAULT }, 
  'listen_feedback': { type: BlockType.RECORD, recordingCallback: '/twiml/recordingCallback/feedback'}, 
  'listen_feedback_complete': { type: BlockType.DEFAULT }, 
  'error_0': { type: BlockType.DEFAULT }, 
  'info_0': { type: BlockType.DEFAULT }, 
  'record_0': { type: BlockType.RECORD, recordingCallback: '/twiml/recordingCallback/message' },
  'record_playback': {type: BlockType.PLAYBACK },
  'record_post_or_delete': { type: BlockType.DEFAULT }, 
  'record_save': { type: BlockType.END }, 
  'record_delete': { type: BlockType.END }, 
  'record_post_or_delete_error': { type: BlockType.DEFAULT }, 
}

export default TwilioBlocks;