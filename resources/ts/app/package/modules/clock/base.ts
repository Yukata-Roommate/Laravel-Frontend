/*****************************************
 * Package Module Clock
 *
 * Base
 *****************************************/

import type { Datetime, DayOfWeekType, DayOfWeekLanguage } from "./types";

import { DayOfWeek } from "./dayOfWeek";

/**
 * Base Clock
 */
export abstract class BaseClock {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * target element
     *
     * @type {HTMLElement}
     */
    protected _target: HTMLElement;

    /**
     * constructor
     *
     * @param {HTMLElement} target
     */
    public constructor(target: HTMLElement) {
        this._target = target;
    }

    /*----------------------------------------*
     * Start
     *----------------------------------------*/

    /**
     * start ticking clock
     *
     * @returns {void}
     */
    public start(): void {
        this.render();

        setTimeout(
            function main() {
                setTimeout(main.bind(this), this.tickInterval);

                this.tick();
            }.bind(this),
            this.tickInterval
        );
    }

    /**
     * get next tick timing
     *
     * @returns {number}
     */
    public get tickInterval(): number {
        return 1000 - (Date.now() % 1000);
    }

    /*----------------------------------------*
     * Render
     *----------------------------------------*/

    /**
     * render
     *
     * @returns {void}
     */
    public render(): void {
        this.setClockElements();

        this._target.innerHTML = "";

        this.renderClock();
    }

    /**
     * set clock elements
     *
     * @returns {void}
     */
    protected setClockElements(): void {
        this.setYearElement();
        this.setMonthElement();
        this.setDayElement();
        this.setDayOfWeekElement();
        this.setHourElement();
        this.setMinuteElement();
        this.setSecondElement();
    }

    /**
     * render clock
     *
     * @returns {void}
     */
    protected abstract renderClock(): void;

    /**
     * append child element
     *
     * @param {HTMLElement} element
     * @returns {void}
     */
    protected appendElement(element: HTMLElement): void {
        this._target.appendChild(element);
    }

    /*----------------------------------------*
     * Tick
     *----------------------------------------*/

    /**
     * passed year
     *
     * @type {number}
     */
    protected passedYear: number;

    /**
     * passed month
     *
     * @type {number}
     */
    protected passedMonth: number;

    /**
     * passed day
     *
     * @type {number}
     */
    protected passedDay: number;

    /**
     * passed day of week
     *
     * @type {number}
     */
    protected passedDayOfWeek: number;

    /**
     * passed hour
     *
     * @type {number}
     */
    protected passedHour: number;

    /**
     * passed minute
     *
     * @type {number}
     */
    protected passedMinute: number;

    /**
     * passed second
     *
     * @type {number}
     */
    protected passedSecond: number;

    /**
     * tick
     *
     * @returns {void}
     */
    public tick(): void {
        const now = this.now;

        this.tickYear(now);
        this.tickMonth(now);
        this.tickDay(now);
        this.tickDayOfWeek(now);
        this.tickHour(now);
        this.tickMinute(now);
        this.tickSecond(now);

        this.passedYear = now.year;
        this.passedMonth = now.month;
        this.passedDay = now.day;
        this.passedDayOfWeek = now.dayOfWeek;
        this.passedHour = now.hour;
        this.passedMinute = now.minute;
        this.passedSecond = now.second;
    }

    /**
     * tick clock year
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickYear(now: Datetime): void;

    /**
     * tick clock month
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickMonth(now: Datetime): void;

    /**
     * tick clock day
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickDay(now: Datetime): void;

    /**
     * tick clock day of week
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickDayOfWeek(now: Datetime): void;

    /**
     * tick clock hour
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickHour(now: Datetime): void;

    /**
     * tick clock minute
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickMinute(now: Datetime): void;

    /**
     * tick clock second
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected abstract tickSecond(now: Datetime): void;

    /*----------------------------------------*
     * Elements
     *----------------------------------------*/

    /**
     * year element
     *
     * @type {HTMLElement}
     */
    protected yearElement: HTMLElement;

    /**
     * month element
     *
     * @type {HTMLElement}
     */
    protected monthElement: HTMLElement;

    /**
     * day element
     *
     * @type {HTMLElement}
     */
    protected dayElement: HTMLElement;

    /**
     * day of week element class
     *
     * @type {HTMLElement}
     */
    protected dayOfWeekElement: HTMLElement;

    /**
     * hour element
     *
     * @type {HTMLElement}
     */
    protected hourElement: HTMLElement;

    /**
     * minute element
     *
     * @type {HTMLElement}
     */
    protected minuteElement: HTMLElement;

    /**
     * second element
     *
     * @type {HTMLElement}
     */
    protected secondElement: HTMLElement;

    /**
     * set year element
     *
     * @returns {void}
     */
    protected setYearElement(): void {
        const yearElement = this.makeYearElement();

        this.yearElement = yearElement;
    }

    /**
     * make year element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeYearElement(): HTMLElement;

    /**
     * set month element
     *
     * @returns {void}
     */
    protected setMonthElement(): void {
        const monthElement = this.makeMonthElement();

        this.monthElement = monthElement;
    }

    /**
     * make month element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeMonthElement(): HTMLElement;

    /**
     * set day element
     *
     * @returns {void}
     */
    protected setDayElement(): void {
        const dayElement = this.makeDayElement();

        this.dayElement = dayElement;
    }

    /**
     * make day element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeDayElement(): HTMLElement;

    /**
     * set day of week element
     *
     * @returns {void}
     */
    protected setDayOfWeekElement(): void {
        const dayOfWeekElement = this.makeDayOfWeekElement();

        this.dayOfWeekElement = dayOfWeekElement;
    }

    /**
     * make day of week element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeDayOfWeekElement(): HTMLElement;

    /**
     * set hour element
     *
     * @returns {void}
     */
    protected setHourElement(): void {
        const hourElement = this.makeHourElement();

        this.hourElement = hourElement;
    }

    /**
     * make hour element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeHourElement(): HTMLElement;

    /**
     * set minute element
     *
     * @returns {void}
     */
    protected setMinuteElement(): void {
        const minuteElement = this.makeMinuteElement();

        this.minuteElement = minuteElement;
    }

    /**
     * make minute element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeMinuteElement(): HTMLElement;

    /**
     * set second element
     *
     * @returns {void}
     */
    protected setSecondElement(): void {
        const secondElement = this.makeSecondElement();

        this.secondElement = secondElement;
    }

    /**
     * make second element
     *
     * @returns {HTMLElement}
     */
    protected abstract makeSecondElement(): HTMLElement;

    /*----------------------------------------*
     * Day of Week
     *----------------------------------------*/

    /**
     * day of week
     *
     * @type {DayOfWeek}
     */
    protected _dayOfWeek: DayOfWeek = new DayOfWeek();

    /**
     * get day of week
     *
     * @returns {string[]}
     */
    public get dayOfWeek(): string[] {
        return this._dayOfWeek.get();
    }

    /**
     * get day of week language
     *
     * @returns {DayOfWeekLanguage}
     */
    public get dayOfWeekLanguage(): DayOfWeekLanguage {
        return this._dayOfWeek.language;
    }

    /**
     * set day of week language
     *
     * @param {string} language
     */
    public set dayOfWeekLanguage(language: string) {
        this._dayOfWeek.language = language;
    }

    /**
     * get day of week type
     *
     * @returns {DayOfWeekType}
     */
    public get dayOfWeekType(): DayOfWeekType {
        return this._dayOfWeek.type;
    }

    /**
     * set day of week type
     *
     * @param {string} type
     */
    public set dayOfWeekType(type: string) {
        this._dayOfWeek.type = type;
    }

    /*----------------------------------------*
     * Now
     *----------------------------------------*/

    /**
     * timezone
     *
     * @type {string}
     */
    public timezone: string = "";

    /**
     * hour offset
     *
     * @type {number}
     */
    public hourOffset: number = 0;

    /**
     * get offset date
     *
     * @returns {Datetime}
     */
    public get now(): Datetime {
        const nowDate = this.nowDate();

        return {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            day: nowDate.getDate(),
            hour: nowDate.getHours(),
            minute: nowDate.getMinutes(),
            second: nowDate.getSeconds(),
            dayOfWeek: nowDate.getDay(),
        };
    }

    /**
     * get now Date
     *
     * @returns {Date}
     */
    protected nowDate(): Date {
        const now = new Date();

        const timezoneDate = this.dateInTimezone(now);

        const offsetDate = this.dateApplyingOffset(timezoneDate);

        return offsetDate;
    }

    /**
     * get Date in timezone
     *
     * @param {Date} now
     * @returns {Date}
     */
    protected dateInTimezone(now: Date): Date {
        if (!this.timezone || this.timezone.trim() === "") return now;

        try {
            if (!this.isValidTimezone()) {
                console.error(`Invalid timezone: ${this.timezone}`);

                return now;
            }

            const parts = new Intl.DateTimeFormat("en-US", {
                timeZone: this.timezone,
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            }).formatToParts(now);

            const dateComponents: Record<string, number> = {};
            parts.forEach((part) => {
                if (part.type === "literal") return;

                dateComponents[part.type] = parseInt(part.value, 10);
            });

            const timezoneDate = new Date(
                dateComponents.year,
                dateComponents.month - 1,
                dateComponents.day,
                dateComponents.hour,
                dateComponents.minute,
                dateComponents.second
            );

            return timezoneDate;
        } catch (error) {
            console.error("Error getting timezone date:", error);

            return now;
        }
    }

    /**
     * whether timezone is valid
     *
     * @returns {boolean}
     */
    protected isValidTimezone(): boolean {
        try {
            Intl.DateTimeFormat("en-US", { timeZone: this.timezone });

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * get Date applying offset
     *
     * @param {Date} now
     * @returns {Date}
     */
    protected dateApplyingOffset(now: Date): Date {
        if (!this.hourOffset || this.hourOffset === 0) return now;

        try {
            const offsetDate = new Date(now);

            const millisecondOffset = this.hourOffset * 60 * 60 * 1000;

            const offsetTime = offsetDate.getTime() + millisecondOffset;

            offsetDate.setTime(offsetTime);

            return offsetDate;
        } catch (error) {
            console.error("Error applying offset:", error);

            return now;
        }
    }
}
