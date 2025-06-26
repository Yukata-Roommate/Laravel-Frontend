/*****************************************
 * Package Module Entity Array
 *
 * Types
 *****************************************/

/**
 * Predicate function type
 */
export type Predicate<TValue> = (value: TValue, index: number) => boolean;

/**
 * Mapper function type
 */
export type Mapper<TValue, TResult> = (value: TValue, index: number) => TResult;

/**
 * Reducer function type
 */
export type Reducer<TValue, TResult> = (
    accumulator: TResult,
    value: TValue,
    index: number
) => TResult;

/**
 * Comparator function type
 */
export type Comparator<TValue> = (a: TValue, b: TValue) => number;

/**
 * Action function type
 */
export type Action<TValue> = (value: TValue, index: number) => void;

/**
 * Async Predicate function type
 */
export type AsyncPredicate<TValue> = (
    value: TValue,
    index: number
) => Promise<boolean>;

/**
 * Async Mapper function type
 */
export type AsyncMapper<TValue, TResult> = (
    value: TValue,
    index: number
) => Promise<TResult>;

/**
 * Async Action function type
 */
export type AsyncAction<TValue> = (
    value: TValue,
    index: number
) => Promise<void>;
