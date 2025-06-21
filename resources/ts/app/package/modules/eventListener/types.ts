/*****************************************
 * Package Module Event Listener
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Callable
 *----------------------------------------*/

/**
 * Callable Function
 */
export type CallableFunction<EventName extends keyof DocumentEventMap> = (
    event: DocumentEventMap[EventName],
    target: Element
) => void;

/**
 * Callable Object
 */
export type CallableObject<EventName extends keyof DocumentEventMap> = {
    handleEvent: (event: DocumentEventMap[EventName]) => void;
};

/**
 * Callable
 */
export type Callable<EventName extends keyof DocumentEventMap> =
    | CallableFunction<EventName>
    | CallableObject<EventName>;

/*----------------------------------------*
 * Callback
 *----------------------------------------*/

/**
 * Event Listener Callback
 */
export type EventListenerCallback = EventListener;
