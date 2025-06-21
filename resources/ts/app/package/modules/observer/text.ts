/*****************************************
 * Package Module Observer
 *
 * Text
 *****************************************/

import type {
    TextObserverOptions,
    ChangeTextCallback,
    ChangeTextEventArguments,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { SingleTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

/**
 * Text Observer
 */
export class TextObserver<
    Observed extends Element = Element
> extends ElementsObserver<Observed> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {TextObserverOptions} options
     */
    public constructor(options: TextObserverOptions = {}) {
        super();

        this.setOptions(options);
    }

    /**
     * set options
     *
     * @param {TextObserverOptions} options
     * @returns {this}
     */
    public setOptions(options: TextObserverOptions): this {
        this.withPaused(() => {
            if (options.subtree !== undefined) {
                this._subtree = options.subtree;
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
     * @type {SingleTypeCallbacks<ChangeTextCallback<Observed>>}
     */
    protected changeCallbacks: SingleTypeCallbacks<
        ChangeTextCallback<Observed>
    > = new SingleTypeCallbacks<ChangeTextCallback<Observed>>();

    /**
     * subtree
     *
     * @type {boolean}
     */
    protected _subtree: boolean = true;

    /**
     * get subtree
     *
     * @returns {boolean}
     */
    public get subtree(): boolean {
        return this._subtree;
    }

    /**
     * set subtree
     *
     * @param {boolean} subtree
     * @returns {this}
     */
    public setSubtree(subtree: boolean): this {
        return this.setOptions({ subtree });
    }

    /**
     * enable subtree
     *
     * @returns {this}
     */
    public enableSubtree(): this {
        return this.setSubtree(true);
    }

    /**
     * disable subtree
     *
     * @returns {this}
     */
    public disableSubtree(): this {
        return this.setSubtree(false);
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
            characterData: true,
            characterDataOldValue: true,
            subtree: this.subtree,
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
            if (mutation.type !== "characterData") continue;

            const textNode = mutation.target as Text;
            const newValue = textNode.nodeValue || "";
            const oldValue = mutation.oldValue;

            const eventArguments: ChangeTextEventArguments<Observed> = {
                container: target,
                textNode,
                newValue,
                oldValue,
            };

            this.changeCallbacks.call("change text", eventArguments);

            this.dispatchCustomEvent(target, "textChanged", eventArguments);
        }
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on change
     *
     * @param {ChangeTextCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChange(callback: ChangeTextCallback<Observed>): RemoveListener {
        return this.changeCallbacks.add(callback);
    }
}
