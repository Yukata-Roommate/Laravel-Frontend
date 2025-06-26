/*****************************************
 * Package Module Entity Array
 *
 * Entity
 *****************************************/

import { BaseEntity } from "../base";
import {
    Predicate,
    Mapper,
    Reducer,
    Comparator,
    Action,
    AsyncPredicate,
    AsyncMapper,
    AsyncAction,
} from "./types";

import { Json } from "../../json";

/**
 * Array Entity
 */
export class ArrayEntity<TValue = unknown> extends BaseEntity {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * data storage
     *
     * @type {TValue[]}
     */
    protected data: TValue[] = [];

    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {Array<TValue>} values
     */
    public constructor(values?: Array<TValue>) {
        super();

        if (values?.length) this.set(values);
    }

    /**
     * get constructor
     *
     * @returns {new (): ArrayEntity<TValue>}
     */
    protected getConstructor<T>(): new () => ArrayEntity<T> {
        return this.constructor as new () => ArrayEntity<T>;
    }

    /**
     * create new instance
     *
     * @param {Array<T>} values
     * @returns {ArrayEntity<T>}
     */
    protected createInstance<T>(values?: Array<T>): ArrayEntity<T> {
        const Constructor = this.getConstructor<T>();

        return new Constructor().set(values || []);
    }

    /*----------------------------------------*
     * Accessors
     *----------------------------------------*/

    /**
     * get all values
     *
     * @returns {Array<TValue>}
     */
    public get(): Array<TValue> {
        return [...this.data];
    }

    /**
     * get value at index
     *
     * @param {number} index
     * @returns {TValue | undefined}
     */
    public value(index: number): TValue | undefined {
        if (!Number.isInteger(index))
            throw new RangeError("Index must be an integer");

        if (index < 0 || index >= this.data.length) return undefined;

        return this.data[index];
    }

    /**
     * get data size
     *
     * @returns {number}
     */
    public size(): number {
        return this.data.length;
    }

    /**
     * whether data is empty
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * get first element of data
     *
     * @returns {TValue | undefined}
     */
    public first(): TValue | undefined {
        return this.isEmpty() ? undefined : this.value(0);
    }

    /**
     * get last element of data
     *
     * @returns {TValue | undefined}
     */
    public last(): TValue | undefined {
        return this.isEmpty() ? undefined : this.value(this.size() - 1);
    }

    /**
     * get index of first occurrence of value
     *
     * @param {TValue} value
     * @returns {number | undefined}
     */
    public indexOf(value: TValue): number | undefined {
        const index = this.data.indexOf(value);

        return index === -1 ? undefined : index;
    }

    /**
     * get index of last occurrence of value
     *
     * @param {TValue} value
     * @returns {number | undefined}
     */
    public lastIndexOf(value: TValue): number | undefined {
        const index = this.data.lastIndexOf(value);

        return index === -1 ? undefined : index;
    }

    /*----------------------------------------*
     * Mutators
     *----------------------------------------*/

    /**
     * set values
     *
     * @param {Array<TValue>} values
     * @returns {this}
     */
    public set(values: Array<TValue>): this {
        this.data.length = 0;

        if (values.length > 0) this.data.push(...values);

        return this;
    }

    /**
     * add value
     *
     * @param {TValue} value
     * @returns {this}
     */
    public add(value: TValue): this {
        this.data.push(value);

        return this;
    }

    /**
     * push multiple values
     *
     * @param {Array<TValue>} values
     * @returns {this}
     */
    public push(...values: TValue[]): this {
        if (values.length === 0) return this;

        this.data.push(...values);

        return this;
    }

    /**
     * add value to beginning of data
     *
     * @param {TValue} value
     * @returns {this}
     */
    public prepend(value: TValue): this {
        this.data.unshift(value);

        return this;
    }

    /**
     * insert value at index
     *
     * @param {number} index
     * @param {TValue} value
     * @returns {this}
     */
    public insertAt(index: number, value: TValue): this {
        if (!Number.isInteger(index))
            throw new RangeError("Index must be an integer");

        if (index < 0 || index > this.data.length)
            throw new RangeError(`Index out of bounds: ${index}`);

        this.data.splice(index, 0, value);

        return this;
    }

    /**
     * replace value at index
     *
     * @param {number} index
     * @param {TValue} value
     * @returns {this}
     */
    public replaceAt(index: number, value: TValue): this {
        if (!Number.isInteger(index))
            throw new RangeError("Index must be an integer");

        if (index < 0 || index >= this.data.length)
            throw new RangeError(`Index out of bounds: ${index}`);

        this.data[index] = value;

        return this;
    }

    /*----------------------------------------*
     * Remove Operations
     *----------------------------------------*/

    /**
     * remove first occurrence of value
     *
     * @param {TValue} value
     * @returns {this}
     */
    public remove(value: TValue): this {
        const index = this.data.indexOf(value);

        if (index === -1) return this;

        this.data.splice(index, 1);

        return this;
    }

    /**
     * remove all occurrences of value
     *
     * @param {TValue} value
     * @returns {this}
     */
    public removeAll(value: TValue): this {
        let i = 0;

        while (i < this.data.length) {
            if (Json.isEqual(this.data[i], value)) {
                this.data.splice(i, 1);
            } else {
                i++;
            }
        }

        return this;
    }

    /**
     * remove value at index
     *
     * @param {number} index
     * @returns {this}
     */
    public removeAt(index: number): this {
        if (!Number.isInteger(index))
            throw new RangeError("Index must be an integer");

        if (index < 0 || index >= this.data.length) return this;

        this.data.splice(index, 1);

        return this;
    }

    /**
     * remove duplicates
     *
     * @returns {this}
     */
    public removeDuplicates(): this {
        if (this.size() <= 1) return this;

        this.data = [...new Set(this.data)];

        return this;
    }

    /**
     * remove all elements
     *
     * @param {Predicate<TValue>} predicate
     * @returns {this}
     */
    public removeWhere(predicate: Predicate<TValue>): this {
        if (this.isEmpty()) return this;

        let i = 0;

        while (i < this.data.length) {
            if (predicate(this.data[i], i)) {
                this.data.splice(i, 1);
            } else {
                i++;
            }
        }

        return this;
    }

    /**
     * clear all elements
     *
     * @returns {this}
     */
    public clear(): this {
        if (this.isEmpty()) return this;

        this.data.length = 0;

        return this;
    }

    /*----------------------------------------*
     * Query Operations
     *----------------------------------------*/

    /**
     * whether data contains value
     *
     * @param {TValue} value
     * @returns {boolean}
     */
    public has(value: TValue): boolean {
        return this.data.includes(value);
    }

    /**
     * whether data does not contain value
     *
     * @param {TValue} value
     * @returns {boolean}
     */
    public hasNot(value: TValue): boolean {
        return !this.has(value);
    }

    /**
     * whether data contains all of values
     *
     * @param {Array<TValue>} values
     * @returns {boolean}
     */
    public hasAll(values: Array<TValue>): boolean {
        if (this.isEmpty()) return false;

        if (values.length === 0) return true;

        return values.every((value) => this.has(value));
    }

    /**
     * whether data contains any of values
     *
     * @param {Array<TValue>} values
     * @returns {boolean}
     */
    public hasAny(values: Array<TValue>): boolean {
        if (values.length === 0 || this.isEmpty()) return false;

        return values.some((value) => this.has(value));
    }

    /**
     * whether data does not contain any of values
     *
     * @param {Array<TValue>} values
     * @returns {boolean}
     */
    public hasNone(values: Array<TValue>): boolean {
        return !this.hasAny(values);
    }

    /**
     * find first element
     *
     * @param {Predicate<TValue>} predicate
     * @returns {TValue | undefined}
     */
    public find(predicate: Predicate<TValue>): TValue | undefined {
        if (this.isEmpty()) return undefined;

        return this.data.find((value, index) => predicate(value, index));
    }

    /**
     * find last element
     *
     * @param {Predicate<TValue>} predicate
     * @returns {TValue | undefined}
     */
    public findLast(predicate: Predicate<TValue>): TValue | undefined {
        if (this.isEmpty()) return undefined;

        for (let i = this.data.length - 1; i >= 0; i--) {
            if (!predicate(this.data[i], i)) continue;

            return this.data[i];
        }

        return undefined;
    }

    /**
     * find index of first element
     *
     * @param {Predicate<TValue>} predicate
     * @returns {number | undefined}
     */
    public findIndex(predicate: Predicate<TValue>): number | undefined {
        if (this.isEmpty()) return undefined;

        const index = this.data.findIndex((value, index) =>
            predicate(value, index)
        );

        return index === -1 ? undefined : index;
    }

    /**
     * find index of last element
     *
     * @param {Predicate<TValue>} predicate
     * @returns {number | undefined}
     */
    public findLastIndex(predicate: Predicate<TValue>): number | undefined {
        if (this.isEmpty()) return undefined;

        for (let i = this.data.length - 1; i >= 0; i--) {
            if (!predicate(this.data[i], i)) continue;

            return i;
        }

        return undefined;
    }

    /**
     * whether any element
     *
     * @param {Predicate<TValue>} predicate
     * @returns {boolean}
     */
    public some(predicate: Predicate<TValue>): boolean {
        if (this.isEmpty()) return false;

        return this.data.some((value, index) => predicate(value, index));
    }

    /**
     * whether all elements
     *
     * @param {Predicate<TValue>} predicate
     * @returns {boolean}
     */
    public every(predicate: Predicate<TValue>): boolean {
        if (this.isEmpty()) return true;

        return this.data.every((value, index) => predicate(value, index));
    }

    /**
     * count elements
     *
     * @param {Predicate<TValue>} predicate
     * @returns {number}
     */
    public count(predicate: Predicate<TValue>): number {
        if (this.isEmpty()) return 0;

        let count = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (!predicate(this.data[i], i)) continue;

            count++;
        }

        return count;
    }

    /*----------------------------------------*
     * Array Transformations
     *----------------------------------------*/

    /**
     * filter elements
     *
     * @param {Predicate<TValue>} predicate
     * @returns {ArrayEntity<TValue>}
     */
    public filter(predicate: Predicate<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        return this.createInstance<TValue>(
            this.data.filter((value, index) => predicate(value, index))
        );
    }

    /**
     * filter elements by index
     *
     * @param {Array<number>} indexes
     * @returns {ArrayEntity<TValue>}
     */
    public filterByIndex(indexes: Array<number>): ArrayEntity<TValue> {
        if (this.isEmpty() || indexes.length === 0)
            return this.createInstance<TValue>();

        for (const index of indexes) {
            if (Number.isInteger(index)) continue;

            throw new RangeError("Indexes must be integers");
        }

        const result: TValue[] = [];
        const uniqueIndexes = [...new Set(indexes)].sort((a, b) => a - b);

        for (const index of uniqueIndexes) {
            if (index < 0) continue;
            if (index >= this.data.length) continue;

            result.push(this.data[index]);
        }

        return this.createInstance<TValue>(result);
    }

    /**
     * map elements
     *
     * @param {Mapper<TValue, TResult>} mapper
     * @returns {ArrayEntity<TResult>}
     */
    public map<TResult>(mapper: Mapper<TValue, TResult>): ArrayEntity<TResult> {
        if (this.isEmpty()) return this.createInstance<TResult>();

        return this.createInstance<TResult>(
            this.data.map((value, index) => mapper(value, index))
        );
    }

    /**
     * combine two data
     *
     * @param {Array<TOther>} other
     * @param {(first: TValue, second: TOther) => TResult} zipper
     * @returns {ArrayEntity<TResult>}
     */
    public zip<TOther, TResult>(
        other: Array<TOther>,
        zipper: (first: TValue, second: TOther) => TResult
    ): ArrayEntity<TResult> {
        if (this.isEmpty() || other.length === 0)
            return this.createInstance<TResult>();

        const length = Math.min(this.size(), other.length);
        const result: TResult[] = new Array(length);

        for (let i = 0; i < length; i++) {
            result[i] = zipper(this.data[i], other[i]);
        }

        return this.createInstance<TResult>(result);
    }

    /**
     * reduce data to single
     *
     * @param {Reducer<TValue, TResult>} reducer
     * @param {TResult} initialValue
     * @returns {TResult}
     */
    public reduce<TResult>(
        reducer: Reducer<TValue, TResult>,
        initialValue: TResult
    ): TResult {
        if (this.isEmpty()) return initialValue;

        return this.data.reduce(
            (accumulator, value, index) => reducer(accumulator, value, index),
            initialValue
        );
    }

    /**
     * get slice of data
     *
     * @param {number} [start=0]
     * @param {number} [end]
     * @returns {ArrayEntity<TValue>}
     */
    public slice(start: number = 0, end?: number): ArrayEntity<TValue> {
        if (!Number.isInteger(start))
            throw new RangeError("Start must be an integer");

        if (end !== undefined && !Number.isInteger(end))
            throw new RangeError("End must be an integer");

        if (this.isEmpty()) return this.createInstance<TValue>();

        return this.createInstance<TValue>(this.data.slice(start, end));
    }

    /**
     * take first n elements
     *
     * @param {number} count
     * @returns {ArrayEntity<TValue>}
     */
    public take(count: number): ArrayEntity<TValue> {
        if (!Number.isInteger(count))
            throw new RangeError("Count must be an integer");

        if (count <= 0 || this.isEmpty()) return this.createInstance<TValue>();

        return this.slice(0, Math.min(count, this.size()));
    }

    /**
     * take elements while predicate is true
     *
     * @param {Predicate<TValue>} predicate
     * @returns {ArrayEntity<TValue>}
     */
    public takeWhile(predicate: Predicate<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        let endIndex = 0;

        for (; endIndex < this.data.length; endIndex++) {
            if (!predicate(this.data[endIndex], endIndex)) break;
        }

        return this.slice(0, endIndex);
    }

    /**
     * skip first n elements
     *
     * @param {number} count
     * @returns {ArrayEntity<TValue>}
     */
    public skip(count: number): ArrayEntity<TValue> {
        if (!Number.isInteger(count))
            throw new RangeError("Count must be an integer");

        if (count <= 0) return this.createInstance<TValue>(this.data);

        if (count >= this.size()) return this.createInstance<TValue>();

        return this.slice(count);
    }

    /**
     * skip elements while predicate is true
     *
     * @param {Predicate<TValue>} predicate
     * @returns {ArrayEntity<TValue>}
     */
    public skipWhile(predicate: Predicate<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        let startIndex = 0;

        for (; startIndex < this.data.length; startIndex++) {
            if (!predicate(this.data[startIndex], startIndex)) break;
        }

        return this.slice(startIndex);
    }

    /**
     * group elements by key
     *
     * @param {Mapper<TValue, TKey>} keySelector
     * @returns {Map<TKey, ArrayEntity<TValue>>}
     */
    public groupBy<TKey>(
        keySelector: Mapper<TValue, TKey>
    ): Map<TKey, ArrayEntity<TValue>> {
        if (this.isEmpty()) return new Map<TKey, ArrayEntity<TValue>>();

        const groups = new Map<TKey, ArrayEntity<TValue>>();

        for (let i = 0; i < this.data.length; i++) {
            const value = this.data[i];
            const key = keySelector(value, i);

            if (!groups.has(key))
                groups.set(key, this.createInstance<TValue>());

            groups.get(key)!.add(value);
        }

        return groups;
    }

    /**
     * flatten nested arrays
     *
     * @returns {ArrayEntity<TFlat>}
     */
    public flatten<TFlat>(): ArrayEntity<TFlat> {
        if (this.isEmpty()) return this.createInstance<TFlat>();

        const result: TFlat[] = [];

        for (const value of this.data) {
            if (Array.isArray(value)) {
                result.push(...(value as unknown as TFlat[]));
            } else if (value instanceof ArrayEntity) {
                result.push(...(value.get() as unknown as TFlat[]));
            } else {
                result.push(value as unknown as TFlat);
            }
        }

        return this.createInstance<TFlat>(result);
    }

    /**
     * reverse elements
     *
     * @returns {ArrayEntity<TValue>}
     */
    public reverse(): ArrayEntity<TValue> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        return this.createInstance<TValue>([...this.data].reverse());
    }

    /*----------------------------------------*
     * Sort Operations
     *----------------------------------------*/

    /**
     * sort elements
     *
     * @param {Comparator<TValue>} comparator
     * @returns {this}
     */
    public sort(comparator: Comparator<TValue>): this {
        if (this.size() <= 1) return this;

        this.data.sort((a, b) => comparator(a, b));

        return this;
    }

    /**
     * sort elements by property
     *
     * @param {Mapper<TValue, TKey>} keySelector
     * @param {boolean} [descending=false]
     * @returns {this}
     */
    public sortBy<TKey>(
        keySelector: Mapper<TValue, TKey>,
        descending: boolean = false
    ): this {
        if (this.size() <= 1) return this;

        type KeyValuePair = { key: TKey; index: number };
        const keys: KeyValuePair[] = this.data.map((value, index) => ({
            key: keySelector(value, index),
            index,
        }));

        const indexMap = keys
            .sort((a, b) => {
                if (a.key < b.key) return descending ? 1 : -1;
                if (a.key > b.key) return descending ? -1 : 1;
                return 0;
            })
            .map((pair) => pair.index);

        const sorted = indexMap.map((index) => this.data[index]);

        this.data = sorted;

        return this;
    }

    /**
     * create sorted copy without modifying original
     *
     * @param {Comparator<TValue>} comparator
     * @returns {ArrayEntity<TValue>}
     */
    public sorted(comparator: Comparator<TValue>): ArrayEntity<TValue> {
        if (this.size() <= 1) return this.createInstance<TValue>(this.data);

        const copy = this.createInstance<TValue>(this.data);

        return copy.sort(comparator);
    }

    /**
     * create sorted copy by property without modifying original
     *
     * @param {Mapper<TValue, TKey>} keySelector
     * @param {boolean} [descending=false]
     * @returns {ArrayEntity<TValue>}
     */
    public sortedBy<TKey>(
        keySelector: Mapper<TValue, TKey>,
        descending: boolean = false
    ): ArrayEntity<TValue> {
        if (this.size() <= 1) return this.createInstance<TValue>(this.data);

        const copy = this.createInstance<TValue>(this.data);

        return copy.sortBy(keySelector, descending);
    }

    /*----------------------------------------*
     * Iteration
     *----------------------------------------*/

    /**
     * iterate over elements
     *
     * @param {Action<TValue>} action
     * @returns {this}
     */
    public each(action: Action<TValue>): this {
        if (this.isEmpty()) return this;

        for (let i = 0; i < this.data.length; i++) {
            action(this.data[i], i);
        }

        return this;
    }

    /**
     * iterate over elements match predicate
     *
     * @param {Predicate<TValue>} predicate
     * @param {Action<TValue>} action
     * @returns {this}
     */
    public eachWhere(
        predicate: Predicate<TValue>,
        action: Action<TValue>
    ): this {
        if (this.isEmpty()) return this;

        for (let i = 0; i < this.data.length; i++) {
            const value = this.data[i];

            if (!predicate(value, i)) continue;

            action(value, i);
        }

        return this;
    }

    /**
     * iterate over elements in slices
     *
     * @param {Action<TValue>} action
     * @param {number} [start=0]
     * @param {number} [end]
     * @returns {this}
     */
    public eachSlice(
        action: Action<TValue>,
        start: number = 0,
        end?: number
    ): this {
        if (!Number.isInteger(start))
            throw new RangeError("Start must be an integer");

        if (end !== undefined && !Number.isInteger(end))
            throw new RangeError("End must be an integer");

        if (this.isEmpty()) return this;

        const actualEnd =
            end === undefined
                ? this.data.length
                : Math.min(end, this.data.length);
        const actualStart = Math.max(0, start);

        if (actualStart >= actualEnd) return this;

        for (let i = actualStart; i < actualEnd; i++) {
            action(this.data[i], i);
        }

        return this;
    }

    /**
     * iterate over each elements with context
     *
     * @param {(value: TValue, index: number, ...context: TContext[]) => void} action
     * @param {TContext[]} context
     * @returns {this}
     */
    public eachWith<TContext>(
        action: (value: TValue, index: number, ...context: TContext[]) => void,
        ...context: TContext[]
    ): this {
        if (this.isEmpty()) return this;

        for (let i = 0; i < this.data.length; i++) {
            action(this.data[i], i, ...context);
        }

        return this;
    }

    /*----------------------------------------*
     * Async Operations
     *----------------------------------------*/

    /**
     * iterate asynchronously over elements
     *
     * @param {AsyncAction<TValue>} action
     * @returns {Promise<this>}
     */
    public async eachAsync(action: AsyncAction<TValue>): Promise<this> {
        if (this.isEmpty()) return this;

        for (let i = 0; i < this.data.length; i++) {
            await action(this.data[i], i);
        }

        return this;
    }

    /**
     * iterate asynchronously with concurrency limit
     *
     * @param {AsyncAction<TValue>} action
     * @param {number} concurrency
     * @returns {Promise<this>}
     */
    public async eachAsyncLimit(
        action: AsyncAction<TValue>,
        concurrency: number
    ): Promise<this> {
        if (!Number.isInteger(concurrency) || concurrency < 1)
            throw new RangeError("Concurrency must be a positive integer");

        if (this.isEmpty()) return this;

        const items = [...this.data];
        let activeCount = 0;
        let itemIndex = 0;

        const runTask = async (index: number) => {
            try {
                await action(items[index], index);
            } finally {
                activeCount--;
            }
        };

        const next = () => {
            while (activeCount < concurrency && itemIndex < items.length) {
                activeCount++;
                runTask(itemIndex++);
            }
        };

        next();

        while (activeCount > 0 || itemIndex < items.length) {
            await new Promise((resolve) => setTimeout(resolve, 0));

            next();
        }

        return this;
    }

    /**
     * map elements asynchronously
     *
     * @param {AsyncMapper<TValue, TResult>} mapper
     * @returns {Promise<ArrayEntity<TResult>>}
     */
    public async mapAsync<TResult>(
        mapper: AsyncMapper<TValue, TResult>
    ): Promise<ArrayEntity<TResult>> {
        if (this.isEmpty()) return this.createInstance<TResult>();

        const result = this.createInstance<TResult>();

        await this.eachAsync(async (value, index) => {
            result.add(await mapper(value, index));
        });

        return result;
    }

    /**
     * map elements asynchronously with concurrency limit
     *
     * @param {AsyncMapper<TValue, TResult>} mapper
     * @param {number} concurrency
     * @returns {Promise<ArrayEntity<TResult>>}
     */
    public async mapAsyncLimit<TResult>(
        mapper: AsyncMapper<TValue, TResult>,
        concurrency: number
    ): Promise<ArrayEntity<TResult>> {
        if (!Number.isInteger(concurrency) || concurrency < 1)
            throw new RangeError("Concurrency must be a positive integer");

        if (this.isEmpty()) return this.createInstance<TResult>();

        const items = [...this.data];
        const results: TResult[] = new Array(items.length);
        let activeCount = 0;
        let itemIndex = 0;

        const runTask = async (index: number) => {
            try {
                results[index] = await mapper(items[index], index);
            } finally {
                activeCount--;
            }
        };

        const next = () => {
            while (activeCount < concurrency && itemIndex < items.length) {
                activeCount++;
                runTask(itemIndex++);
            }
        };

        next();

        while (activeCount > 0 || itemIndex < items.length) {
            await new Promise((resolve) => setTimeout(resolve, 0));

            next();
        }

        return this.createInstance<TResult>(results);
    }

    /**
     * filter elements asynchronously
     *
     * @param {AsyncPredicate<TValue>} predicate
     * @returns {Promise<ArrayEntity<TValue>>}
     */
    public async filterAsync(
        predicate: AsyncPredicate<TValue>
    ): Promise<ArrayEntity<TValue>> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        const result = this.createInstance<TValue>();

        await this.eachAsync(async (value, index) => {
            if (await predicate(value, index)) {
                result.add(value);
            }
        });

        return result;
    }

    /**
     * execute action asynchronously in parallel
     *
     * @param {AsyncAction<TValue>} action
     * @returns {Promise<this>}
     */
    public async eachAsyncParallel(action: AsyncAction<TValue>): Promise<this> {
        if (this.isEmpty()) return this;

        const promises = this.data.map((value, index) => action(value, index));

        await Promise.all(promises);

        return this;
    }

    /**
     * map elements asynchronously in parallel
     *
     * @param {AsyncMapper<TValue, TResult>} mapper
     * @returns {Promise<ArrayEntity<TResult>>}
     */
    public async mapAsyncParallel<TResult>(
        mapper: AsyncMapper<TValue, TResult>
    ): Promise<ArrayEntity<TResult>> {
        if (this.isEmpty()) return this.createInstance<TResult>();

        const promises = this.data.map((value, index) => mapper(value, index));

        const results = await Promise.all(promises);

        return this.createInstance<TResult>(results);
    }

    /*----------------------------------------*
     * Set Operations
     *----------------------------------------*/

    /**
     * create union with another data
     *
     * @param {Array<TValue>} other
     * @returns {ArrayEntity<TValue>}
     */
    public union(other: Array<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty() && (!other || other.length === 0))
            return this.createInstance<TValue>();

        if (this.isEmpty()) return this.createInstance<TValue>(other);

        if (!other || other.length === 0)
            return this.createInstance<TValue>(this.data);

        return this.createInstance<TValue>([
            ...new Set([...this.data, ...other]),
        ]);
    }

    /**
     * create intersection with another data
     *
     * @param {Array<TValue>} other
     * @returns {ArrayEntity<TValue>}
     */
    public intersection(other: Array<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty() || !other || other.length === 0)
            return this.createInstance<TValue>();

        const otherSet = new Set(other);
        const result: TValue[] = [];
        const seen = new Set<TValue>();

        for (const value of this.data) {
            if (seen.has(value)) continue;
            if (!otherSet.has(value)) continue;

            result.push(value);

            seen.add(value);
        }

        return this.createInstance<TValue>(result);
    }

    /**
     * create difference with another data
     *
     * @param {Array<TValue>} other
     * @returns {ArrayEntity<TValue>}
     */
    public difference(other: Array<TValue>): ArrayEntity<TValue> {
        if (this.isEmpty()) return this.createInstance<TValue>();

        if (!other || other.length === 0)
            return this.createInstance<TValue>(this.data);

        const otherSet = new Set(other);

        return this.createInstance<TValue>(
            this.data.filter((value) => !otherSet.has(value))
        );
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * make entity instance
     *
     * @param {Array<TValue>} values
     * @returns {this<TValue>}
     */
    public static make<TValue>(
        values: Array<TValue> = []
    ): ArrayEntity<TValue> {
        return new this<TValue>(values);
    }

    /**
     * create empty
     *
     * @returns {this<TValue>}
     */
    public static empty<TValue>(): ArrayEntity<TValue> {
        return this.make<TValue>([]);
    }

    /**
     * create from data
     *
     * @param {Array<TValue>} values
     * @returns {this<TValue>}
     */
    public static from<TValue>(values?: Array<TValue>): ArrayEntity<TValue> {
        return this.make<TValue>(values);
    }

    /**
     * create range of numbers
     *
     * @param {number} start
     * @param {number} end
     * @param {number} [step=1]
     * @returns {this<TValue>}
     */
    public static range(
        start: number,
        end: number,
        step: number = 1
    ): ArrayEntity<number> {
        if (step === 0) throw new RangeError("Step cannot be zero");

        if ((step > 0 && start >= end) || (step < 0 && start <= end))
            return this.empty<number>();

        const size = Math.ceil(Math.abs((end - start) / step));
        const result = new Array(size);

        for (let i = 0, value = start; i < size; i++, value += step) {
            result[i] = value;
        }

        return this.from(result);
    }

    /**
     * concatenate multiple data
     *
     * @param {Array<TValue>[]} arrays
     * @returns {this<TValue>}
     */
    public static concat<TValue>(
        ...arrays: Array<TValue>[]
    ): ArrayEntity<TValue> {
        if (arrays.length === 0) return this.empty<TValue>();

        let totalLength = 0;
        for (const array of arrays) {
            totalLength += array?.length || 0;
        }

        if (totalLength === 0) return this.empty<TValue>();

        const result = new Array<TValue>(totalLength);
        let index = 0;

        for (const array of arrays) {
            if (!array || array.length === 0) continue;

            for (const item of array) {
                result[index++] = item;
            }
        }

        return this.from(result);
    }

    /**
     * create repeated data
     *
     * @param {TValue} value
     * @param {number} count
     * @returns {this<TValue>}
     */
    public static repeat<TValue>(
        value: TValue,
        count: number
    ): ArrayEntity<TValue> {
        if (!Number.isInteger(count))
            throw new RangeError("Count must be an integer");

        if (count <= 0) return this.empty<TValue>();

        return this.from(new Array(count).fill(value));
    }
}
