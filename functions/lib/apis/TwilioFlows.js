"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioRouter_1 = require("../Types/TwilioRouter");
/**
 * Flows is a graph based data structure, with the key being the valid
 * entrypoint, and the value a dict containing possible next points based
 * on if the block is successful or errors
 */
const TwilioFlows = {
    'entrypoint': {
        // TODO: change back for debugging only.
        // success: Block.intro_0,
        success: TwilioRouter_1.Block.record_0,
        error: null,
        matches: null
    },
    'intro_0': {
        success: null,
        error: TwilioRouter_1.Block.error_0,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioRouter_1.Block.listen_0 },
            { term: 'tuma', nextBlock: TwilioRouter_1.Block.record_0 },
            { term: 'msaada', nextBlock: TwilioRouter_1.Block.info_0 },
            { term: 'kurudia', nextBlock: TwilioRouter_1.Block.intro_0 }
        ]
    },
    'error_0': {
        success: TwilioRouter_1.Block.intro_0,
        error: TwilioRouter_1.Block.error_0,
        matches: null
    },
    'listen_0': {
        success: TwilioRouter_1.Block.listen_end,
        error: null,
        matches: null,
    },
    'listen_end': {
        success: null,
        error: TwilioRouter_1.Block.listen_end_error,
        matches: [
            { term: 'sikiliza', nextBlock: TwilioRouter_1.Block.record_0 },
            { term: 'maoni', nextBlock: TwilioRouter_1.Block.listen_feedback },
        ],
    },
    'listen_feedback': {
        success: TwilioRouter_1.Block.listen_feedback_complete,
        error: null,
        matches: null,
    },
    'listen_feedback_complete': {
        success: null,
        error: null,
        matches: null,
    },
    'record_0': {
        success: TwilioRouter_1.Block.record_playback,
        error: null,
        matches: null,
    },
    'record_playback': {
        success: TwilioRouter_1.Block.record_post_or_delete,
        error: null,
        matches: null,
    },
    'record_post_or_delete': {
        success: null,
        error: TwilioRouter_1.Block.record_post_or_delete_error,
        matches: [
            { term: 'tuma', nextBlock: TwilioRouter_1.Block.record_save },
            { term: 'anza tena', nextBlock: TwilioRouter_1.Block.record_delete }
        ]
    },
    'record_post_or_delete_error': {
        success: TwilioRouter_1.Block.record_post_or_delete,
        error: null,
        matches: null,
    },
    'record_save': {
        success: TwilioRouter_1.Block.intro_0,
        error: null,
        matches: null,
    },
    'record_delete': {
        success: TwilioRouter_1.Block.intro_0,
        error: null,
        matches: null,
    },
    'info_0': {
        success: TwilioRouter_1.Block.intro_0,
        error: null,
        matches: null,
    }
};
exports.default = TwilioFlows;
//# sourceMappingURL=TwilioFlows.js.map