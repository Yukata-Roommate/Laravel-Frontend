/*****************************************
 * Package Module Randomizer
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Flag
 *----------------------------------------*/

/**
 * Flag Options
 */
export type FlagOptions = {
    true?: number;
    false?: number;
};

/*----------------------------------------*
 * Number
 *----------------------------------------*/

/**
 * Number Options
 */
export type NumberOptions = {
    min?: number;
    max?: number;
};

/*----------------------------------------*
 * Text
 *----------------------------------------*/

/**
 * Base Text Options
 */
export type BaseTextOptions = {
    length: number;
    excludes?: string[];
};

/**
 * Custom Text Options
 */
export type CustomTextOptions = BaseTextOptions & {
    custom: string;
};

/**
 * Alphabet Options
 */
export type AlphabetOptions = BaseTextOptions & {
    upper?: boolean;
    lower?: boolean;
};

/**
 * AlphaNumeric Options
 */
export type AlphaNumericOptions = AlphabetOptions & {
    number?: boolean;
};

/**
 * Text Options
 */
export type TextOptions = AlphaNumericOptions & {
    symbol?: boolean;
    include?: string;
};
