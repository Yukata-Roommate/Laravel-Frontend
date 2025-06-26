/*****************************************
 * Package Module Base Observer
 *
 * Element
 *****************************************/

import { SingleObserver } from "./single";

import { ElementTarget } from "../target/element";

/**
 * Element Observer
 */
export abstract class ElementObserver<
    Observed extends Element = Element
> extends SingleObserver<Observed> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed target
     *
     * @type {ElementTarget<Observed>}
     */
    protected override _target: ElementTarget<Observed> = new ElementTarget();

    /*----------------------------------------*
     * Set
     *----------------------------------------*/

    /**
     * set target by selector
     *
     * @param {string} selector
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        return this.setTarget(
            this._target.setBySelector(selector, throwError).get()!
        );
    }

    /**
     * set target by id
     *
     * @param {string} id
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetById(id: string, throwError: boolean = true): this {
        return this.setTargetBySelector(`#${id}`, throwError);
    }

    /**
     * set target by class
     *
     * @param {string} className
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetByClass(
        className: string,
        throwError: boolean = true
    ): this {
        return this.setTargetBySelector(`.${className}`, throwError);
    }

    /**
     * set target by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetByAttribute(
        attributeName: string,
        attributeValue: unknown,
        throwError: boolean = true
    ): this {
        return this.setTargetBySelector(
            `[${attributeName}="${attributeValue}"]`,
            throwError
        );
    }
}
