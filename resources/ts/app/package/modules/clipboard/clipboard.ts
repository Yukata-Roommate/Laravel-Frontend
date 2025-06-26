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
     * Clear
     *----------------------------------------*/

    /**
     * clear clipboard content
     *
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async clear(isStrict: boolean = false): Promise<void> {
        if (this.isSupported(isStrict)) return this.clearClipboard();

        return this.clearStorage();
    }

    /**
     * clear clipboard content
     *
     * @returns {Promise<void>}
     */
    protected async clearClipboard(): Promise<void> {
        return navigator.clipboard.writeText("");
    }

    /**
     * clear storage content
     *
     * @returns {Promise<void>}
     */
    protected async clearStorage(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.displayedWarning) {
                console.warn(
                    "Clipboard API is not supported. Using storage as fallback."
                );
                this.displayedWarning = true;
            }

            this.storage = "";

            resolve();
        });
    }

    /*----------------------------------------*
     * Utility Methods
     *----------------------------------------*/

    /**
     * check if clipboard is empty
     *
     * @param {boolean} isStrict
     * @returns {Promise<boolean>}
     */
    public async isEmpty(isStrict: boolean = false): Promise<boolean> {
        const content = await this.read(isStrict);

        return content.length === 0;
    }

    /**
     * check if clipboard has content
     *
     * @param {boolean} isStrict
     * @returns {Promise<boolean>}
     */
    public async hasContent(isStrict: boolean = false): Promise<boolean> {
        return !(await this.isEmpty(isStrict));
    }

    /**
     * get clipboard content length
     *
     * @param {boolean} isStrict
     * @returns {Promise<number>}
     */
    public async length(isStrict: boolean = false): Promise<number> {
        const content = await this.read(isStrict);

        return content.length;
    }

    /**
     * append text to clipboard content
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async append(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        const currentContent = await this.read(isStrict);
        const newContent = currentContent + text;

        return this.write(newContent, isStrict);
    }

    /**
     * prepend text to clipboard content
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async prepend(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        const currentContent = await this.read(isStrict);
        const newContent = text + currentContent;

        return this.write(newContent, isStrict);
    }

    /**
     * trim whitespace from clipboard content
     *
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async trim(isStrict: boolean = false): Promise<void> {
        const content = await this.read(isStrict);
        const trimmedContent = content.trim();

        return this.write(trimmedContent, isStrict);
    }

    /**
     * replace text in clipboard content
     *
     * @param {string | RegExp} searchValue
     * @param {string} replaceValue
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async replace(
        searchValue: string | RegExp,
        replaceValue: string,
        isStrict: boolean = false
    ): Promise<void> {
        const content = await this.read(isStrict);
        const newContent = content.replace(searchValue, replaceValue);
        
        return this.write(newContent, isStrict);
    }

    /*----------------------------------------*
     * Alias Methods
     *----------------------------------------*/

    /**
     * copy text (alias for write)
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public async copy(text: string, isStrict: boolean = false): Promise<void> {
        return this.write(text, isStrict);
    }

    /**
     * paste text (alias for read)
     *
     * @param {boolean} isStrict
     * @returns {Promise<string>}
     */
    public async paste(isStrict: boolean = false): Promise<string> {
        return this.read(isStrict);
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

    /**
     * clear clipboard content
     *
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async clear(isStrict: boolean = false): Promise<void> {
        return this.instance.clear(isStrict);
    }

    /**
     * check if clipboard is empty
     *
     * @param {boolean} isStrict
     * @returns {Promise<boolean>}
     */
    public static async isEmpty(isStrict: boolean = false): Promise<boolean> {
        return this.instance.isEmpty(isStrict);
    }

    /**
     * check if clipboard has content
     *
     * @param {boolean} isStrict
     * @returns {Promise<boolean>}
     */
    public static async hasContent(
        isStrict: boolean = false
    ): Promise<boolean> {
        return this.instance.hasContent(isStrict);
    }

    /**
     * get clipboard content length
     *
     * @param {boolean} isStrict
     * @returns {Promise<number>}
     */
    public static async length(isStrict: boolean = false): Promise<number> {
        return this.instance.length(isStrict);
    }

    /**
     * append text to clipboard content
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async append(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        return this.instance.append(text, isStrict);
    }

    /**
     * prepend text to clipboard content
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async prepend(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        return this.instance.prepend(text, isStrict);
    }

    /**
     * trim whitespace from clipboard content
     *
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async trim(isStrict: boolean = false): Promise<void> {
        return this.instance.trim(isStrict);
    }

    /**
     * replace text in clipboard content
     *
     * @param {string | RegExp} searchValue
     * @param {string} replaceValue
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async replace(
        searchValue: string | RegExp,
        replaceValue: string,
        isStrict: boolean = false
    ): Promise<void> {
        return this.instance.replace(searchValue, replaceValue, isStrict);
    }

    /**
     * copy text (alias for write)
     *
     * @param {string} text
     * @param {boolean} isStrict
     * @returns {Promise<void>}
     */
    public static async copy(
        text: string,
        isStrict: boolean = false
    ): Promise<void> {
        return this.instance.copy(text, isStrict);
    }

    /**
     * paste text (alias for read)
     *
     * @param {boolean} isStrict
     * @returns {Promise<string>}
     */
    public static async paste(isStrict: boolean = false): Promise<string> {
        return this.instance.paste(isStrict);
    }
}
