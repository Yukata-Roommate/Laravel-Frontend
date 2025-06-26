/*****************************************
 * Package Module History
 *
 * History
 *****************************************/

import type { HistoryState } from "./types";

import { Json } from "../json";

/**
 * History
 */
export class History<TValue> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * histories
     *
     * @type {HistoryState<TValue>[]}
     */
    protected histories: HistoryState<TValue>[] = [];

    /**
     * current index
     *
     * @type {number}
     */
    protected currentIndex: number = -1;

    /**
     * max history size
     *
     * @type {number}
     */
    protected readonly maxHistorySize: number;

    /**
     * constructor
     *
     * @param {number} maxHistorySize
     */
    public constructor(maxHistorySize: number = 100) {
        if (!Number.isInteger(maxHistorySize) || maxHistorySize <= 0)
            throw new Error("Max history size must be greater than 0");

        this.maxHistorySize = maxHistorySize;
    }

    /**
     * clear all histories
     *
     * @returns {void}
     */
    public clear(): void {
        this.histories.length = 0;
        this.currentIndex = -1;
    }

    /*----------------------------------------*
     * Index
     *----------------------------------------*/

    /**
     * get current history index
     *
     * @return {number}
     */
    public get index(): number {
        return this.currentIndex;
    }

    /**
     * whether is at first history index
     *
     * @return {boolean}
     */
    public isAtFirst(): boolean {
        return this.currentIndex === 0;
    }

    /**
     * whether is at latest history index
     *
     * @return {boolean}
     */
    public isAtLatest(): boolean {
        return this.currentIndex === this.size - 1;
    }

    /**
     * whether has next history
     *
     * @return {boolean}
     */
    public hasNext(): boolean {
        return this.currentIndex >= 0 && this.currentIndex + 1 < this.size;
    }

    /**
     * whether has previous history
     *
     * @return {boolean}
     */
    public hasPrevious(): boolean {
        return this.currentIndex > 0;
    }

    /**
     * whether has history at index
     *
     * @param {number} index
     * @return {boolean}
     */
    public hasAt(index: number): boolean {
        return Number.isInteger(index) && index >= 0 && index < this.size;
    }

    /**
     * go to next history index
     *
     * @return {this}
     */
    public next(): this {
        if (!this.hasNext()) throw new Error("No next history available");

        this.currentIndex++;

        return this;
    }

    /**
     * go to previous history index
     *
     * @return {this}
     */
    public previous(): this {
        if (!this.hasPrevious())
            throw new Error("No previous history available");

        this.currentIndex--;

        return this;
    }

    /**
     * go to history index
     *
     * @param {number} index
     * @return {this}
     */
    public goTo(index: number): this {
        if (!this.hasAt(index))
            throw new Error(
                `Invalid history index: ${index}. value range: 0 - ${
                    this.size - 1
                }`
            );

        this.currentIndex = index;

        return this;
    }

    /**
     * go to first history index
     *
     * @return {this}
     */
    public first(): this {
        if (this.isEmpty) throw new Error("History is empty");

        this.currentIndex = 0;

        return this;
    }

    /**
     * go to last history index
     *
     * @return {this}
     */
    public last(): this {
        if (this.isEmpty) throw new Error("History is empty");

        this.currentIndex = this.size - 1;

        return this;
    }

    /**
     * get number of available undo operations
     *
     * @return {number}
     */
    public undoCount(): number {
        return Math.max(0, this.currentIndex);
    }

    /**
     * get number of available redo operations
     *
     * @return {number}
     */
    public redoCount(): number {
        return Math.max(0, this.size - this.currentIndex - 1);
    }

    /*----------------------------------------*
     * Size
     *----------------------------------------*/

    /**
     * get history size
     *
     * @return {number}
     */
    public get size(): number {
        return this.histories.length;
    }

    /**
     * whether history is empty
     *
     * @return {boolean}
     */
    public get isEmpty(): boolean {
        return this.size === 0;
    }

    /*----------------------------------------*
     * History
     *----------------------------------------*/

    /**
     * get histories
     *
     * @return {HistoryState<TValue>[]}
     */
    public get all(): readonly HistoryState<TValue>[] {
        return Object.freeze([...this.histories]);
    }

    /**
     * get history values
     *
     * @return {TValue[]}
     */
    public get allValues(): readonly TValue[] {
        return Object.freeze(this.histories.map((history) => history.value));
    }

    /**
     * get history at index
     *
     * @param {number} index
     * @return {HistoryState<TValue>}
     */
    public at(index: number): HistoryState<TValue> {
        if (!this.hasAt(index))
            throw new Error(
                `Invalid history index: ${index}. value range: 0 - ${
                    this.size - 1
                }`
            );

        return this.histories[index];
    }

    /**
     * get history value at index
     *
     * @param {number} index
     * @return {TValue}
     */
    public valueAt(index: number): TValue {
        return this.at(index).value;
    }

    /**
     * get current history
     *
     * @return {HistoryState<TValue>}
     */
    public get currentHistory(): HistoryState<TValue> {
        if (this.currentIndex < 0 || !this.hasAt(this.currentIndex))
            throw new Error("No current history available");

        return this.histories[this.currentIndex];
    }

    /**
     * get current history value
     *
     * @return {TValue}
     */
    public get currentValue(): TValue {
        return this.currentHistory.value;
    }

    /**
     * get next history
     *
     * @return {HistoryState<TValue>}
     */
    public get nextHistory(): HistoryState<TValue> {
        if (!this.hasNext()) throw new Error("No next history available");

        return this.histories[this.currentIndex + 1];
    }

    /**
     * get next history value
     *
     * @return {TValue}
     */
    public get nextValue(): TValue {
        return this.nextHistory.value;
    }

    /**
     * get previous history
     *
     * @return {HistoryState<TValue>}
     */
    public get previousHistory(): HistoryState<TValue> {
        if (!this.hasPrevious())
            throw new Error("No previous history available");

        return this.histories[this.currentIndex - 1];
    }

    /**
     * get previous history value
     *
     * @return {TValue}
     */
    public get previousValue(): TValue {
        return this.previousHistory.value;
    }

    /**
     * get last history
     *
     * @return {HistoryState<TValue>}
     */
    public get lastHistory(): HistoryState<TValue> {
        if (this.isEmpty) throw new Error("History is empty");

        return this.histories[this.size - 1];
    }

    /**
     * get last history value
     *
     * @return {TValue}
     */
    public get lastValue(): TValue {
        return this.lastHistory.value;
    }

    /*----------------------------------------*
     * Save
     *----------------------------------------*/

    /**
     * save value
     *
     * @param {TValue} value
     * @returns {this}
     */
    public save(value: TValue): this {
        this.validateValue(value);

        if (this.shouldSkipSave(value)) return this;

        try {
            const history = this.makeHistory(value);

            this.addHistory(history);

            this.maintainMaxSize();
        } catch (error) {
            throw new Error(
                `Failed to save history: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }

        return this;
    }

    /**
     * validate value
     *
     * @param {TValue} value
     * @return {void}
     */
    protected validateValue(value: TValue): void {
        if (value === undefined) throw new Error("Cannot save undefined value");
        if (value === null) throw new Error("Cannot save null value");
    }

    /**
     * should skip save
     *
     * @param {TValue} value
     * @return {boolean}
     */
    protected shouldSkipSave(value: TValue): boolean {
        if (this.currentIndex < 0 || this.isEmpty) return false;

        try {
            return Json.isDeepEqual(this.currentValue, value);
        } catch {
            return false;
        }
    }

    /**
     * make history
     *
     * @param {TValue} value
     * @returns {HistoryState<TValue>}
     */
    protected makeHistory(value: TValue): HistoryState<TValue> {
        return {
            value: value,
            timestamp: Date.now(),
        };
    }

    /**
     * add history
     *
     * @param {HistoryState<TValue>} history
     * @returns {void}
     */
    protected addHistory(history: HistoryState<TValue>): void {
        this.histories.length = Math.max(0, this.currentIndex + 1);

        this.histories.push(history);

        this.currentIndex = this.histories.length - 1;
    }

    /**
     * maintain history size within max limit
     *
     * @return {void}
     */
    protected maintainMaxSize(): void {
        if (this.histories.length <= this.maxHistorySize) return;

        const removeCount = this.histories.length - this.maxHistorySize;
        this.histories.splice(0, removeCount);
        this.currentIndex = Math.max(-1, this.currentIndex - removeCount);
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * make history instance
     *
     * @param {number} maxHistorySize
     * @returns {this<TValue>}
     */
    public static make<TValue>(maxHistorySize: number = 100): History<TValue> {
        return new this<TValue>(maxHistorySize);
    }
}
