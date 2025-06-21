/*****************************************
 * Package Module Editor
 *
 * Base
 *****************************************/

import type { LineInfo, PressedKeys, KeydownHandler } from "./types";

/**
 * Base Editor
 */
export abstract class BaseEditor {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     */
    public constructor() {
        this.setupKeydownHandlers();
    }

    /*----------------------------------------*
     * On Keydown
     *----------------------------------------*/

    /**
     * on keydown event handler
     *
     * @param {KeyboardEvent} event
     * @param {Element} element
     * @returns {void}
     */
    public onKeydown(event: KeyboardEvent, element: Element): void {
        if (!(element instanceof HTMLTextAreaElement)) return;

        this.event = event;
        this.element = element;

        const keys = {
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            alt: event.altKey,
            meta: event.metaKey,

            key: event.key.toLowerCase(),
        };

        this.executeKeydownHandler(keys);
    }

    /*----------------------------------------*
     * Keydown Handler
     *----------------------------------------*/

    /**
     * keydown handlers
     *
     * @type {KeydownHandler[]}
     */
    protected keydownHandlers: KeydownHandler[] = [];

    /**
     * setup keydown handlers
     *
     * @return {void}
     */
    protected abstract setupKeydownHandlers(): void;

    /**
     * whether keydown handler is equal to pressed keys
     *
     * @param {PressedKeys} keys
     * @param {KeydownHandler} handler
     * @returns {boolean}
     */
    protected isEqualKeydownHandler(
        keys: PressedKeys,
        handler: KeydownHandler
    ): boolean {
        return (
            handler.ctrl === keys.ctrl &&
            handler.shift === keys.shift &&
            handler.alt === keys.alt &&
            handler.meta === keys.meta &&
            handler.key === keys.key
        );
    }

    /**
     * get keydown handler index
     *
     * @param {PressedKeys} keys
     * @returns {number}
     */
    protected keydownHandlerIndex(keys: PressedKeys): number {
        return this.keydownHandlers.findIndex((handler) =>
            this.isEqualKeydownHandler(keys, handler)
        );
    }

    /**
     * execute matched keydown handler
     *
     * @param {PressedKeys} keys
     * @returns {void}
     */
    protected executeKeydownHandler(keys: PressedKeys): void {
        const index = this.keydownHandlerIndex(keys);

        if (index === -1) return;

        this.keydownHandlers[index].callback();
    }

    /**
     * add keydown handler
     *
     * @param {PressedKeys} keys
     * @param {() => void} callback
     * @returns {void}
     */
    protected addKeydownHandler(keys: PressedKeys, callback: () => void): void {
        const index = this.keydownHandlerIndex(keys);

        if (index !== -1) this.removeKeydownHandler(keys);

        this.keydownHandlers.push({
            ctrl: keys.ctrl,
            shift: keys.shift,
            alt: keys.alt,
            meta: keys.meta,
            key: keys.key,
            callback: callback,
        });
    }

    /**
     * remove keydown handler
     *
     * @param {PressedKeys} keys
     * @returns {void}
     */
    protected removeKeydownHandler(keys: PressedKeys): void {
        const index = this.keydownHandlerIndex(keys);

        if (index === -1) return;

        this.keydownHandlers.splice(index, 1);
    }

    /*----------------------------------------*
     * Event
     *----------------------------------------*/

    /**
     * keyboard event
     *
     * @type {KeyboardEvent}
     */
    protected event: KeyboardEvent;

    /**
     * prevent default event
     *
     * @returns {void}
     */
    protected preventDefault(): void {
        if (this.event.defaultPrevented) return;

        this.event.preventDefault();
    }

    /*----------------------------------------*
     * Element
     *----------------------------------------*/

    /**
     * textarea element
     *
     * @type {HTMLTextAreaElement}
     */
    protected element: HTMLTextAreaElement;

    /**
     * get textarea value
     *
     * @returns {string}
     */
    protected get value(): string {
        return this.element.value;
    }

    /**
     * set textarea value
     *
     * @param {string} text
     * @param {number} start
     * @param {number | undefined} end
     * @param {boolean} dispatchEvent
     * @returns {void}
     */
    protected setValue(
        text: string,
        start: number,
        end: number | undefined = undefined,
        dispatchEvent: boolean = true
    ): void {
        if (end === undefined) end = start;

        this.element.value = text;
        this.element.setSelectionRange(start, end);

        if (!dispatchEvent) return;

        this.element.dispatchEvent(new Event("input", { bubbles: true }));
    }

    /**
     * get textarea selection start
     *
     * @return {number}
     */
    protected get selectionStart(): number {
        return this.element.selectionStart;
    }

    /**
     * get textarea selection end
     *
     * @return {number}
     */
    protected get selectionEnd(): number {
        return this.element.selectionEnd;
    }

    /**
     * whether element has selection
     *
     * @return {boolean}
     */
    protected get hasSelection(): boolean {
        return this.selectionStart !== this.selectionEnd;
    }

    /**
     * get selected text
     *
     * @return {string}
     */
    protected get selectedText(): string {
        return this.value.substring(this.selectionStart, this.selectionEnd);
    }

    /**
     * get current line info
     *
     * @return {LineInfo}
     */
    protected get currentLine(): LineInfo {
        const value = this.value;
        const cursor = this.selectionStart;

        let lineStart = cursor;
        while (lineStart > 0 && value[lineStart - 1] !== "\n") {
            lineStart--;
        }

        let lineEnd = cursor;
        while (lineEnd < value.length && value[lineEnd] !== "\n") {
            lineEnd++;
        }

        const endWithNewline = lineEnd < value.length ? lineEnd + 1 : lineEnd;

        return {
            text: value.substring(lineStart, lineEnd),
            start: lineStart,
            end: endWithNewline,
        };
    }

    /**
     * get selected lines info
     *
     * @return {LineInfo[]}
     */
    protected get selectedLines(): LineInfo[] {
        const value = this.value;
        const start = this.selectionStart;
        const end = this.selectionEnd;

        const lines: LineInfo[] = [];
        let lineStart = start;

        while (lineStart < end) {
            let lineEnd = lineStart;

            while (lineEnd < value.length && value[lineEnd] !== "\n") {
                lineEnd++;
            }

            lines.push({
                text: value.substring(lineStart, lineEnd),
                start: lineStart,
                end: lineEnd + 1,
            });

            lineStart = lineEnd + 1;
        }

        return lines;
    }

    /**
     * insert text at cursor position
     *
     * @param {string} text
     * @param {boolean} replaceSelection
     * @returns {void}
     */
    protected insertText(
        text: string,
        replaceSelection: boolean = false
    ): void {
        const value = this.value;
        const start = this.selectionStart;

        const behind = replaceSelection
            ? value.substring(this.selectionEnd)
            : value.substring(start);

        const newValue = value.substring(0, start) + text + behind;

        this.setValue(newValue, start + text.length);
    }
}
