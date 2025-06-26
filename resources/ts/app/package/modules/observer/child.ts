/*****************************************
 * Package Module Observer
 *
 * Child
 *****************************************/

import type {
    ChildObserverOptions,
    AddChildCallback,
    AddedChildEventArguments,
    RemoveChildCallback,
    RemovedChildEventArguments,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { SingleTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

/**
 * Child Observer
 */
export class ChildObserver<
    Observed extends Element = Element
> extends ElementsObserver<Observed> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {ChildObserverOptions} options
     */
    public constructor(options: ChildObserverOptions = {}) {
        super();

        this.setOptions(options);
    }

    /**
     * set options
     *
     * @param {ChildObserverOptions} options
     * @returns {this}
     */
    public setOptions(options: ChildObserverOptions): this {
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
     * add callbacks
     *
     * @type {SingleTypeCallbacks<AddChildCallback<Observed>>}
     */
    protected addCallbacks: SingleTypeCallbacks<AddChildCallback<Observed>> =
        new SingleTypeCallbacks<AddChildCallback<Observed>>();

    /**
     * remove callbacks
     *
     * @type {SingleTypeCallbacks<RemoveChildCallback<Observed>>}
     */
    protected removeCallbacks: SingleTypeCallbacks<
        RemoveChildCallback<Observed>
    > = new SingleTypeCallbacks<RemoveChildCallback<Observed>>();

    /**
     * subtree
     *
     * @type {boolean}
     */
    protected _subtree: boolean = false;

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
            childList: true,
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
            if (mutation.type !== "childList") continue;

            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    this.onCatchChildAdded(target, node);
                });
            }

            if (mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach((node) => {
                    this.onCatchChildRemoved(target, node);
                });
            }
        }
    }

    /**
     * on catch child added
     *
     * @param {Observed} parent
     * @param {Node} node
     * @returns {void}
     */
    protected onCatchChildAdded(parent: Observed, node: Node): void {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const element = node as Element;

        const eventArguments: AddedChildEventArguments<Observed> = {
            parent,
            element,
        };

        this.addCallbacks.call("add child", eventArguments);

        this.dispatchCustomEvent(parent, "childAdded", eventArguments);
    }

    /**
     * on catch child removed
     *
     * @param {Observed} parent
     * @param {Node} node
     * @returns {void}
     */
    protected onCatchChildRemoved(parent: Observed, node: Node): void {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const element = node as Element;

        const eventArguments: RemovedChildEventArguments<Observed> = {
            parent,
            element,
        };

        this.removeCallbacks.call("remove child", eventArguments);

        this.dispatchCustomEvent(parent, "childRemoved", eventArguments);
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on add
     *
     * @param {AddChildCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onAdd(callback: AddChildCallback<Observed>): RemoveListener {
        return this.addCallbacks.add(callback);
    }

    /**
     * on remove
     *
     * @param {RemoveChildCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onRemove(callback: RemoveChildCallback<Observed>): RemoveListener {
        return this.removeCallbacks.add(callback);
    }
}
