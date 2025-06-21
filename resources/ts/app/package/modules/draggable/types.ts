/*****************************************
 * Package Module Draggable
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Event Handler
 *----------------------------------------*/

/**
 * Ondragstart Event Handler
 */
export type OnDragStartEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;

/**
 * Ondragend Event Handler
 */
export type OnDragEndEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;

/**
 * Ondragover Event Handler
 */
export type OnDragOverEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;

/**
 * Ondragenter Event Handler
 */
export type OnDragEnterEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;

/**
 * Ondragleave Event Handler
 */
export type OnDragLeaveEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;

/**
 * Ondrop Event Handler
 */
export type OnDropEventHandler = (
    event: DragEvent,
    area: HTMLElement,
    item: HTMLElement
) => void;
