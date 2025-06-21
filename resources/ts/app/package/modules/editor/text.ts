/*****************************************
 * Package Module Editor
 *
 * Text
 *****************************************/

import { BaseEditor } from "./base";

import { Clipboard } from "../clipboard";

/**
 * Text Editor
 */
export class TextEditor extends BaseEditor {
    /*----------------------------------------*
     * Keydown Handler
     *----------------------------------------*/

    /**
     * setup keydown handlers
     *
     * @return {void}
     */
    protected setupKeydownHandlers(): void {
        this.addKeydownHandler(
            { ctrl: false, shift: false, alt: false, meta: false, key: "tab" },
            () => this.onTab()
        );

        this.addKeydownHandler(
            { ctrl: true, shift: false, alt: false, meta: false, key: "c" },
            () => this.onCtrlC()
        );

        this.addKeydownHandler(
            { ctrl: true, shift: false, alt: false, meta: false, key: "x" },
            () => this.onCtrlX()
        );

        this.addKeydownHandler(
            { ctrl: true, shift: false, alt: false, meta: false, key: "v" },
            () => this.onCtrlV()
        );
    }

    /**
     * handle tab key
     *
     * @returns {void}
     */
    protected onTab(): void {
        this.preventDefault();

        this.insertText("\t");
    }

    /**
     * handle ctrl + c (copy line)
     *
     * @returns {void}
     */
    protected onCtrlC(): void {
        if (this.hasSelection) return;

        this.preventDefault();

        const lineInfo = this.currentLine;
        const lineText = lineInfo.text + "\n";

        Clipboard.write(lineText);
    }

    /**
     * handle ctrl + x (cut line)
     *
     * @returns {void}
     */
    protected onCtrlX(): void {
        if (this.hasSelection) return;

        this.preventDefault();

        const lineInfo = this.currentLine;
        const lineText = lineInfo.text + "\n";

        Clipboard.write(lineText).then(() => {
            const beforeLine = this.value.substring(0, lineInfo.start);
            const afterLine = this.value.substring(lineInfo.end);
            const newValue = beforeLine + afterLine;
            const newCursorPos = Math.min(beforeLine.length, newValue.length);

            this.setValue(newValue, newCursorPos);
        });
    }

    /**
     * handle ctrl + v (paste line)
     *
     * @returns {void}
     */
    protected onCtrlV(): void {
        if (this.hasSelection) return;

        Clipboard.read().then((clipboardText) => {
            if (!clipboardText) return;

            const isLineCopy =
                clipboardText.endsWith("\n") &&
                !clipboardText.slice(0, -1).includes("\n");

            if (!isLineCopy) return;

            this.preventDefault();

            const lineInfo = this.currentLine;
            const beforeLine = this.value.substring(0, lineInfo.start);
            const afterLine = this.value.substring(lineInfo.start);
            const newValue = beforeLine + clipboardText + afterLine;
            const newCursorPos = lineInfo.start + clipboardText.length - 1;

            this.setValue(newValue, newCursorPos);
        });
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * text editor instance
     *
     * @type {TextEditor}
     */
    public static readonly instance: TextEditor = new TextEditor();

    /**
     * on keydown event handler
     *
     * @param {KeyboardEvent} event
     * @param {Element} element
     * @returns {void}
     */
    public static onKeydown(event: KeyboardEvent, element: Element): void {
        this.instance.onKeydown(event, element);
    }
}
