/*****************************************
 * Package Module Clock
 *
 * Day of Week
 *****************************************/

import type { DayOfWeekType, DayOfWeekLanguage } from "./types";
import {
    DAY_OF_WEEK_EN_SHORT,
    DAY_OF_WEEK_EN_LONG,
    DAY_OF_WEEK_JA_SHORT,
    DAY_OF_WEEK_JA_LONG,
} from "./constants";

/**
 * Day of Week
 */
export class DayOfWeek {
    /**
     * get day of week
     *
     * @returns {string[]}
     */
    public get(): string[] {
        switch (this.language) {
            case "en":
                return this.getEn();
            case "ja":
                return this.getJa();
        }
    }

    /**
     * get english day of week
     *
     * @returns {string[]}
     */
    protected getEn(): string[] {
        return this.type === "short"
            ? DAY_OF_WEEK_EN_SHORT
            : DAY_OF_WEEK_EN_LONG;
    }

    /**
     * get japanese day of week
     *
     * @returns {string[]}
     */
    protected getJa(): string[] {
        return this.type === "short"
            ? DAY_OF_WEEK_JA_SHORT
            : DAY_OF_WEEK_JA_LONG;
    }

    /*----------------------------------------*
     * Type
     *----------------------------------------*/

    /**
     * type
     *
     * @type {DayOfWeekType}
     */
    protected _type: DayOfWeekType = "short";

    /**
     * get day of week type
     *
     * @returns {DayOfWeekType}
     */
    public get type(): DayOfWeekType {
        return this._type;
    }

    /**
     * set day of week type
     *
     * @param {string} type
     */
    public set type(type: string) {
        if (!this.isType(type)) throw new Error(`Invalid type: ${type}`);

        this._type = type;
    }

    /**
     * whether type is valid
     *
     * @returns {type is DayOfWeekType}
     */
    public isType(type: string): type is DayOfWeekType {
        return ["short", "long"].includes(type);
    }

    /*----------------------------------------*
     * Language
     *----------------------------------------*/

    /**
     * language
     *
     * @type {DayOfWeekLanguage}
     */
    protected _language: DayOfWeekLanguage = "en";

    /**
     * get day of week language
     *
     * @returns {DayOfWeekLanguage}
     */
    public get language(): DayOfWeekLanguage {
        return this._language;
    }

    /**
     * set day of week language
     *
     * @param {string} language
     */
    public set language(language: string) {
        if (!this.isLanguage(language))
            throw new Error(`Invalid language: ${language}`);

        this._language = language;
    }

    /**
     * whether language is valid
     *
     * @param {string} language
     * @returns {language is DayOfWeekLanguage}
     */
    protected isLanguage(language: string): language is DayOfWeekLanguage {
        return ["en", "ja"].includes(language);
    }
}
