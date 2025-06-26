/*****************************************
 * Package Module Base Observer
 *
 * Observer
 *****************************************/

/**
 * Base Observer
 */
export abstract class BaseObserver {
    /*----------------------------------------*
     * Is Observing
     *----------------------------------------*/

    /**
     * whether is observing
     *
     * @type {boolean}
     */
    protected _isObserving: boolean = false;

    /**
     * get whether is observing
     *
     * @returns {boolean}
     */
    public get isObserving(): boolean {
        return this._isObserving;
    }

    /**
     * set whether is observing
     *
     * @returns {void}
     */
    protected observe(): void {
        this._isObserving = true;
    }

    /**
     * set whether is not observing
     *
     * @returns {void}
     */
    protected unobserve(): void {
        this._isObserving = false;
    }

    /*----------------------------------------*
     * Handle
     *----------------------------------------*/

    /**
     * start observing
     *
     * @returns {this}
     */
    public start(): this {
        if (this.isObserving) return this;

        this.observe();

        return this.startProcess();
    }

    /**
     * start process
     *
     * @returns {this}
     */
    protected abstract startProcess(): this;

    /**
     * stop observing
     *
     * @returns {this}
     */
    public stop(): this {
        if (!this.isObserving) return this;

        this.unobserve();

        return this.stopProcess();
    }

    /**
     * stop process
     *
     * @returns {this}
     */
    protected abstract stopProcess(): this;

    /**
     * destroy
     *
     * @returns {void}
     */
    public destroy(): void {
        this.stop();

        this.destroyProcess();
    }

    /**
     * destroy process
     *
     * @returns {void}
     */
    protected abstract destroyProcess(): void;

    /**
     * with paused
     *
     * @param {() => void} callback
     * @returns {void}
     */
    public withPaused(callback: () => void): void {
        const wasObserving = this.isObserving;

        if (wasObserving) this.stop();

        callback();

        if (wasObserving) this.start();
    }
}
