/*****************************************
 * Package Module Observer
 *
 * Attribute
 *****************************************/

import type {
    AttributeObserverOptions,
    ChangeAttributeCallback,
    ChangeAttributeEventArguments,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { MultiTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

import { ArrayEntity } from "../entity";

/**
 * Attribute Observer
 */
export class AttributeObserver<
    Observed extends Element = Element
> extends ElementsObserver<Observed> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {AttributeObserverOptions} options
     */
    public constructor(options: AttributeObserverOptions = {}) {
        super();

        this.setOptions(options);
    }

    /**
     * set options
     *
     * @param {AttributeObserverOptions} options
     * @returns {this}
     */
    public setOptions(options: AttributeObserverOptions): this {
        this.withPaused(() => {
            if (options.attributes !== undefined) {
                this.attributes.set(options.attributes);
            }
        });

        return this;
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * change callbacks
     *
     * @type {MultiTypeCallbacks<ChangeAttributeCallback<Observed>>}
     */
    protected changeCallbacks: MultiTypeCallbacks<
        ChangeAttributeCallback<Observed>
    > = new MultiTypeCallbacks<ChangeAttributeCallback<Observed>>();

    /**
     * attributes
     *
     * @type {ArrayEntity<string>}
     */
    protected _attributes: ArrayEntity<string> = new ArrayEntity<string>();

    /**
     * get attributes
     *
     * @returns {ArrayEntity<string>}
     */
    public get attributes(): ArrayEntity<string> {
        return this._attributes;
    }

    /**
     * set attributes
     *
     * @param {string[]} attributes
     * @returns {this}
     */
    public setAttributes(attributes: string[]): this {
        return this.setOptions({ attributes });
    }

    /**
     * clear attributes
     *
     * @returns {this}
     */
    public clearAttributes(): this {
        return this.setAttributes([]);
    }

    /**
     * add attribute
     *
     * @param {string} attribute
     * @returns {this}
     */
    public addAttribute(attribute: string): this {
        return this.setAttributes([...this.attributes.get(), attribute]);
    }

    /**
     * remove attribute
     *
     * @param {string} attribute
     * @returns {this}
     */
    public removeAttribute(attribute: string): this {
        return this.setAttributes(
            this.attributes.get().filter((item) => item !== attribute)
        );
    }

    /*----------------------------------------*
     * Observers
     *----------------------------------------*/

    /**
     * get mutation observer config
     *
     * @returns {MutationObserverInit}
     */
    protected observerConfig(): MutationObserverInit {
        return {
            attributeFilter: this.attributes.get(),
            attributeOldValue: true,
            attributes: true,
        };
    }

    /**
     * on catch mutations
     *
     * @param {Observed} target
     * @param {MutationRecord[]} mutations
     * @returns {void}
     */
    protected onCatchMutations(
        target: Observed,
        mutations: MutationRecord[]
    ): void {
        for (const mutation of mutations) {
            if (mutation.type !== "attributes") continue;
            if (!mutation.attributeName) continue;

            const attributeName = mutation.attributeName;
            const newValue = target.getAttribute(attributeName);
            const oldValue = mutation.oldValue;

            const eventArguments: ChangeAttributeEventArguments<Observed> = {
                target: target,
                attributeName: attributeName,
                newValue: newValue,
                oldValue: oldValue,
            };

            this.changeCallbacks.call(
                attributeName,
                "change attribute",
                eventArguments
            );

            this.changeCallbacks.call("*", "change attribute", eventArguments);

            this.dispatchCustomEvent(target, "attributeChange", eventArguments);
        }
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on change
     *
     * @param {string} attribute
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChange(
        attribute: string,
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        if (attribute !== "*" && !this.attributes.has(attribute))
            this.attributes.add(attribute);

        return this.changeCallbacks.add(attribute, callback);
    }

    /**
     * on change all
     *
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeAll(
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        return this.onChange("*", callback);
    }

    /**
     * on change data
     *
     * @param {string} data
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeData(
        data: string,
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        return this.onChange(`data-${data}`, callback);
    }
}
