/*****************************************
 * Package Module Base Observer
 *
 * Elements
 *****************************************/

import { SingleTarget } from "./single";

/**
 * Element Target
 */
export class ElementTarget<
    Observed extends Element = Element
> extends SingleTarget<Observed> {
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
        const target = this.getTarget(selector, throwError);

        return target ? this.set(target) : this;
    }

    /*----------------------------------------*
     * Target
     *----------------------------------------*/

    /**
     * get target by selector
     *
     * @param {string} selector
     * @param {boolean} throwError
     * @returns {Observed | null}
     */
    protected getTarget(
        selector: string,
        throwError: boolean
    ): Observed | null {
        const targets = document.querySelectorAll<Observed>(selector);

        if (targets.length === 1) return targets[0];

        if (!throwError) return null;

        if (targets.length > 1)
            throw new Error(`Multiple targets found for selector: ${selector}`);

        throw new Error(`No targets found for selector: ${selector}`);
    }
}
