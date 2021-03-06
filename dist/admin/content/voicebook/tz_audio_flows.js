"use strict";
exports.__esModule = true;
var TwilioTypes_1 = require("../../../types_rn/TwilioTypes");
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
var TwilioFlows = {
    'entrypoint': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0
    },
    'intro_0': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.error_0,
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.listen_0 },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { digits: '3', nextBlock: TwilioTypes_1.BlockId.info_0 },
            { digits: '4', nextBlock: TwilioTypes_1.BlockId.intro_0 }
        ]
    },
    'error_0': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.error_0,
        digitMatches: []
    },
    'listen_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.listen_playback
    },
    'listen_playback': {
        // TODO: define new block type?
        type: TwilioTypes_1.FlowType.DEFAULT,
        // error: null, //ew gross
        //gets triggered after custom loop on listen_playback
        next: TwilioTypes_1.BlockId.listen_end
    },
    'listen_end': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.listen_end_error,
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.listen_feedback },
        ]
    },
    'listen_end_error': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.listen_end_error,
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.listen_feedback },
        ]
    },
    'listen_feedback': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.listen_feedback_complete
    },
    'listen_feedback_complete': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0
    },
    'record_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.record_playback
    },
    'record_playback': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.record_post_or_delete
    },
    'record_post_or_delete': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.record_post_or_delete_error,
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.record_save },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.record_delete }
        ]
    },
    'record_post_or_delete_error': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.record_post_or_delete_error,
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.record_save },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.record_delete }
        ]
    },
    'record_save': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0
    },
    'record_delete': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0
    },
    'info_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0
    }
};
exports["default"] = TwilioFlows;
