/*****************************************
 * Package Module Spinner
 *
 * Spinner
 *****************************************/

import type { SpinnerText } from "./types";

/**
 * Spinner
 */
export class Spinner {
    /*----------------------------------------*
     * Show
     *----------------------------------------*/

    /**
     * show
     *
     * @param {SpinnerText | undefined} type
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    public show(type?: SpinnerText, spinnerId?: string): void {
        this.showSpinner(spinnerId);
        this.showSpinnerText(type, spinnerId);
    }

    /**
     * show spinner
     *
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    protected showSpinner(spinnerId?: string): void {
        const spinner = this.getSpinner(spinnerId);

        if (!spinner) return;

        spinner.classList.add("show");
    }

    /**
     * show spinner text
     *
     * @param {SpinnerText | undefined} type
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    protected showSpinnerText(type?: SpinnerText, spinnerId?: string): void {
        const spinnerText = this.getSpinnerText(type, spinnerId);

        if (!spinnerText) return;

        spinnerText.classList.add("show");
    }

    /*----------------------------------------*
     * Hide
     *----------------------------------------*/

    /**
     * hide
     *
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    public hide(spinnerId?: string): void {
        this.hideSpinner(spinnerId);
        this.hideSpinnerTexts(spinnerId);
    }

    /**
     * hide spinner
     *
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    protected hideSpinner(spinnerId?: string): void {
        const spinner = this.getSpinner(spinnerId);

        if (!spinner) return;

        spinner.classList.remove("show");
    }

    /**
     * hide spinner texts
     *
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    protected hideSpinnerTexts(spinnerId?: string): void {
        const spinnerTexts = this.getSpinnerTexts(spinnerId);

        if (!spinnerTexts) return;

        for (let i = 0; i < spinnerTexts.length; i++) {
            spinnerTexts[i].classList.remove("show");
        }
    }

    /*----------------------------------------*
     * Common
     *----------------------------------------*/

    /**
     * get spinner
     *
     * @param {string | undefined} spinnerId
     * @returns {HTMLElement | null}
     */
    protected getSpinner(spinnerId?: string): HTMLElement | null {
        return document.getElementById(spinnerId || "spinner");
    }

    /**
     * get spinner text
     *
     * @param {SpinnerText | undefined} type
     * @param {string | undefined} spinnerId
     * @returns {HTMLElement | null}
     */
    protected getSpinnerText(
        type?: SpinnerText,
        spinnerId?: string
    ): HTMLElement | null {
        return this.getSpinner(spinnerId)?.getElementsByClassName(
            this.getSpinnerTextClassName(type)
        )[0] as HTMLElement;
    }

    /**
     * get spinner text class
     *
     * @param {SpinnerText | undefined} type
     * @returns {string}
     */
    protected getSpinnerTextClassName(type?: SpinnerText): string {
        switch (type) {
            case "waiting":
                return "spinner-text-waiting";
            case "loading":
                return "spinner-text-loading";
            case "processing":
                return "spinner-text-processing";
            case "saving":
                return "spinner-text-saving";
            case "deleting":
                return "spinner-text-deleting";
            case "fetching":
                return "spinner-text-fetching";
            case "searching":
                return "spinner-text-searching";
            case "submitting":
                return "spinner-text-submitting";
            default:
                return "spinner-text-waiting";
        }
    }

    /**
     * get spinner texts
     *
     * @param {string | undefined} spinnerId
     * @returns {HTMLCollectionOf<HTMLElement> | null}
     */
    protected getSpinnerTexts(
        spinnerId?: string
    ): HTMLCollectionOf<HTMLElement> | null {
        return this.getSpinner(spinnerId)?.getElementsByClassName(
            "spinner-text"
        ) as HTMLCollectionOf<HTMLElement>;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * spinner instance
     *
     * @type {Spinner}
     */
    public static readonly instance: Spinner = new Spinner();

    /**
     * show
     *
     * @param {SpinnerText | undefined} type
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    public static show(type?: SpinnerText, spinnerId?: string): void {
        this.instance.show(type, spinnerId);
    }

    /**
     * hide
     *
     * @param {string | undefined} spinnerId
     * @returns {void}
     */
    public static hide(spinnerId?: string): void {
        this.instance.hide(spinnerId);
    }
}
