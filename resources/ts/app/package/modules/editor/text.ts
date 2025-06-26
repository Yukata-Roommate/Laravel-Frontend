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
     * setup event handlers
     *
     * @return {void}
     */
    protected setupHandlers(): void {
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

        this.addKeydownHandler(
            { ctrl: true, shift: false, alt: false, meta: false, key: "z" },
            () => this.onCtrlZ()
        );

        this.addKeydownHandler(
            { ctrl: true, shift: false, alt: false, meta: false, key: "y" },
            () => this.onCtrlY()
        );

        this.addHandler("input", () => {
            this.saveCurrentState();
        });
    }

    /*----------------------------------------*
     * Tab
     *----------------------------------------*/

    /**
     * handle tab key
     *
     * @returns {void}
     */
    protected onTab(): void {
        this.preventDefault();

        this.insertText("\t");
    }

    /*----------------------------------------*
     * Ctrl + c
     *----------------------------------------*/

    /**
     * handle ctrl + c (copy)
     *
     * @returns {void}
     */
    protected onCtrlC(): void {
        Clipboard.clear();

        this.preventDefault();

        this.hasSelection ? this.onCopy() : this.onLineCopy();
    }

    /**
     * handle normal copy
     *
     * @returns {void}
     */
    protected onCopy(): void {
        Clipboard.write(this.selectedText);
    }

    /**
     * handle line copy
     *
     * @returns {void}
     */
    protected onLineCopy(): void {
        const lineInfo = this.currentLine;
        const copyText = lineInfo.text + "\n";

        Clipboard.write(copyText);
    }

    /*----------------------------------------*
     * Ctrl + x
     *----------------------------------------*/

    /**
     * handle ctrl + x (cut)
     *
     * @returns {void}
     */
    protected onCtrlX(): void {
        Clipboard.clear();

        this.preventDefault();

        this.hasSelection ? this.onCut() : this.onLineCut();
    }

    /**
     * handle normal cut
     *
     * @returns {void}
     */
    protected onCut(): void {
        Clipboard.write(this.selectedText).then(() => {
            const beforeSelection = this.value.substring(
                0,
                this.selectionStart
            );
            const afterSelection = this.value.substring(this.selectionEnd);
            const newValue = beforeSelection + afterSelection;

            this.setValue(newValue, this.selectionStart);
        });
    }

    /**
     * handle line cut
     *
     * @returns {void}
     */
    protected onLineCut(): void {
        const lineInfo = this.currentLine;
        const cutText = lineInfo.text + "\n";

        Clipboard.write(cutText).then(() => {
            const beforeLine = this.value.substring(0, lineInfo.start);
            const afterLine = this.value.substring(lineInfo.end);
            const newValue = beforeLine + afterLine;
            const newCursorPos = Math.min(beforeLine.length, newValue.length);

            this.setValue(newValue, newCursorPos);
        });
    }

    /*----------------------------------------*
     * Ctrl + v
     *----------------------------------------*/

    /**
     * handle ctrl + v (paste)
     *
     * @returns {void}
     */
    protected onCtrlV(): void {
        this.preventDefault();

        Clipboard.read().then((clipboardText) => {
            if (!clipboardText) return;

            this.hasSelection
                ? this.onPaste(clipboardText)
                : this.onCursorPaste(clipboardText);
        });
    }

    /**
     * handle normal paste (replace selection)
     *
     * @param {string} clipboardText
     * @returns {void}
     */
    protected onPaste(clipboardText: string): void {
        const beforeSelection = this.value.substring(0, this.selectionStart);
        const afterSelection = this.value.substring(this.selectionEnd);
        const newValue = beforeSelection + clipboardText + afterSelection;
        const newCursorPos = this.selectionStart + clipboardText.length;

        this.setValue(newValue, newCursorPos);
    }

    /**
     * handle cursor paste (no selection)
     *
     * @param {string} clipboardText
     * @returns {void}
     */
    protected onCursorPaste(clipboardText: string): void {
        const isLineCopy =
            clipboardText.endsWith("\n") &&
            !clipboardText.slice(0, -1).includes("\n");

        isLineCopy
            ? this.onLinePaste(clipboardText)
            : this.onNormalPaste(clipboardText);
    }

    /**
     * handle normal paste at cursor position
     *
     * @param {string} clipboardText
     * @returns {void}
     */
    protected onNormalPaste(clipboardText: string): void {
        const value = this.value;
        const cursorPos = this.selectionStart;
        const beforeCursor = value.substring(0, cursorPos);
        const afterCursor = value.substring(cursorPos);
        const newValue = beforeCursor + clipboardText + afterCursor;
        const newCursorPos = cursorPos + clipboardText.length;

        this.setValue(newValue, newCursorPos);
    }

    /**
     * handle line paste
     *
     * @param {string} clipboardText
     * @returns {void}
     */
    protected onLinePaste(clipboardText: string): void {
        const lineInfo = this.currentLine;
        const beforeLine = this.value.substring(0, lineInfo.start);
        const afterLine = this.value.substring(lineInfo.start);
        const newValue = beforeLine + clipboardText + afterLine;
        const newCursorPos = lineInfo.start + clipboardText.length - 1;

        this.setValue(newValue, newCursorPos);
    }

    /*----------------------------------------*
     * Undo/Redo
     *----------------------------------------*/

    /**
     * handle ctrl + z (undo)
     *
     * @returns {void}
     */
    protected onCtrlZ(): void {
        this.preventDefault();

        this.undo();
    }

    /**
     * handle ctrl + y (redo)
     *
     * @returns {void}
     */
    protected onCtrlY(): void {
        this.preventDefault();

        this.redo();
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
        this.instance.handle(event, element);
    }

    /**
     * on input event handler
     *
     * @param {Event} event
     * @param {Element} element
     * @returns {void}
     */
    public static onInput(event: Event, element: Element): void {
        this.instance.handle(event, element);
    }
}
