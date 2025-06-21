/*****************************************
 * Package Module History
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * State
 *----------------------------------------*/

/**
 * History State
 */
export type HistoryState<T> = {
    value: T;
    timestamp: number;
};
