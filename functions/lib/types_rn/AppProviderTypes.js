"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultType;
(function (ResultType) {
    ResultType["ERROR"] = "ERROR";
    ResultType["SUCCESS"] = "SUCCESS";
})(ResultType = exports.ResultType || (exports.ResultType = {}));
function makeSuccess(result) {
    return {
        type: ResultType.SUCCESS,
        result,
    };
}
exports.makeSuccess = makeSuccess;
function makeError(message) {
    return {
        type: ResultType.ERROR,
        message,
    };
}
exports.makeError = makeError;
function isError(result) {
    if (result.type === ResultType.ERROR) {
        return true;
    }
    return false;
}
exports.isError = isError;
/**
 * unsafeUnwrap
 *
 * Unwrap a result unsafelty. Similar to Rust
 * Throws error if result.type === ResultError
 */
function unsafeUnwrap(result) {
    if (result.type === ResultType.ERROR) {
        throw new Error(result.message);
    }
    return result.result;
}
exports.unsafeUnwrap = unsafeUnwrap;
/**
 * Reduces a list of SomeResults and returns if any of them contain an error
 */
function resultsHasError(results) {
    return results.reduce((acc, curr) => {
        if (curr.type === ResultType.ERROR) {
            return true;
        }
        return acc;
    }, false);
}
exports.resultsHasError = resultsHasError;
/**
 * Reduces a list of SomeResults to a single result.
 * Final result must have a type of void.
 */
function summarizeResults(results) {
    let errorMessage = '';
    results.forEach(r => {
        if (r.type === ResultType.ERROR) {
            errorMessage += `, ${r.message}`;
        }
    });
    if (errorMessage !== '') {
        return makeError(errorMessage);
    }
    return makeSuccess(undefined);
}
exports.summarizeResults = summarizeResults;
