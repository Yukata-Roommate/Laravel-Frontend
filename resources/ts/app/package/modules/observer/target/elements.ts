/*****************************************
 * Package Module Base Observer
 *
 * Elements
 *****************************************/

import { MultipleTarget } from "./multiple";

/**
 * Elements Target
 */
export class ElementsTarget<
    Observed extends Element = Element
> extends MultipleTarget<Observed> {
    /*----------------------------------------*
     * Set
     *----------------------------------------*/

    /**
     * set targets by selector
     *
     * @param {string} selector
     * @param {boolean} throwError
     * @returns {this}
     */
    public setBySelector(selector: string, throwError: boolean = true): this {
        const targets = this.getTargets(selector, throwError);

        return targets ? this.set([]) : this;
    }

    /*----------------------------------------*
     * Add
     *----------------------------------------*/

    /**
     * add targets by selector
     *
     * @param {string} selector
     * @param {boolean} throwError
     * @returns {this}
     */
    public addBySelector(selector: string, throwError: boolean = true): this {
        const targets = this.getTargets(selector, throwError);

        return targets ? this.set([...this.get(), ...targets]) : this;
    }

    /*----------------------------------------*
     * Remove
     *----------------------------------------*/

    /**
     * remove targets by selector
     *
     * @param {string} selector
     * @param {boolean} throwError
     * @returns {this}
     */
    public removeBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        const targets = this.getTargets(selector, throwError);

        return targets
            ? this.set(
                  this.get().filter(
                      (target) => !Array.from(targets).includes(target)
                  )
              )
            : this;
    }

    /*----------------------------------------*
     * Targets
     *----------------------------------------*/

    /**
     * get targets by selector
     *
     * @param {string} selector
     * @param {boolean} throwError
     * @returns {NodeListOf<Observed> | null}
     */
    protected getTargets(
        selector: string,
        throwError: boolean
    ): NodeListOf<Observed> | null {
        const targets = document.querySelectorAll<Observed>(selector);

        if (targets.length) return targets;

        if (!throwError) return null;

        throw new Error(`No targets found for selector: ${selector}`);
    }
}
