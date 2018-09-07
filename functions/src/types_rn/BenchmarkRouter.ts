import FirebaseApi from "../apis/FirebaseApi";

/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 */
export enum BlockId {
  entrypoint = 'entrypoint',

  test_1 = 'test_1',
  test_1_fail = 'test_1_fail',
  test_1_match = 'test_1_match',
  test_1_partial_match = 'test_1_partial_match',

  test_2 = 'test_2',
  test_2_fail = 'test_2_fail',
  test_2_match = 'test_2_match',
  test_2_partial_match = 'test_2_partial_match',

  test_3 = 'test_3',
  test_3_fail = 'test_3_fail',
  test_3_full_phrase = 'test_3_full_phrase',
  test_3_last_word = 'test_3_last_word',
  test_3_prefix_only = 'test_3_prefix_only',

  end = 'end'
}

export type FlowMap = {
  [others: string]: FlowPath;
}

export type BlockMap = {
  [others: string]: string[];
}

export type FlowPath = {
  success: BlockId,
  error: BlockId | null,
  matches: FlowMatch[]
}

export type FlowMatch = {
  term: string,
  nextBlock: BlockId,
}

export type BlockSetting = {
  verb: 'play', 'say',
  url: string,
  text: string,
  language: string,
}

export type GatherResult = {
  speechResult: string,
  confidence: number,
}

export type CallContext = {
  callSid: string,
  mobile: string,
  firebaseApi: FirebaseApi,
  //We could put the appApi in here, but I'm not too sure thats the best idea...
}