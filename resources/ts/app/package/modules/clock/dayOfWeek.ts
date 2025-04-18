/*****************************************
 * Package Module Clock
 *
 * Day of Week
 *****************************************/

/*----------------------------------------*
 * Exports
 *----------------------------------------*/

export { DayOfWeek };
export type { DayOfWeekType, DayOfWeekLanguage };

/*----------------------------------------*
 * Class
 *----------------------------------------*/

/**
 * Analog Clock
 */
class DayOfWeek {
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
    get type(): DayOfWeekType {
        return this._type;
    }

    /**
     * set day of week type
     *
     * @param {string} type
     */
    set type(type: string) {
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
    get language(): DayOfWeekLanguage {
        return this._language;
    }

    /**
     * set day of week language
     *
     * @param {string} language
     */
    set language(language: string) {
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

/*----------------------------------------*
 * Types
 *----------------------------------------*/

/**
 * Day Of Week Type
 */
type DayOfWeekType = "short" | "long";

/**
 * Day Of Week Language
 */
type DayOfWeekLanguage = "en" | "ja";

/*----------------------------------------*
 * Constants
 *----------------------------------------*/

/**
 * Day Of Week Japanese Short
 *
 * @type {string[]}
 */
const DAY_OF_WEEK_JA_SHORT: string[] = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
];

/**
 * Day Of Week Japanese Long
 *
 * @type {string[]}
 */
const DAY_OF_WEEK_JA_LONG: string[] = [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
];

/**
 * Day Of Week English Short
 *
 * @type {string[]}
 */
const DAY_OF_WEEK_EN_SHORT: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

/**
 * Day Of Week English Long
 *
 * @type {string[]}
 */
const DAY_OF_WEEK_EN_LONG: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
