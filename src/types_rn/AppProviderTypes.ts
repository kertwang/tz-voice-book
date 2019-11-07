
export type SomeResult<T> = ErrorResult | SuccessResult<T>;

export type SuccessResult<T> = {
  result: T,
  type: ResultType.SUCCESS,
}

export type ErrorResult = {
  message: string,
  type: ResultType.ERROR,
}

export enum ResultType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export function makeSuccess<T>(result: T): SomeResult<T> {
  return {
    type: ResultType.SUCCESS,
    result,
  };
}

export function makeError<T>(message: string): SomeResult<T> {
  return {
    type: ResultType.ERROR,
    message,
  };
}

export function isError(result: SomeResult<any>) {
  if (result.type === ResultType.ERROR) {
    return true;
  }

  return false;
}


/**
 * unsafeUnwrap
 * 
 * Unwrap a result unsafelty. Similar to Rust
 * Throws error if result.type === ResultError
 */
export function unsafeUnwrap<T>(result: SomeResult<T>): T {
  if (result.type === ResultType.ERROR) {
    throw new Error(result.message);
  }

  return result.result;
}


/**
 * Reduces a list of SomeResults and returns if any of them contain an error
 */
export function resultsHasError(results: Array<SomeResult<any>>): boolean {
  return results.reduce((acc: any, curr: any) => {
    if (curr.type === ResultType.ERROR) {
      return true;
    }
    return acc;
  }, false);
}

/**
 * Reduces a list of SomeResults to a single result.
 * Final result must have a type of void.
 */
export function summarizeResults(results: Array<SomeResult<any>>): SomeResult<void> {
  let errorMessage = '';
  results.forEach(r => {
    if (r.type === ResultType.ERROR) {
      errorMessage += `, ${r.message}`;
    }
  });

  if (errorMessage !== '') {
    return makeError<void>(errorMessage)
  }

  return makeSuccess(undefined);
}