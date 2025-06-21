/*****************************************
 * Package Module Clock
 *
 * Simple
 *****************************************/

import type { Datetime } from "./types";

import { BaseClock } from "./base";

/**
 * Simple Clock
 */
export class SimpleClock extends BaseClock {
    /*----------------------------------------*
     * Render
     *----------------------------------------*/

    /**
     * render
     *
     * @returns {void}
     */
    protected renderClock(): void {
        this.appendElement(this.makeDateElement());
        this.appendElement(this.makeTimeElement());
    }

    /*----------------------------------------*
     * Tick
     *----------------------------------------*/

    /**
     * tick clock year
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickYear(now: Datetime): void {
        if (now.year === this.passedYear) return;

        this.yearElement.innerText = now.year.toString();
    }

    /**
     * tick clock month
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickMonth(now: Datetime): void {
        if (now.month === this.passedMonth) return;

        this.monthElement.innerText = now.month.toString().padStart(2, "0");
    }

    /**
     * tick clock day
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickDay(now: Datetime): void {
        if (now.day === this.passedDay) return;

        this.dayElement.innerText = now.day.toString().padStart(2, "0");
    }

    /**
     * tick clock day of week
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickDayOfWeek(now: Datetime): void {
        if (!this.showDayOfWeek) return;

        if (now.dayOfWeek === this.passedDayOfWeek) return;

        this.dayOfWeekElement.innerText = this.dayOfWeek[now.dayOfWeek];
    }

    /**
     * tick clock hour
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickHour(now: Datetime): void {
        if (now.hour === this.passedHour) return;

        this.hourElement.innerText = now.hour.toString().padStart(2, "0");
    }

    /**
     * tick clock minute
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickMinute(now: Datetime): void {
        if (now.minute === this.passedMinute) return;

        this.minuteElement.innerText = now.minute.toString().padStart(2, "0");
    }

    /**
     * tick clock second
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickSecond(now: Datetime): void {
        if (!this.showSecond) return;

        if (now.second === this.passedSecond) return;

        this.secondElement.innerText = now.second.toString().padStart(2, "0");
    }

    /*----------------------------------------*
     * Elements
     *----------------------------------------*/

    /**
     * make year element
     *
     * @returns {HTMLElement}
     */
    protected makeYearElement(): HTMLElement {
        const yearElement = document.createElement("span");

        yearElement.classList.add("year");

        return yearElement;
    }

    /**
     * make month element
     *
     * @returns {HTMLElement}
     */
    protected makeMonthElement(): HTMLElement {
        const monthElement = document.createElement("span");

        monthElement.classList.add("month");

        return monthElement;
    }

    /**
     * make day element
     *
     * @returns {HTMLElement}
     */
    protected makeDayElement(): HTMLElement {
        const dayElement = document.createElement("span");

        dayElement.classList.add("day");

        return dayElement;
    }

    /**
     * make day of week element
     *
     * @returns {HTMLElement}
     */
    protected makeDayOfWeekElement(): HTMLElement {
        const dayOfWeekElement = document.createElement("span");

        dayOfWeekElement.classList.add("day-of-week");

        return dayOfWeekElement;
    }

    /**
     * make hour element
     *
     * @returns {HTMLElement}
     */
    protected makeHourElement(): HTMLElement {
        const hourElement = document.createElement("span");

        hourElement.classList.add("hour");

        return hourElement;
    }

    /**
     * make minute element
     *
     * @returns {HTMLElement}
     */
    protected makeMinuteElement(): HTMLElement {
        const minuteElement = document.createElement("span");

        minuteElement.classList.add("minute");

        return minuteElement;
    }

    /**
     * make second element
     *
     * @returns {HTMLElement}
     */
    protected makeSecondElement(): HTMLElement {
        const secondElement = document.createElement("span");

        secondElement.classList.add("second");

        return secondElement;
    }

    /*----------------------------------------*
     * Elements - Date
     *----------------------------------------*/

    /**
     * between year and month symbol
     *
     * @type {string}
     */
    public betweenYearAndMonthSymbol: string = "-";

    /**
     * between month and day symbol
     *
     * @type {string}
     */
    public betweenMonthAndDaySymbol: string = "-";

    /**
     * after day symbol
     *
     * @type {string}
     */
    public afterDaySymbol: string = "";

    /**
     * whether to show day of week
     *
     * @type {boolean}
     */
    public showDayOfWeek: boolean = true;

    /**
     * make date element
     *
     * @returns {HTMLElement}
     */
    protected makeDateElement(): HTMLElement {
        const dateElement = document.createElement("p");

        dateElement.classList.add("date");

        dateElement.appendChild(this.yearElement);
        dateElement.appendChild(
            document.createTextNode(this.betweenYearAndMonthSymbol)
        );
        dateElement.appendChild(this.monthElement);
        dateElement.appendChild(
            document.createTextNode(this.betweenMonthAndDaySymbol)
        );
        dateElement.appendChild(this.dayElement);
        dateElement.appendChild(document.createTextNode(this.afterDaySymbol));

        if (this.showDayOfWeek) {
            dateElement.appendChild(this.dayOfWeekElement);
        }

        return dateElement;
    }

    /*----------------------------------------*
     * Elements - Time
     *----------------------------------------*/

    /**
     * between hour and minute symbol
     *
     * @type {string}
     */
    public betweenHourAndMinuteSymbol: string = ":";

    /**
     * between minute and second symbol
     *
     * @type {string}
     */
    public betweenMinuteAndSecondSymbol: string = ":";

    /**
     * after second symbol
     *
     * @type {string}
     */
    public afterSecondSymbol: string = "";

    /**
     * whether to show second
     *
     * @type {boolean}
     */
    public showSecond: boolean = true;

    /**
     * make time element
     *
     * @returns {HTMLElement}
     */
    protected makeTimeElement(): HTMLElement {
        const timeElement = document.createElement("p");

        timeElement.classList.add("time");

        timeElement.appendChild(this.hourElement);
        timeElement.appendChild(
            document.createTextNode(this.betweenHourAndMinuteSymbol)
        );
        timeElement.appendChild(this.minuteElement);

        if (this.showSecond) {
            timeElement.appendChild(
                document.createTextNode(this.betweenMinuteAndSecondSymbol)
            );
            timeElement.appendChild(this.secondElement);
            timeElement.appendChild(
                document.createTextNode(this.afterSecondSymbol)
            );
        }

        return timeElement;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * make simple clock instance
     *
     * @param {HTMLElement} target
     * @returns {this}
     */
    public static make(target: HTMLElement): SimpleClock {
        return new this(target);
    }
}
