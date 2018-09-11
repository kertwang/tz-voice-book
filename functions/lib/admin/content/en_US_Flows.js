"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../types_rn/TwilioTypes");
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows = {
    'entrypoint': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0,
    },
    'intro_0': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.error_0,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioTypes_1.BlockId.listen_0 },
            { term: 'tuma', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { term: 'msaada', nextBlock: TwilioTypes_1.BlockId.info_0 },
            { term: 'kurudia', nextBlock: TwilioTypes_1.BlockId.intro_0 }
        ],
        digitMatches: [
            { digits: '1', nextBlock: TwilioTypes_1.BlockId.listen_0 },
            { digits: '2', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { digits: '3', nextBlock: TwilioTypes_1.BlockId.info_0 },
            { digits: '4', nextBlock: TwilioTypes_1.BlockId.intro_0 }
        ],
    },
    'error_0': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.error_0,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioTypes_1.BlockId.listen_0 },
            { term: 'tuma', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { term: 'msaada', nextBlock: TwilioTypes_1.BlockId.info_0 },
            { term: 'kurudia', nextBlock: TwilioTypes_1.BlockId.intro_0 }
        ],
        digitMatches: [],
    },
    'listen_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.listen_end,
    },
    'listen_end': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.listen_end_error,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { term: 'maoni', nextBlock: TwilioTypes_1.BlockId.listen_feedback },
        ],
        digitMatches: [],
    },
    'listen_end_error': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.listen_end_error,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioTypes_1.BlockId.record_0 },
            { term: 'maoni', nextBlock: TwilioTypes_1.BlockId.listen_feedback },
        ],
        digitMatches: [],
    },
    'listen_feedback': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.listen_feedback_complete,
    },
    'listen_feedback_complete': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: null,
    },
    'record_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.record_playback,
    },
    'record_playback': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.record_post_or_delete,
    },
    'record_post_or_delete': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.record_post_or_delete_error,
        matches: [
            { term: 'tuma', nextBlock: TwilioTypes_1.BlockId.record_save },
            { term: 'anza tena', nextBlock: TwilioTypes_1.BlockId.record_delete }
        ],
        digitMatches: [],
    },
    'record_post_or_delete_error': {
        type: TwilioTypes_1.FlowType.GATHER,
        error: TwilioTypes_1.BlockId.record_post_or_delete_error,
        matches: [
            { term: 'tuma', nextBlock: TwilioTypes_1.BlockId.record_save },
            { term: 'anza tena', nextBlock: TwilioTypes_1.BlockId.record_delete }
        ],
        digitMatches: [],
    },
    'record_save': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0,
    },
    'record_delete': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0,
    },
    'info_0': {
        type: TwilioTypes_1.FlowType.DEFAULT,
        next: TwilioTypes_1.BlockId.intro_0,
    }
};
exports.default = TwilioFlows;
//# sourceMappingURL=en_us_flows.js.map