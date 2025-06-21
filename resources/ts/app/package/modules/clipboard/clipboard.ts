/*****************************************
 * Package Module Clipboard
 *
 * Clipboard
 *****************************************/

/**
 * Clipboard
 */
export class Clipboard {
    /*----------------------------------------*
     * Internal Storage
     *----------------------------------------*/

    /**
     * whether displayed warning for console
     *
     * @type {boolean}
     */
    protected displayedWarning: boolean = false;

    /**
     * storage for clipboard is unsupported
     *
     * @type {string}
     */
    protected storage: string = "";

    /*----------------------------------------*
     * Is Supported
     *----------------------------------------*/

    /**
     * whether clipboard is supported
     *
     * @param {boolean} isStrict
     * @returns {boolean}
     */
    public isSupported(isStrict: boolean = false): boolean {
        const isSupported = !!navigator.clipboard;

        if (!isSupported && isStrict)
            throw new Error("Clipboard API is not supported.");

        return isSupported;
    }

    /**
     * whether clipboard is not supported
     *
     * @param {boolean} isStrict
     * @returns {boolean}
     */
    public isNotSupported(isStrict: boolean = false): boolean {
        return !this.isSupported(isStrict);
    }

    /*----------------------------------------*
     * Read
     *----------------------------------------*/

    /**
     * read text
     *
     * @param {boolean} isStrict
     * @returns {Promise<string>}
     */
    public async read(isStrict: boolean = false): Promise<string> {
        if (this.isSupported(isStrict)) return this.readByClipboard();

        return this.readByStorage();
    }

    /**
     * read text by clipboard
     *
     * @returns {Promise<string>}
     */
    protected async readByClipboard(): Promise<string> {
        return navigator.clipboard.readText();
    }

    /**
     * read text by storage
     *
     * @returns {Promise<string>}
     */
    protected async readByStorage(): Promise<string> {
        return new Promise((resolve) => {
            if (!this.displayedWarning) {
                console.warn(
                    "Clipboard API is not supported. Using storage as fallback."
                );
                this.displayedWarning = true;
            }

            resolve(this.storage);
        });
    }

    /*----------------------------------------*
     * Write
     *----------------------------------------*/

    /**
     * write text
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async write(text: string, isStrict: boolean = false): Promise<void> {
        if (this.isSupported(isStrict)) return this.writeInClipboard(text);

        return this.writeInStorage(text);
    }

    /**
     * write text in clipboard
     *
     * @param {string} text
     * @returns {Promise<void>}
     */
    protected async writeInClipboard(text: string): Promise<void> {
        return navigator.clipboard.writeText(text);
    }

    /**
     * write text in storage
     *
     * @param {string} text
     * @returns {Promise<void>}
     */
    protected async writeInStorage(text: string): Promise<void> {
        return new Promise((resolve) => {
            if (!this.displayedWarning) {
                console.warn(
                    "Clipboard API is not supported. Using storage as fallback."
                );
                this.displayedWarning = true;
            }

            this.storage = text;

            resolve();
        });
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * clipboard instance
     *
     * @type {Clipboard}
     */
    public static readonly instance: Clipboard = new Clipboard();

    /**
     * whether clipboard is supported
     *
     * @param {boolean} isStrict
     * @returns {boolean}
     */
    public static isSupported(isStrict: boolean = false): boolean {
        return this.instance.isSupported(isStrict);
    }

    /**
     * whether clipboard is not supported
     *
     * @param {boolean} isStrict
     * @returns {boolean}
     */
    public static isNotSupported(isStrict: boolean = false): boolean {
        return this.instance.isNotSupported(isStrict);
    }

    /**
     * read text
     *
     * @param {boolean} isStrict
     * @returns {Promise<string>}
     */
    public static async read(isStrict: boolean = false): Promise<string> {
        return this.instance.read(isStrict);
    }

    /**
     * write text
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async write(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        return this.instance.write(text, isStrict);
    }
}
