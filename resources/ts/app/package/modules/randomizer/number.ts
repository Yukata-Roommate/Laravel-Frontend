/*****************************************
 * Package Module Randomizer
 *
 * Number
 *****************************************/

import { BaseRandomizer } from "./base";

import { NumberOptions } from "./types";

/**
 * Number Randomizer
 */
export class NumberRandomizer extends BaseRandomizer {
    /**
     * min value default
     *
     * @type {number}
     */
    protected minValueDefault: number = 0;

    /**
     * max value default
     *
     * @type {number}
     */
    protected maxValueDefault: number = Number.MAX_SAFE_INTEGER;

    /**
     * get random number
     *
     * @param {NumberOptions} options
     * @returns {number}
     */
    public number(options: NumberOptions): number {
        const min = this.minValue(options.min);
        const max = this.maxValue(options.max);

        if (min > max)
            throw new Error("Min value cannot be greater than max value.");

        const range = max - min + 1;

        return Math.floor(Math.random() * range) + min;
    }

    /**
     * get min value
     *
     * @param {number | undefined} value
     * @returns {number}
     */
    protected minValue(value?: number): number {
        const minValue = value || this.minValueDefault;

        if (minValue < 0)
            throw new Error("Min value must be greater than or equal to 0.");

        return minValue;
    }

    /**
     * get max value
     *
     * @param {number | undefined} value
     * @returns {number}
     */
    protected maxValue(value?: number): number {
        const maxValue = value || this.maxValueDefault;

        if (maxValue < 0)
            throw new Error("Max value must be greater than or equal to 0.");

        return maxValue;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * number randomizer instance
     *
     * @type {NumberRandomizer}
     */
    public static readonly instance: NumberRandomizer = new NumberRandomizer();

    /**
     * get random number
     *
     * @param {NumberOptions} options
     * @returns {number}
     */
    public static number(options: NumberOptions): number {
        return this.instance.number(options);
    }
}
