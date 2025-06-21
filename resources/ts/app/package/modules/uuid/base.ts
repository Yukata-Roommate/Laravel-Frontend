/*****************************************
 * Package Module UUID Generator
 *
 * Base
 *****************************************/

/**
 * Base Generator
 */
export abstract class BaseGenerator {
    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate uuid
     *
     * @returns {string}
     */
    public generate(): string {
        const randomNumbers = this.randomNumbers();

        const uint8Array = this.generateUint8Array(randomNumbers);

        const uuid = this.stringify(uint8Array);

        this.validate(uuid);

        return uuid;
    }

    /**
     * generate uuid uint8array
     *
     * @param {Uint8Array} randomNumbers
     * @returns {Uint8Array}
     */
    protected abstract generateUint8Array(
        randomNumbers: Uint8Array
    ): Uint8Array;

    /*----------------------------------------*
     * Random Numbers
     *----------------------------------------*/

    /**
     * random number pool
     *
     * @type {Uint8Array}
     */
    protected rndsPool: Uint8Array = new Uint8Array(256);

    /**
     * random number pool pointer
     *
     * @type {number}
     */
    protected poolPtr: number = 0;

    /**
     * generate random number
     *
     * @returns {Uint8Array}
     */
    protected randomNumbers(): Uint8Array {
        if (this.poolPtr > this.rndsPool.length - 16) {
            crypto.getRandomValues(this.rndsPool);

            this.poolPtr = 0;
        }

        return this.rndsPool.slice(this.poolPtr, (this.poolPtr += 16));
    }

    /*----------------------------------------*
     * Stringify
     *----------------------------------------*/

    /**
     * byte to hex cache
     *
     * @type {string[]}
     */
    protected byteToHex: string[] = Array.from({ length: 256 }, (_, i) =>
        (i + 0x100).toString(16).slice(1)
    );

    /**
     * stringify byte array to hex string
     *
     * @param {Uint8Array} uint8Array
     * @returns {string}
     */
    protected stringify(uint8Array: Uint8Array): string {
        return (
            this.byteToHex[uint8Array[0]] +
            this.byteToHex[uint8Array[1]] +
            this.byteToHex[uint8Array[2]] +
            this.byteToHex[uint8Array[3]] +
            "-" +
            this.byteToHex[uint8Array[4]] +
            this.byteToHex[uint8Array[5]] +
            "-" +
            this.byteToHex[uint8Array[6]] +
            this.byteToHex[uint8Array[7]] +
            "-" +
            this.byteToHex[uint8Array[8]] +
            this.byteToHex[uint8Array[9]] +
            "-" +
            this.byteToHex[uint8Array[10]] +
            this.byteToHex[uint8Array[11]] +
            this.byteToHex[uint8Array[12]] +
            this.byteToHex[uint8Array[13]] +
            this.byteToHex[uint8Array[14]] +
            this.byteToHex[uint8Array[15]]
        ).toLowerCase();
    }

    /*----------------------------------------*
     * Validate
     *----------------------------------------*/

    /**
     * uuid regex
     *
     * @type {RegExp}
     */
    protected regex: RegExp =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

    /**
     * validate uuid
     *
     * @param {unknown} uuid
     * @returns {void}
     */
    public validate(uuid: unknown): void {
        if (this.isValid(uuid)) return;

        throw new Error(`Invalid UUID. uuid: ${uuid}`);
    }

    /**
     * whether uuid is valid
     *
     * @param {unknown} uuid
     * @returns {boolean}
     */
    public isValid(uuid: unknown): boolean {
        return typeof uuid === "string" && this.regex.test(uuid);
    }
}
