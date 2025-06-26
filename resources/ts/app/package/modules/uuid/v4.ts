/*****************************************
 * Package Module UUID Generator
 *
 * Version 4
 *****************************************/

import { BaseGenerator } from "./base";

import { VERSION_4, VARIANT_RFC4122 } from "./constants";

/**
 * V4 Generator
 */
export class V4Generator extends BaseGenerator {
    /**
     * generate uuid uint8array
     *
     * @param {Uint8Array} randomNumbers
     * @returns {Uint8Array}
     */
    protected generateUint8Array(randomNumbers: Uint8Array): Uint8Array {
        const uuids = randomNumbers;

        uuids[6] = (randomNumbers[6] & 0x0f) | VERSION_4;
        uuids[8] = (randomNumbers[8] & 0x3f) | VARIANT_RFC4122;

        return uuids;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * v4 generator instance
     *
     * @type {V4Generator}
     */
    public static readonly instance: V4Generator = new V4Generator();

    /**
     * generate uuid v4
     *
     * @returns {string}
     */
    public static generate(): string {
        return this.instance.generate();
    }
}
