/*****************************************
 * Package Module Base Observer
 *
 * Single
 *****************************************/

import { NodeObserver } from "./node";

import { SingleTarget } from "../target/single";

/**
 * Single Observer
 */
export abstract class SingleObserver<
    Observed extends Node = Node
> extends NodeObserver<Observed> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed target
     *
     * @type {SingleTarget<Observed>}
     */
    protected _target: SingleTarget<Observed> = new SingleTarget();

    /**
     * mutation observer
     *
     * @type {MutationObserver | null}
     */
    protected _observer: MutationObserver | null = null;

    /**
     * get observed target
     *
     * @returns {Observed}
     */
    public get target(): Observed | null {
        return this._target.get();
    }

    /**
     * whether has target
     *
     * @returns {boolean}
     */
    public get hasTarget(): boolean {
        return !!this._target.isEmpty();
    }

    /**
     * set observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public setTarget(target: Observed): this {
        this.withPaused(() => {
            if (this._observer) this._observer.disconnect();

            this._target.set(target);

            this._observer = this.createMutationObserver(target);
        });

        return this;
    }

    /*----------------------------------------*
     * Handle
     *----------------------------------------*/

    /**
     * start process
     *
     * @returns {this}
     */
    protected startProcess(): this {
        if (this._target.isEmpty()) throw this._target.emptyError();
        if (!this._observer) throw this.noObserverError();

        this._observer.observe(this._target.get()!, this.observerConfig());

        return this;
    }

    /**
     * stop process
     *
     * @returns {this}
     */
    protected stopProcess(): this {
        if (!this._observer) throw this.noObserverError();

        this._observer.disconnect();

        return this;
    }

    /**
     * destroy process
     *
     * @returns {void}
     */
    protected destroyProcess(): void {
        if (!this._observer) throw this.noObserverError();

        this._observer.disconnect();

        this._observer = null;

        this._target.clear();
    }

    /*----------------------------------------*
     * Error
     *----------------------------------------*/

    /**
     * get no target error
     *
     * @returns {Error}
     */
    protected noTargetError(): Error {
        return new Error("Target is not defined.");
    }

    /**
     * get no observer error
     *
     * @returns {Error}
     */
    protected noObserverError(): Error {
        return new Error("Observer is not defined.");
    }
}
