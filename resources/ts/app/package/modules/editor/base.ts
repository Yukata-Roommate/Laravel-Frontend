/*****************************************
 * Package Module Editor
 *
 * Base
 *****************************************/

import type {
    LineInfo,
    EditorState,
    EventHandler,
    EventHandlerCallback,
    EventHandlerCondition,
    TypeSafetyEventHandler,
    TypeSafetyEventHandlerCondition,
    PressedKeys,
} from "./types";

import { History } from "../history";

/**
 * Base Editor
 */
export abstract class BaseEditor {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {number} maxHistorySize
     */
    public constructor(maxHistorySize: number = 100) {
        this.history = new History<EditorState>(maxHistorySize);

        this.setupHandlers();
    }

    /*----------------------------------------*
     * Event Handler
     *----------------------------------------*/

    /**
     * event handlers
     *
     * @type {EventHandler[]}
     */
    protected handlers: EventHandler[] = [];

    /**
     * setup event handlers
     *
     * @return {void}
     */
    protected abstract setupHandlers(): void;

    /**
     * handle event
     *
     * @param {Event} event
     * @param {Element} element
     * @returns {void}
     */
    public handle(event: Event, element: Element): void {
        if (!(element instanceof HTMLTextAreaElement)) return;

        this.event = event;
        this.element = element;

        if (this.history.isEmpty && !this.isRestoring) this.saveCurrentState();

        this.executeHandlers();
    }

    /**
     * execute event handler
     *
     * @returns {void}
     */
    protected executeHandlers(): void {
        this.handlers.forEach((handler) => {
            if (handler.event !== this.event.type) return;

            if (handler.condition && !handler.condition(this.event)) return;

            handler.callback();
        });
    }

    /**
     * add event handler
     *
     * @param {EventName} event
     * @param {EventHandlerCallback} callback
     * @param {TypeSafetyEventHandlerCondition<EventName> | undefined} condition
     * @returns {void}
     */
    protected addHandler<EventName extends keyof DocumentEventMap>(
        event: EventName,
        callback: EventHandlerCallback,
        condition?: TypeSafetyEventHandlerCondition<EventName>
    ): void {
        const typeSafetyHandler: TypeSafetyEventHandler<EventName> = {
            event: event,
            callback: callback,
            condition: condition,
        };

        const handler: EventHandler = {
            event: typeSafetyHandler.event,
            callback: typeSafetyHandler.callback,
            condition: typeSafetyHandler.condition as
                | EventHandlerCondition
                | undefined,
        };

        this.handlers.push(handler);
    }

    /**
     * add keydown handler
     *
     * @param {PressedKeys} keys
     * @param {EventHandlerCallback} callback
     * @returns {void}
     */
    protected addKeydownHandler(
        keys: PressedKeys,
        callback: EventHandlerCallback
    ): void {
        this.addHandler("keydown", callback, (event: KeyboardEvent) => {
            return (
                event.ctrlKey === keys.ctrl &&
                event.shiftKey === keys.shift &&
                event.altKey === keys.alt &&
                event.metaKey === keys.meta &&
                event.key.toLowerCase() === keys.key
            );
        });
    }

    /*----------------------------------------*
     * History
     *----------------------------------------*/

    /**
     * history
     *
     * @type {History<EditorState>}
     */
    protected history: History<EditorState>;

    /**
     * whether currently restoring state
     *
     * @type {boolean}
     */
    protected isRestoring: boolean = false;

    /**
     * save current state to history
     *
     * @returns {void}
     */
    protected saveCurrentState(): void {
        if (this.isRestoring) return;

        this.history.save({
            value: this.value,
            selectionStart: this.selectionStart,
            selectionEnd: this.selectionEnd,
        });
    }

    /**
     * restore editor state
     *
     * @param {EditorState} state
     * @returns {void}
     */
    protected restoreState(state: EditorState): void {
        this.isRestoring = true;

        try {
            this.setValue(
                state.value,
                state.selectionStart,
                state.selectionEnd,
                false,
                false
            );
        } finally {
            this.isRestoring = false;
        }
    }

    /**
     * undo last change
     *
     * @returns {void}
     */
    protected undo(): void {
        if (!this.history.hasPrevious()) return;

        this.history.previous();

        this.restoreState(this.history.currentValue);
    }

    /**
     * redo last undone change
     *
     * @returns {void}
     */
    protected redo(): void {
        if (!this.history.hasNext()) return;

        this.history.next();

        this.restoreState(this.history.currentValue);
    }

    /*----------------------------------------*
     * Event
     *----------------------------------------*/

    /**
     * event
     *
     * @type {Event}
     */
    protected event: Event;

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
     * set textarea value
     *
     * @param {string} text
     * @param {number} start
     * @param {number | undefined} end
     * @param {boolean} dispatchEvent
     * @param {boolean} saveHistory
     * @returns {void}
     */
    protected setValue(
        text: string,
        start: number,
        end: number | undefined = undefined,
        dispatchEvent: boolean = true,
        saveHistory: boolean = true
    ): void {
        if (end === undefined) end = start;

        this.element.value = text;
        this.element.setSelectionRange(start, end);

        if (saveHistory && !this.isRestoring) this.saveCurrentState();

        if (!dispatchEvent) return;

        this.element.dispatchEvent(new Event("input", { bubbles: true }));
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

        this.setValue(newValue, start + text.length, undefined, true, true);
    }
}
