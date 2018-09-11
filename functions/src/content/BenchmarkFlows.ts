import { BlockId, FlowMap } from "../types_rn/BenchmarkRouter";


const BenchmarkFlows: FlowMap = {
  'entrypoint': {
    // TODO: change back for debugging only.
    success: BlockId.test_1,
    // success: Block.record_0,
    error: null,
    matches: null
  },
  'test_1': {
    success: null,
    error: BlockId.test_1_fail,
    matches: [
      { term: 'sikiliza,tuma,msaada,kurudia', nextBlock: BlockId.test_1_match},
      { term: 'liza,uma,ada,dia', nextBlock: BlockId.test_1_partial_match},
    ],
  },
  'test_1_fail': {
    success: BlockId.test_2,
    error: null,
    matches: null,
  },
  'test_1_match': {
    success: BlockId.test_2,
    error: null,
    matches: null,
  },
  'test_1_partial_match': {
    success: BlockId.test_2,
    error: null,
    matches: null,
  },
  'test_2': {
    success: null,
    error: BlockId.test_2_fail,
    matches: [
      { term: 'msaada', nextBlock: BlockId.test_2_match },
      { term: 'msa,ada', nextBlock: BlockId.test_2_partial_match },
    ],
  },
  'test_2_fail': {
    success: BlockId.test_3,
    error: null,
    matches: null,
  },
  'test_2_match': {
    success: BlockId.test_3,
    error: null,
    matches: null,
  },
  'test_2_partial_match': {
    success: BlockId.test_3,
    error: null,
    matches: null,
  },
  'test_3': {
    success: null,
    error: BlockId.test_3_fail,
    matches: [
      { term: 'asante moja,asante mbili,asante tatu', nextBlock: BlockId.test_3_full_phrase },
      { term: 'moja,mbili,tatu', nextBlock: BlockId.test_3_last_word },
      { term: 'asante', nextBlock: BlockId.test_3_prefix_only },
    ],
  },
  'test_3_fail': {
    success: BlockId.end,
    error: null,
    matches: null,
  },
  'test_3_full_phrase': {
    success: BlockId.end,
    error: null,
    matches: null,
  },
  'test_3_last_word': {
    success: BlockId.end,
    error: null,
    matches: null,
  },
  'test_3_prefix_only': {
    success: BlockId.end,
    error: null,
    matches: null,
  },
  'end': {
    success: null,
    error: null,
    matches: null,
  },
}

export default BenchmarkFlows;