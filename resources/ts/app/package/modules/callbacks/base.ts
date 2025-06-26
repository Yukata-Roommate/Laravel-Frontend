/*****************************************
 * Package Module Callback
 *
 * Base
 *****************************************/

/**
 * Base Callbacks
 */
export abstract class BaseCallbacks<Callback extends Function = Function> {
    /**
     * handle callback
     *
     * @param {Callback} callback
     * @param {string} name
     * @param {unknown[]} args
     * @returns {void}
     */
    protected handle(callback: Callback, name: string, args: unknown[]): void {
        try {
            callback(...args);
        } catch (error) {
            console.error(
                `Error in callback "${name}":`,
                error,
                "Arguments:",
                args
            );
        }
    }
}
