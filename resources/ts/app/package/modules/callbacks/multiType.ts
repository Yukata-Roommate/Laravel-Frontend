/*****************************************
 * Package Module Callback
 *
 * Multi Type
 *****************************************/

import type { RemoveListener } from "./types";

import { BaseCallbacks } from "./base";

/**
 * Multi Type Callbacks
 */
export class MultiTypeCallbacks<
    Callback extends Function = Function
> extends BaseCallbacks<Callback> {
    /**
     * callbacks
     *
     * @type {Map<string, Set<Callback>>}
     */
    protected callbacks: Map<string, Set<Callback>> = new Map();

    /**
     * add callback
     *
     * @param {string} id
     * @param {Callback} callback
     * @returns {RemoveListener}
     */
    public add(id: string, callback: Callback): RemoveListener {
        if (!this.callbacks.has(id)) this.callbacks.set(id, new Set());

        const callbacks = this.callbacks.get(id)!;

        callbacks.add(callback);

        return () => {
            callbacks.delete(callback);

            if (!callbacks.size) this.callbacks.delete(id);
        };
    }

    /**
     * call callbacks
     *
     * @param {string} id
     * @param {string} name
     * @param {...unknown} args
     * @returns {void}
     */
    public call(id: string, name: string, ...args: unknown[]): void {
        if (!this.callbacks.has(id)) return;

        const callbacks = this.callbacks.get(id)!;

        if (!callbacks.size) return;

        callbacks.forEach((callback) => {
            this.handle(callback, name, args);
        });
    }
}
