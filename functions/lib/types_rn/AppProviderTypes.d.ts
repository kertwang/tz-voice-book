export declare type SomeResult<T> = ErrorResult | SuccessResult<T>;
export declare type SuccessResult<T> = {
    result: T;
    type: ResultType.SUCCESS;
};
export declare type ErrorResult = {
    message: string;
    type: ResultType.ERROR;
};
export declare enum ResultType {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS"
}
export declare function makeSuccess<T>(result: T): SomeResult<T>;
export declare function makeError<T>(message: string): SomeResult<T>;
export declare function isError(result: SomeResult<any>): boolean;
/**
 * unsafeUnwrap
 *
 * Unwrap a result unsafelty. Similar to Rust
 * Throws error if result.type === ResultError
 */
export declare function unsafeUnwrap<T>(result: SomeResult<T>): T;
/**
 * Reduces a list of SomeResults and returns if any of them contain an error
 */
export declare function resultsHasError(results: Array<SomeResult<any>>): boolean;
/**
 * Reduces a list of SomeResults to a single result.
 * Final result must have a type of void.
 */
export declare function summarizeResults(results: Array<SomeResult<any>>): SomeResult<void>;
