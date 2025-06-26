/*****************************************
 * Package Module Randomizer
 *
 * Text
 *****************************************/

import { BaseRandomizer } from "./base";

import {
    CustomTextOptions,
    AlphabetOptions,
    AlphaNumericOptions,
    TextOptions,
} from "./types";

/**
 * Text Randomizer
 */
export class TextRandomizer extends BaseRandomizer {
    /**
     * upper case string
     *
     * @type {string}
     */
    protected upperCaseString: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * lower case string
     *
     * @type {string}
     */
    protected lowerCaseString: string = "abcdefghijklmnopqrstuvwxyz";

    /**
     * number string
     *
     * @type {string}
     */
    protected numberString: string = "0123456789";

    /**
     * symbol string
     *
     * @type {string}
     */
    protected symbolString: string = "!@#$%^&*()_+[]{}|;:,.<>?";

    /**
     * get random custom text
     *
     * @param {CustomTextOptions} options
     * @returns {string}
     */
    public customText(options: CustomTextOptions): string {
        if (options.length < 0)
            throw new Error("Length must be greater than or equal to 0.");

        const text = options.custom;

        if (text.length === 0) throw new Error("Text array must not be empty.");

        const excludes = options.excludes || [];

        let result = "";

        while (result.length < options.length) {
            const randomIndex = Math.floor(Math.random() * text.length);
            const randomChar = text[randomIndex];

            result += randomChar;

            if (!excludes.length) continue;

            for (const exclude of excludes) {
                if (result.includes(exclude))
                    result = result.replace(exclude, "");
            }
        }

        return result;
    }

    /**
     * get random alphabet
     *
     * @param {AlphabetOptions} options
     * @returns {string}
     */
    public alphabet(options: AlphabetOptions): string {
        const upper = options.upper ? this.upperCaseString : "";
        const lower = options.lower ? this.lowerCaseString : "";

        return this.customText({
            length: options.length,
            custom: upper + lower,
            excludes: options.excludes,
        });
    }

    /**
     * get random alphanumeric
     *
     * @param {AlphaNumericOptions} options
     * @returns {string}
     */
    public alphaNumeric(options: AlphaNumericOptions): string {
        const upper = options.upper ? this.upperCaseString : "";
        const lower = options.lower ? this.lowerCaseString : "";
        const number = options.number ? this.numberString : "";

        return this.customText({
            length: options.length,
            custom: upper + lower + number,
            excludes: options.excludes,
        });
    }

    /**
     * get random text
     *
     * @param {TextOptions} options
     * @returns {string}
     */
    public text(options: TextOptions): string {
        const upper = options.upper ? this.upperCaseString : "";
        const lower = options.lower ? this.lowerCaseString : "";
        const number = options.number ? this.numberString : "";
        const symbol = options.symbol ? this.symbolString : "";
        const include = options.include || "";

        return this.customText({
            length: options.length,
            custom: upper + lower + number + symbol + include,
            excludes: options.excludes,
        });
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * text randomizer instance
     *
     * @type {TextRandomizer}
     */
    public static readonly instance: TextRandomizer = new TextRandomizer();

    /**
     * get random custom text
     *
     * @param {CustomTextOptions} options
     * @returns {string}
     */
    public static customText(options: CustomTextOptions): string {
        return this.instance.customText(options);
    }

    /**
     * get random alphabet
     *
     * @param {AlphabetOptions} options
     * @returns {string}
     */
    public static alphabet(options: AlphabetOptions): string {
        return this.instance.alphabet(options);
    }

    /**
     * get random alphanumeric
     *
     * @param {AlphaNumericOptions} options
     * @returns {string}
     */
    public static alphaNumeric(options: AlphaNumericOptions): string {
        return this.instance.alphaNumeric(options);
    }

    /**
     * get random text
     *
     * @param {TextOptions} options
     * @returns {string}
     */
    public static text(options: TextOptions): string {
        return this.instance.text(options);
    }
}
