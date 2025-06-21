/*****************************************
 * Package Module Callback
 *
 * Single Type
 *****************************************/

import type { RemoveListener } from "./types";

import { BaseCallbacks } from "./base";

/**
 * Single Type Callbacks
 */
export class SingleTypeCallbacks<
    Callback extends Function = Function
> extends BaseCallbacks<Callback> {
    /**
     * callbacks
     *
     * @type {Set<Callback>}
     */
    protected callbacks: Set<Callback> = new Set();

    /**
     * add callback
     *
     * @param {Callback} callback
     * @returns {RemoveListener}
     */
    public add(callback: Callback): RemoveListener {
        this.callbacks.add(callback);

        return () => {
            this.callbacks.delete(callback);
        };
    }

    /**
     * call callbacks
     *
     * @param {string} name
     * @param {...unknown} args
     * @returns {void}
     */
    public call(name: string, ...args: unknown[]): void {
        if (!this.callbacks.size) return;

        this.callbacks.forEach((callback) => {
            this.handle(callback, name, args);
        });
    }
}
