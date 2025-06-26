/*****************************************
 * Package Module Base Observer
 *
 * Multiple
 *****************************************/

/**
 * Multiple Target
 */
export class MultipleTarget<Observed extends Node = Node> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed targets
     *
     * @type {Observed[]}
     */
    protected _targets: Observed[] = [];

    /*----------------------------------------*
     * Operation
     *----------------------------------------*/

    /**
     * get observed targets
     *
     * @returns {Observed[]}
     */
    public get(): Observed[] {
        return [...this._targets];
    }

    /**
     * whether is targets empty
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return this._targets.length === 0;
    }

    /**
     * set targets
     *
     * @param {Observed[]} targets
     * @returns {this}
     */
    public set(targets: Observed[]): this {
        this._targets = [...targets];

        return this;
    }

    /**
     * clear targets
     *
     * @returns {this}
     */
    public clear(): this {
        return this.set([]);
    }

    /**
     * add target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public add(target: Observed): this {
        return this.set([...this._targets, target]);
    }

    /**
     * remove target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public remove(target: Observed): this {
        return this.set(this._targets.filter((t) => t !== target));
    }
    /**
     * iterate targets
     *
     * @param {(target: Observed) => void} callback
     * @returns {this}
     */
    public each(callback: (target: Observed) => void): this {
        this._targets.forEach((target) => {
            callback(target);
        });

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
        return new Error("Targets are empty");
    }
}
