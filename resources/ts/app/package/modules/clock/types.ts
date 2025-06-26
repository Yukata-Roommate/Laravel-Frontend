/*****************************************
 * Package Module Clock
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Datetime
 *----------------------------------------*/

/**
 * Datetime
 */
export type Datetime = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    dayOfWeek: number;
};

/*----------------------------------------*
 * Day of Week
 *----------------------------------------*/

/**
 * Day Of Week Type
 */
export type DayOfWeekType = "short" | "long";

/**
 * Day Of Week Language
 */
export type DayOfWeekLanguage = "en" | "ja";