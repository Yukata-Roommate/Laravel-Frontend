/*****************************************
 * Package Module Observer
 *
 * Identifier
 *****************************************/

import type {
    ChangeIdentifierCallback,
    ChangeIdentifierEventArguments,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { SingleTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

/**
 * Identifier Observer
 */
export class IdentifierObserver<
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
     * @type {SingleTypeCallbacks<ChangeIdentifierCallback<Observed>>}
     */
    protected changeCallbacks: SingleTypeCallbacks<
        ChangeIdentifierCallback<Observed>
    > = new SingleTypeCallbacks<ChangeIdentifierCallback<Observed>>();

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
            attributeFilter: ["id"],
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
            if (mutation.attributeName !== "id") continue;

            const newId = target.id;
            const oldId = mutation.oldValue;

            const eventArguments: ChangeIdentifierEventArguments<Observed> = {
                target,
                newId,
                oldId,
            };

            this.changeCallbacks.call("change id", eventArguments);

            this.dispatchCustomEvent(target, "idChanged", eventArguments);
        }
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on change
     *
     * @param {ChangeIdentifierCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChange(
        callback: ChangeIdentifierCallback<Observed>
    ): RemoveListener {
        return this.changeCallbacks.add(callback);
    }
}
