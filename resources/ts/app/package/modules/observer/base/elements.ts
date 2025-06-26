/*****************************************
 * Package Module Base Observer
 *
 * Elements
 *****************************************/

import { MultipleObserver } from "./multiple";

import { ElementsTarget } from "../target/elements";

/**
 * Elements Observer
 */
export abstract class ElementsObserver<
    Observed extends Element = Element
> extends MultipleObserver<Observed> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed targets
     *
     * @type {ElementsTarget<Observed>}
     */
    protected override _targets: ElementsTarget<Observed> =
        new ElementsTarget();

    /*----------------------------------------*
     * Set
     *----------------------------------------*/

    /**
     * set targets by selector
     *
     * @param {string} selector
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        return this.setTargets(
            this._targets.setBySelector(selector, throwError).get()
        );
    }

    /**
     * set targets by id
     *
     * @param {string} id
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsById(id: string, throwError: boolean = true): this {
        return this.setTargetsBySelector(`#${id}`, throwError);
    }

    /**
     * set targets by class
     *
     * @param {string} className
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsByClass(
        className: string,
        throwError: boolean = true
    ): this {
        return this.setTargetsBySelector(`.${className}`, throwError);
    }

    /**
     * set targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown,
        throwError: boolean = true
    ): this {
        return this.setTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`,
            throwError
        );
    }

    /*----------------------------------------*
     * Add
     *----------------------------------------*/

    /**
     * add targets by selector
     *
     * @param {string} selector
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        return this.setTargets(
            this._targets.addBySelector(selector, throwError).get()
        );
    }

    /**
     * add targets by class
     *
     * @param {string} className
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsByClass(
        className: string,
        throwError: boolean = true
    ): this {
        return this.addTargetsBySelector(`.${className}`, throwError);
    }

    /**
     * add targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown,
        throwError: boolean = true
    ): this {
        return this.addTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`,
            throwError
        );
    }

    /*----------------------------------------*
     * Remove
     *----------------------------------------*/

    /**
     * remove targets by selector
     *
     * @param {string} selector
     * @returns {this}
     */
    public removeTargetsBySelector(selector: string): this {
        return this.setTargets(this._targets.removeBySelector(selector).get());
    }

    /**
     * remove targets by id
     *
     * @param {string} id
     * @returns {this}
     */
    public removeTargetsById(id: string): this {
        return this.removeTargetsBySelector(`#${id}`);
    }

    /**
     * remove targets by class
     *
     * @param {string} className
     * @returns {this}
     */
    public removeTargetsByClass(className: string): this {
        return this.removeTargetsBySelector(`.${className}`);
    }

    /**
     * remove targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @returns {this}
     */
    public removeTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown
    ): this {
        return this.removeTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`
        );
    }
}
