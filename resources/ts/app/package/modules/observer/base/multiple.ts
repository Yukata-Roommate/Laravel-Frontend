/*****************************************
 * Package Module Base Observer
 *
 * Multiple
 *****************************************/

import { NodeObserver } from "./node";

import { MultipleTarget } from "../target/multiple";

/**
 * Multiple Observer
 */
export abstract class MultipleObserver<
    Observed extends Node = Node
> extends NodeObserver<Observed> {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * observed targets
     *
     * @type {MultipleTarget<Observed>}
     */
    protected _targets: MultipleTarget<Observed> = new MultipleTarget();

    /**
     * mutation observers
     *
     * @type {Map<Observed, MutationObserver>}
     */
    protected _observers: Map<Observed, MutationObserver> = new Map();

    /**
     * get observed targets
     *
     * @returns {Observed[]}
     */
    public get targets(): Observed[] {
        return this._targets.get();
    }

    /**
     * whether has targets
     *
     * @returns {boolean}
     */
    public get hasTargets(): boolean {
        return !this._targets.isEmpty();
    }

    /**
     * set observed targets
     *
     * @param {Observed[]} targets
     * @returns {this}
     */
    public setTargets(targets: Observed[]): this {
        this.withPaused(() => {
            if (this._observers.size) {
                this._observers.forEach((observer) => {
                    observer.disconnect();
                });

                this._observers.clear();
            }

            this._targets.set(targets);

            targets.forEach((target) => {
                if (this._observers.get(target)) return;

                const observer = this.createMutationObserver(target);

                this._observers.set(target, observer);
            });
        });

        return this;
    }

    /**
     * clear observed targets
     *
     * @returns {this}
     */
    public clearTargets(): this {
        return this.setTargets(this._targets.clear().get());
    }

    /**
     * add observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public addTarget(target: Observed): this {
        return this.setTargets(this._targets.add(target).get());
    }

    /**
     * remove observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public removeTarget(target: Observed): this {
        return this.setTargets(this._targets.remove(target).get());
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
        if (this._targets.isEmpty()) throw this._targets.emptyError();
        if (!this._observers.size) throw this.noObserversError();

        this.targets.forEach((target) => {
            const observer = this._observers.get(target);

            if (!observer) throw this.noObserverError(target);

            observer.observe(target, this.observerConfig());
        });

        return this;
    }

    /**
     * stop process
     *
     * @returns {this}
     */
    protected stopProcess(): this {
        if (!this._observers.size) throw this.noObserversError();

        this._observers.forEach((observer) => {
            observer.disconnect();
        });

        return this;
    }

    /**
     * destroy process
     *
     * @returns {void}
     */
    protected destroyProcess(): void {
        if (!this._observers.size) throw this.noObserversError();

        this._observers.forEach((observer) => {
            observer.disconnect();
        });

        this._observers.clear();

        this._targets.clear();
    }

    /*----------------------------------------*
     * Error
     *----------------------------------------*/

    /**
     * get no observers error
     *
     * @returns {Error}
     */
    protected noObserversError(): Error {
        return new Error("Observers are empty.");
    }

    /**
     * get no observer error
     *
     * @param {Observed} target
     * @returns {Error}
     */
    protected noObserverError(target: Observed): Error {
        return new Error(`Observer is not found. target: ${target}`);
    }
}
