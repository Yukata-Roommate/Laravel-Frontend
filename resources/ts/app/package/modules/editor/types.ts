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

/*----------------------------------------*
 * Event
 *----------------------------------------*/

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

/**
 * Keydown Handler
 */
export type KeydownHandler = PressedKeys & {
    callback: () => void;
};
