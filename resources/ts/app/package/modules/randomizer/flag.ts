/*****************************************
 * Package Module Randomizer
 *
 * Flag
 *****************************************/

import { BaseRandomizer } from "./base";

import { FlagOptions } from "./types";

/**
 * Flag Randomizer
 */
export class FlagRandomizer extends BaseRandomizer {
    /**
     * true count default
     *
     * @type {number}
     */
    protected trueCountDefault: number = 1;

    /**
     * false count default
     *
     * @type {number}
     */
    protected falseCountDefault: number = 1;

    /**
     * get random flag
     *
     * @param {FlagOptions} options
     * @returns {boolean}
     */
    public flag(options: FlagOptions): boolean {
        const trueCount = this.trueCount(options.true);
        const falseCount = this.falseCount(options.false);

        const totalCount = trueCount + falseCount;

        return Math.random() < trueCount / totalCount;
    }

    /**
     * get true count
     *
     * @param {number | undefined} count
     * @returns {number}
     */
    protected trueCount(count?: number): number {
        const trueCount = count || this.trueCountDefault;

        if (trueCount < 0)
            throw new Error("True count must be greater than or equal to 0.");

        return trueCount;
    }

    /**
     * get false count
     *
     * @param {number | undefined} count
     * @returns {number}
     */
    protected falseCount(count?: number): number {
        const falseCount = count || this.falseCountDefault;

        if (falseCount < 0)
            throw new Error("False count must be greater than or equal to 0.");

        return falseCount;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * flag randomizer instance
     *
     * @type {FlagRandomizer}
     */
    public static readonly instance: FlagRandomizer = new FlagRandomizer();

    /**
     * get random flag
     *
     * @param {FlagOptions} options
     * @returns {boolean}
     */
    public static flag(options: FlagOptions): boolean {
        return this.instance.flag(options);
    }
}
