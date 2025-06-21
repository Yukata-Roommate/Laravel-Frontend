/*****************************************
 * Package Module UUID Generator
 *
 * Version 7
 *****************************************/

import { BaseGenerator } from "./base";

import { V7State } from "./types";
import { VERSION_7, VARIANT_RFC4122 } from "./constants";

/**
 * V7 Generator
 */
export class V7Generator extends BaseGenerator {
    /**
     * state
     *
     * @type {V7State}
     */
    protected _state: V7State = {
        milliseconds: -Infinity,
        sequence: 0,
    };

    /**
     * get state
     *
     * @returns {V7State}
     */
    protected get state(): V7State {
        const now = Date.now();

        if (now > this.state.milliseconds) {
            this.state.sequence =
                (this.randomNumbers[6] << 23) |
                (this.randomNumbers[7] << 16) |
                (this.randomNumbers[8] << 8) |
                this.randomNumbers[9];
            this.state.milliseconds = now;
        } else {
            this.state.sequence = (this.state.sequence + 1) | 0;

            if (this.state.sequence === 0) this.state.milliseconds++;
        }

        return this._state;
    }

    /**
     * generate uuid uint8array
     *
     * @param {Uint8Array} randomNumbers
     * @returns {Uint8Array}
     */
    protected generateUint8Array(randomNumbers: Uint8Array): Uint8Array {
        const state = this.state;
        const uuids = new Uint8Array(16);

        uuids[0] = (state.milliseconds / 0x10000000000) & 0xff;
        uuids[1] = (state.milliseconds / 0x100000000) & 0xff;
        uuids[2] = (state.milliseconds / 0x1000000) & 0xff;
        uuids[3] = (state.milliseconds / 0x10000) & 0xff;
        uuids[4] = (state.milliseconds / 0x100) & 0xff;
        uuids[5] = state.milliseconds & 0xff;

        uuids[6] = VERSION_7 | ((state.sequence >>> 28) & 0x0f);
        uuids[7] = (state.sequence >>> 20) & 0xff;
        uuids[8] = VARIANT_RFC4122 | ((state.sequence >>> 14) & 0x3f);
        uuids[9] = (state.sequence >>> 6) & 0xff;
        uuids[10] = ((state.sequence << 2) & 0xff) | (uuids[10] & 0x03);

        uuids[11] = randomNumbers[11];
        uuids[12] = randomNumbers[12];
        uuids[13] = randomNumbers[13];
        uuids[14] = randomNumbers[14];
        uuids[15] = randomNumbers[15];

        return uuids;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * v7 generator instance
     *
     * @type {V7Generator}
     */
    public static readonly instance: V7Generator = new V7Generator();

    /**
     * generate uuid v7
     *
     * @returns {string}
     */
    public static generate(): string {
        return this.instance.generate();
    }
}
