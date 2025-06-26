/*****************************************
 * Package Module Editor
 *
 * Markdown
 *****************************************/

import { TextEditor } from "./text";

/**
 * Markdown Editor
 */
export class MarkdownEditor extends TextEditor {
    /*----------------------------------------*
     * Keydown Handler
     *----------------------------------------*/

    /**
     * setup event handlers
     *
     * @return {void}
     */
    protected setupHandlers(): void {
        super.setupHandlers();

        this.addKeydownHandler(
            {
                ctrl: false,
                shift: false,
                alt: false,
                meta: false,
                key: "enter",
            },
            () => this.onEnter()
        );
    }

    /**
     * handle tab key
     *
     * @returns {void}
     */
    protected override onTab(): void {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const lines = textBeforeCursor.split("\n");
        const currentLine = lines[lines.length - 1];

        const listPatterns = [/^(\s*)([-*+])\s+(.*)$/, /^(\s*)(\d+\.)\s+(.*)$/];

        for (const pattern of listPatterns) {
            const match = currentLine.match(pattern);

            if (!match) continue;

            this.preventDefault();

            const [, indent, marker, content] = match;
            const newIndent = indent + "\t";

            const lineStart = cursorPos - currentLine.length;
            const newLine = `${newIndent}${marker} ${content}`;
            const newCursorPos = cursorPos + newIndent.length;

            const newValue =
                this.value.substring(0, lineStart) +
                newLine +
                this.value.substring(cursorPos);

            this.setValue(newValue, newCursorPos);

            return;
        }

        super.onTab();
    }

    /**
     * handle enter key
     *
     * @returns {void}
     */
    protected onEnter(): void {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const lines = textBeforeCursor.split("\n");
        const currentLine = lines[lines.length - 1];

        const listPatterns = [
            /^(\s*)([-*+])\s+(.*)$/,
            /^(\s*)(\d+\.)\s+(.*)$/,
            /^(\s*)(>\s*)(.*)$/,
        ];

        let matched = false;

        for (const pattern of listPatterns) {
            const match = currentLine.match(pattern);

            if (!match) continue;

            const [, indent, marker, content] = match;

            if (!content.trim()) {
                this.preventDefault();

                const lineStart = cursorPos - currentLine.length;
                const newValue =
                    this.value.substring(0, lineStart) +
                    "\n" +
                    this.value.substring(cursorPos);
                const newCursorPos = lineStart + 1;

                this.setValue(newValue, newCursorPos);

                matched = true;

                break;
            }

            this.preventDefault();

            let newMarker = marker;

            if (/^\d+\.$/.test(marker)) {
                const num = parseInt(marker) + 1;

                newMarker = `${num}.`;
            }

            const newLine = `\n${indent}${newMarker} `;
            const newCursorPos = cursorPos + newLine.length;

            const newValue =
                this.value.substring(0, cursorPos) +
                newLine +
                this.value.substring(cursorPos);

            this.setValue(newValue, newCursorPos);

            matched = true;

            break;
        }

        if (matched) return;

        const indentMatch = currentLine.match(/^(\s*)/);

        if (indentMatch && indentMatch[1]) {
            this.preventDefault();

            const indent = indentMatch[1];
            const newLine = `\n${indent}`;
            const newCursorPos = cursorPos + newLine.length;

            const newValue =
                this.value.substring(0, cursorPos) +
                newLine +
                this.value.substring(cursorPos);

            this.setValue(newValue, newCursorPos);

            return;
        }
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * markdown editor instance
     *
     * @type {MarkdownEditor}
     */
    public static readonly instance: MarkdownEditor = new MarkdownEditor();

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
