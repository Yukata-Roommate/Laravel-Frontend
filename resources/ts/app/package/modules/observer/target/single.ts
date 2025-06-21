/*****************************************
 * Package Module Observer Target
 *
 * Single
 *****************************************/

/**
 * Single Target
 */
export class SingleTarget<Observed extends Node = Node> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed target
     *
     * @type {Observed | null}
     */
    protected _target: Observed | null = null;

    /*----------------------------------------*
     * Operation
     *----------------------------------------*/

    /**
     * get observed target
     *
     * @returns {Observed | null}
     */
    public get(): Observed | null {
        return this._target;
    }

    /**
     * whether is target empty
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return this._target === null;
    }

    /**
     * set target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public set(target: Observed): this {
        this._target = target;

        return this;
    }

    /**
     * clear target
     *
     * @returns {this}
     */
    public clear(): this {
        this._target = null;

        return this;
    }

    /*----------------------------------------*
     * Error
     *----------------------------------------*/

    /**
     * get empty error
     *
     * @returns {Error}
     */
    public emptyError(): Error {
        return new Error("Target is empty");
    }
}
