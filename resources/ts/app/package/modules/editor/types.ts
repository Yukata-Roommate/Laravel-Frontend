/*****************************************
 * Package Module Editor
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Textarea
 *----------------------------------------*/

/**
 * Line Info
 */
export type LineInfo = {
    start: number;
    end: number;
    text: string;
};

/**
 * Editor State for History
 */
export type EditorState = {
    value: string;
    selectionStart: number;
    selectionEnd: number;
};

/*----------------------------------------*
 * Event
 *----------------------------------------*/

/**
 * Type Safety Event Handler
 */
export type TypeSafetyEventHandler<
    EventName extends keyof DocumentEventMap = keyof DocumentEventMap
> = {
    event: EventName;
    callback: EventHandlerCallback;
    condition?: TypeSafetyEventHandlerCondition<EventName>;
};

/**
 * Event Handler Callback
 */
export type EventHandlerCallback = () => void;

/**
 * Type Safety Event Handler Condition
 */
export type TypeSafetyEventHandlerCondition<
    EventName extends keyof DocumentEventMap
> = (event: DocumentEventMap[EventName]) => boolean;

/**
 * Event Handler
 */
export type EventHandler = {
    event: string;
    callback: EventHandlerCallback;
    condition?: (event: Event) => boolean;
};

/**
 * Event Handler Condition
 */
export type EventHandlerCondition = (event: Event) => boolean;

/**
 * Pressed Keys
 */
export type PressedKeys = {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
    key: string;
};
