"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
var TwilioBlocks = {
    'entrypoint': { type: TwilioTypes_1.BlockType.DEFAULT },
    'intro_0': { type: TwilioTypes_1.BlockType.DEFAULT },
    'listen_0': { type: TwilioTypes_1.BlockType.DEFAULT },
    'listen_playback': { type: TwilioTypes_1.BlockType.PLAYBACK },
    'listen_end': { type: TwilioTypes_1.BlockType.DEFAULT },
    'listen_end_error': { type: TwilioTypes_1.BlockType.DEFAULT },
    'listen_feedback': { type: TwilioTypes_1.BlockType.RECORD, recordingCallback: '/twiml/voicebook/recordingCallback/feedback' },
    'listen_feedback_complete': { type: TwilioTypes_1.BlockType.DEFAULT },
    'error_0': { type: TwilioTypes_1.BlockType.DEFAULT },
    'info_0': { type: TwilioTypes_1.BlockType.DEFAULT },
    'record_0': { type: TwilioTypes_1.BlockType.RECORD, recordingCallback: '/twiml/voicebook/recordingCallback/message' },
    'record_playback': { type: TwilioTypes_1.BlockType.PLAYBACK },
    'record_post_or_delete': { type: TwilioTypes_1.BlockType.DEFAULT },
    'record_save': { type: TwilioTypes_1.BlockType.END },
    'record_delete': { type: TwilioTypes_1.BlockType.END },
    'record_post_or_delete_error': { type: TwilioTypes_1.BlockType.DEFAULT }
};
exports["default"] = TwilioBlocks;
