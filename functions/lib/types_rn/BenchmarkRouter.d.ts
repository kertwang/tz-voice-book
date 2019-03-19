import FirebaseApi from "../apis/FirebaseApi";
/**
 * A block is a request for twiml that we respond to.
 * Similar to the idea of blocks in Twilio Studio
 */
export declare enum BlockId {
    entrypoint = "entrypoint",
    test_1 = "test_1",
    test_1_fail = "test_1_fail",
    test_1_match = "test_1_match",
    test_1_partial_match = "test_1_partial_match",
    test_2 = "test_2",
    test_2_fail = "test_2_fail",
    test_2_match = "test_2_match",
    test_2_partial_match = "test_2_partial_match",
    test_3 = "test_3",
    test_3_fail = "test_3_fail",
    test_3_full_phrase = "test_3_full_phrase",
    test_3_last_word = "test_3_last_word",
    test_3_prefix_only = "test_3_prefix_only",
    end = "end"
}
export declare type FlowMap = {
    [others: string]: FlowPath;
};
export declare type BlockMap = {
    [others: string]: string[];
};
export declare type FlowPath = {
    success: BlockId;
    error: BlockId | null;
    matches: FlowMatch[];
};
export declare type FlowMatch = {
    term: string;
    nextBlock: BlockId;
};
export declare type BlockSetting = {
    verb: 'play';
    'say': any;
    url: string;
    text: string;
    language: string;
};
export declare type GatherResult = {
    speechResult: string;
    confidence: number;
};
export declare type CallContext = {
    callSid: string;
    mobile: string;
    firebaseApi: FirebaseApi;
};
