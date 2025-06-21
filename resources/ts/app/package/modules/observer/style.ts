/*****************************************
 * Package Module Observer
 *
 * Style
 *****************************************/

import type {
    ChangeStyleCallback,
    ChangeStyleEventArguments,
    ChangeStylePropertyCallback,
    ChangeStylePropertyEventArguments,
    StyleValue,
    StyleValues,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { SingleTypeCallbacks } from "../callbacks";
import { MultiTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

/**
 * Style Observer
 */
export class StyleObserver<
    Observed extends Element = Element
> extends ElementsObserver<Observed> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     */
    public constructor() {
        super();
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * change callbacks
     *
     * @type {SingleTypeCallbacks<ChangeStyleCallback<Observed>>}
     */
    protected changeCallbacks: SingleTypeCallbacks<
        ChangeStyleCallback<Observed>
    > = new SingleTypeCallbacks<ChangeStyleCallback<Observed>>();

    /**
     * property change callbacks
     *
     * @type {MultiTypeCallbacks<ChangeStylePropertyCallback<Observed>>}
     */
    protected changePropertyCallbacks: MultiTypeCallbacks<
        ChangeStylePropertyCallback<Observed>
    > = new MultiTypeCallbacks<ChangeStylePropertyCallback<Observed>>();

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
            attributeFilter: ["style"],
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
            if (mutation.attributeName !== "style") continue;

            const newStyleString = target.getAttribute("style");
            const oldStyleString = mutation.oldValue;

            const newStyles = this.parseStyleString(newStyleString);
            const oldStyles = this.parseStyleString(oldStyleString);

            this.onCatchStyleChanged(target, newStyles, oldStyles);

            for (const property in newStyles) {
                const newStyle = newStyles[property] || null;
                const oldStyle = oldStyles[property] || null;

                if (newStyle === oldStyle) continue;

                this.onCatchStyleChangedProperty(
                    target,
                    property,
                    newStyle,
                    oldStyle
                );
            }
        }
    }

    /**
     * on catch style changed
     *
     * @param {Observed} target
     * @param {StyleValues} newStyles
     * @param {StyleValues} oldStyles
     * @returns {void}
     */
    protected onCatchStyleChanged(
        target: Observed,
        newStyles: StyleValues,
        oldStyles: StyleValues
    ): void {
        const eventArguments: ChangeStyleEventArguments<Observed> = {
            target,
            newStyles,
            oldStyles,
        };

        this.changeCallbacks.call("change style", eventArguments);

        this.dispatchCustomEvent(target, "styleChanged", eventArguments);
    }

    /**
     * on catch style property changed
     *
     * @param {Observed} target
     * @param {string} property
     * @param {StyleValue} newStyle
     * @param {StyleValue} oldStyle
     * @returns {void}
     */
    protected onCatchStyleChangedProperty(
        target: Observed,
        property: string,
        newStyle: StyleValue,
        oldStyle: StyleValue
    ): void {
        const eventArguments: ChangeStylePropertyEventArguments<Observed> = {
            target,
            property,
            newStyle,
            oldStyle,
        };

        this.changeCallbacks.call(
            property,
            "change style property",
            eventArguments
        );

        this.changeCallbacks.call("*", "change style property", eventArguments);

        this.dispatchCustomEvent(
            target,
            "styleChangedProperty",
            eventArguments
        );
    }

    /**
     * parse style string
     *
     * @param {string | null} styleString
     * @returns {StyleValues}
     */
    protected parseStyleString(styleString: string | null): StyleValues {
        const result: StyleValues = {};

        if (styleString === null) return result;

        const parts = styleString.split(";");

        for (const part of parts) {
            const [name, value] = part.split(":").map((s) => s.trim());

            if (!name || !value) continue;

            result[name] = value;
        }

        return result;
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on change
     *
     * @param {ChangeStyleCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChange(callback: ChangeStyleCallback<Observed>): RemoveListener {
        return this.changeCallbacks.add(callback);
    }

    /**
     * on change property
     *
     * @param {string} property
     * @param {ChangeStylePropertyCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeProperty(
        property: string,
        callback: ChangeStylePropertyCallback<Observed>
    ): RemoveListener {
        return this.changePropertyCallbacks.add(property, callback);
    }
}
