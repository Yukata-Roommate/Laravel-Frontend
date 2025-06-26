/*****************************************
 * Package Module Base Observer
 *
 * Node
 *****************************************/

import { BaseObserver } from "./observer";

/**
 * Node Observer
 */
export abstract class NodeObserver<
    Observed extends Node = Node
> extends BaseObserver {
    /*----------------------------------------*
     * Mutation Observer
     *----------------------------------------*/

    /**
     * create mutation observer
     *
     * @param {Observed} target
     * @returns {MutationObserver}
     */
    protected createMutationObserver(target: Observed): MutationObserver {
        return new MutationObserver((mutations) => {
            this.onCatchMutations(target, mutations);
        });
    }

    /**
     * get mutation observer config
     *
     * @returns {MutationObserverInit}
     */
    protected abstract observerConfig(): MutationObserverInit;

    /**
     * on catch mutations
     *
     * @param {Observed} target
     * @param {MutationRecord[]} mutations
     * @returns {void}
     */
    protected abstract onCatchMutations(
        target: Observed,
        mutations: MutationRecord[]
    ): void;

    /*----------------------------------------*
     * Event
     *----------------------------------------*/

    /**
     * whether is bubbling
     *
     * @type {boolean}
     */
    public isBubbling: boolean = true;

    /**
     * whether is cancelable
     *
     * @type {boolean}
     */
    public isCancelable: boolean = true;

    /**
     * whether is composed
     *
     * @type {boolean}
     */
    public isComposed: boolean = true;

    /**
     * dispatch custom event
     *
     * @param {Observed} target
     * @param {string} eventName
     * @param {unknown} detail
     * @returns {void}
     */
    protected dispatchCustomEvent(
        target: Observed,
        eventName: string,
        detail: unknown
    ): void {
        const event = new CustomEvent(eventName, {
            detail: detail,
            bubbles: this.isBubbling,
            cancelable: this.isCancelable,
            composed: this.isComposed,
        });

        target.dispatchEvent(event);
    }
}
