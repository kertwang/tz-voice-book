"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkRouter_1 = require("../types_rn/BenchmarkRouter");
const BenchmarkFlows = {
    'entrypoint': {
        // TODO: change back for debugging only.
        success: BenchmarkRouter_1.BlockId.test_1,
        // success: Block.record_0,
        error: null,
        matches: null
    },
    'test_1': {
        success: null,
        error: BenchmarkRouter_1.BlockId.test_1_fail,
        matches: [
            { term: 'sikiliza,tuma,msaada,kurudia', nextBlock: BenchmarkRouter_1.BlockId.test_1_match },
            { term: 'liza,uma,ada,dia', nextBlock: BenchmarkRouter_1.BlockId.test_1_partial_match },
        ],
    },
    'test_1_fail': {
        success: BenchmarkRouter_1.BlockId.test_2,
        error: null,
        matches: null,
    },
    'test_1_match': {
        success: BenchmarkRouter_1.BlockId.test_2,
        error: null,
        matches: null,
    },
    'test_1_partial_match': {
        success: BenchmarkRouter_1.BlockId.test_2,
        error: null,
        matches: null,
    },
    'test_2': {
        success: null,
        error: BenchmarkRouter_1.BlockId.test_2_fail,
        matches: [
            { term: 'msaada', nextBlock: BenchmarkRouter_1.BlockId.test_2_match },
            { term: 'msa,ada', nextBlock: BenchmarkRouter_1.BlockId.test_2_partial_match },
        ],
    },
    'test_2_fail': {
        success: BenchmarkRouter_1.BlockId.test_3,
        error: null,
        matches: null,
    },
    'test_2_match': {
        success: BenchmarkRouter_1.BlockId.test_3,
        error: null,
        matches: null,
    },
    'test_2_partial_match': {
        success: BenchmarkRouter_1.BlockId.test_3,
        error: null,
        matches: null,
    },
    'test_3': {
        success: null,
        error: BenchmarkRouter_1.BlockId.test_3_fail,
        matches: [
            { term: 'asante moja,asante mbili,asante tatu', nextBlock: BenchmarkRouter_1.BlockId.test_3_full_phrase },
            { term: 'moja,mbili,tatu', nextBlock: BenchmarkRouter_1.BlockId.test_3_last_word },
            { term: 'asante', nextBlock: BenchmarkRouter_1.BlockId.test_3_prefix_only },
        ],
    },
    'test_3_fail': {
        success: BenchmarkRouter_1.BlockId.end,
        error: null,
        matches: null,
    },
    'test_3_full_phrase': {
        success: BenchmarkRouter_1.BlockId.end,
        error: null,
        matches: null,
    },
    'test_3_last_word': {
        success: BenchmarkRouter_1.BlockId.end,
        error: null,
        matches: null,
    },
    'test_3_prefix_only': {
        success: BenchmarkRouter_1.BlockId.end,
        error: null,
        matches: null,
    },
    'end': {
        success: null,
        error: null,
        matches: null,
    },
};
exports.default = BenchmarkFlows;
//# sourceMappingURL=BenchmarkFlows.js.map