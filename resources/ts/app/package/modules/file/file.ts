/*****************************************
 * Package Module File
 *
 * File
 *****************************************/

/**
 * File
 */
export class File {
    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * name
     *
     * @type {string}
     */
    public name: string = "";

    /**
     * type
     *
     * @type {string}
     */
    public type: string = "";

    /**
     * content
     *
     * @type {string}
     */
    public content: string = "";

    /*----------------------------------------*
     * Download
     *----------------------------------------*/

    /**
     * download
     *
     * @return {void}
     */
    public download(): void {
        const anchor = this.makeDownloadAnchor();

        anchor.click();

        window.URL.revokeObjectURL(anchor.href);

        this.name = "";
        this.type = "";
        this.content = "";
    }

    /**
     * make download anchor
     *
     * @return {HTMLAnchorElement}
     */
    protected makeDownloadAnchor(): HTMLAnchorElement {
        const anchor = document.createElement("a");

        anchor.href = window.URL.createObjectURL(this.makeDownloadFile());
        anchor.download = this.name;

        return anchor;
    }

    /**
     * make download file
     *
     * @return {Blob}
     */
    protected makeDownloadFile(): Blob {
        return new Blob([this.content], { type: this.type });
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * file instance
     *
     * @type {File}
     */
    public static readonly instance: File = new File();

    /**
     * download file
     *
     * @param {string} name
     * @param {string} type
     * @param {string} content
     * @return {void}
     */
    public static download(name: string, type: string, content: string): void {
        this.instance.name = name;
        this.instance.type = type;
        this.instance.content = content;

        this.instance.download();
    }
}
