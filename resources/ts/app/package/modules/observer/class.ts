/*****************************************
 * Package Module Observer
 *
 * Class
 *****************************************/

import type {
    AddClassCallback,
    AddedClassEventArguments,
    RemoveClassCallback,
    RemovedClassEventArguments,
} from "./types";

import { ElementsObserver } from "./base/elements";

import { MultiTypeCallbacks } from "../callbacks";
import type { RemoveListener } from "../callbacks";

/**
 * Class Observer
 */
export class ClassObserver<
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
     * Override
     *----------------------------------------*/

    /**
     * start observing
     *
     * @returns {this}
     */
    public override start(): this {
        this.updatePreviousClasses();

        return super.start();
    }

    /**
     * add observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public override addTarget(target: Observed): this {
        super.addTarget(target);

        this.updatePreviousClass(target);

        return this;
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * add callbacks
     *
     * @type {MultiTypeCallbacks<AddClassCallback<Observed>>}
     */
    protected addCallbacks: MultiTypeCallbacks<AddClassCallback<Observed>> =
        new MultiTypeCallbacks<AddClassCallback<Observed>>();

    /**
     * remove callbacks
     *
     * @type {MultiTypeCallbacks<RemoveClassCallback<Observed>>}
     */
    protected removeCallbacks: MultiTypeCallbacks<
        RemoveClassCallback<Observed>
    > = new MultiTypeCallbacks<RemoveClassCallback<Observed>>();

    /**
     * target previous classes
     *
     * @type {Map<Observed, Set<string>>}
     */
    protected _previousClasses: Map<Observed, Set<string>> = new Map();

    /**
     * get target previous class
     *
     * @param {Observed} target
     * @returns {Set<string>}
     */
    protected getPreviousClass(target: Observed): Set<string> {
        return this._previousClasses.get(target) ?? new Set();
    }

    /**
     * update target previous class
     *
     * @param {Observed} target
     * @returns {void}
     */
    protected updatePreviousClass(target: Observed): void {
        this._previousClasses.set(
            target,
            new Set(Array.from(target.classList))
        );
    }

    /**
     * update target previous classes
     *
     * @returns {void}
     */
    protected updatePreviousClasses(): void {
        this.targets.forEach((target) => {
            this.updatePreviousClass(target);
        });
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
            attributeFilter: ["class"],
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
            if (mutation.attributeName !== "class") continue;

            const previousClass = this.getPreviousClass(target);
            const currentClass = new Set(Array.from(target.classList));

            const addedClass = Array.from(currentClass).filter(
                (className) => !previousClass.has(className)
            );

            const removedClass = Array.from(previousClass).filter(
                (className) => !currentClass.has(className)
            );

            addedClass.forEach((className) => {
                this.onCatchClassAdded(target, className);
            });

            removedClass.forEach((className) => {
                this.onCatchClassRemoved(target, className);
            });

            this.updatePreviousClass(target);
        }
    }

    /**
     * on catch class added
     *
     * @param {Observed} target
     * @param {string} className
     * @returns {void}
     */
    protected onCatchClassAdded(target: Observed, className: string): void {
        const eventArguments: AddedClassEventArguments<Observed> = {
            target: target,
            className: className,
        };

        this.addCallbacks.call(className, "add class", eventArguments);

        this.addCallbacks.call("*", "add class", eventArguments);

        this.dispatchCustomEvent(target, "classAdded", eventArguments);
    }

    /**
     * on catch class removed
     *
     * @param {Observed} target
     * @param {string} className
     * @returns {void}
     */
    protected onCatchClassRemoved(target: Observed, className: string): void {
        const eventArguments: RemovedClassEventArguments<Observed> = {
            target: target,
            className: className,
        };

        this.removeCallbacks.call(className, "remove class", eventArguments);

        this.removeCallbacks.call("*", "remove class", eventArguments);

        this.dispatchCustomEvent(target, "classRemoved", eventArguments);
    }

    /*----------------------------------------*
     * Add Callback
     *----------------------------------------*/

    /**
     * on add
     *
     * @param {string} className
     * @param {AddClassCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onAdd(
        className: string,
        callback: AddClassCallback<Observed>
    ): RemoveListener {
        return this.addCallbacks.add(className, callback);
    }

    /**
     * on remove
     *
     * @param {string} className
     * @param {RemoveClassCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onRemove(
        className: string,
        callback: RemoveClassCallback<Observed>
    ): RemoveListener {
        return this.removeCallbacks.add(className, callback);
    }

    /**
     * on toggle
     *
     * @param {string} className
     * @param {AddClassCallback<Observed>} addCallback
     * @param {RemoveClassCallback<Observed>} removeCallback
     * @returns {[RemoveListener, RemoveListener]}
     */
    public onToggle(
        className: string,
        addCallback: AddClassCallback<Observed>,
        removeCallback: RemoveClassCallback<Observed>
    ): [RemoveListener, RemoveListener] {
        const removeAddListener = this.onAdd(className, addCallback);
        const removeRemoveListener = this.onRemove(className, removeCallback);

        return [removeAddListener, removeRemoveListener];
    }
}
