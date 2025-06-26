/*****************************************
 * Package Module Clock
 *
 * Analog
 *****************************************/

import type { Datetime } from "./types";

import { BaseClock } from "./base";

/**
 * Analog Clock
 */
export class AnalogClock extends BaseClock {
    /*----------------------------------------*
     * Render
     *----------------------------------------*/

    /**
     * whether to show date
     *
     * @type {boolean}
     */
    protected showDate: boolean = true;

    /**
     * whether to show second hand
     *
     * @type {boolean}
     */
    protected showSecond: boolean = true;

    /**
     * render
     *
     * @returns {void}
     */
    protected renderClock(): void {
        this.appendElement(this.makeFaceElement());

        if (this.showDate) {
            this.appendElement(this.makeDateElement());
        }

        this.appendElement(this.hourElement);
        this.appendElement(this.minuteElement);

        if (this.showSecond) {
            this.appendElement(this.secondElement);
        }
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
        const hourDeg =
            now.hour * 30 + now.minute * 0.5 + now.second * (0.5 / 60);

        this.hourElement.style.cssText = `--ca-hour-degree: ${hourDeg};`;
    }

    /**
     * tick clock minute
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickMinute(now: Datetime): void {
        const minuteDeg = now.minute * 6 + now.second * 0.1;

        this.minuteElement.style.cssText = `--ca-minute-degree: ${minuteDeg};`;
    }

    /**
     * tick clock second
     *
     * @param {Datetime} now
     * @returns {void}
     */
    protected tickSecond(now: Datetime): void {
        if (!this.showSecond) return;

        const secondDeg = now.second * 6;

        this.secondElement.style.cssText = `--ca-second-degree: ${secondDeg};`;
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
        const hourElement = document.createElement("div");

        hourElement.classList.add("hour");

        return hourElement;
    }

    /**
     * make minute element
     *
     * @returns {HTMLElement}
     */
    protected makeMinuteElement(): HTMLElement {
        const minuteElement = document.createElement("div");

        minuteElement.classList.add("minute");

        return minuteElement;
    }

    /**
     * make second element
     *
     * @returns {HTMLElement}
     */
    protected makeSecondElement(): HTMLElement {
        const secondElement = document.createElement("div");

        secondElement.classList.add("second");

        return secondElement;
    }

    /*----------------------------------------*
     * Elements - Face
     *----------------------------------------*/

    /**
     * whether to show face small scale
     *
     * @type {boolean}
     */
    protected showFaceSmallScale: boolean = true;

    /**
     * whether to show face number
     *
     * @type {boolean}
     */
    protected showFaceNumber: boolean = true;

    /**
     * make face element
     *
     * @returns {HTMLElement}
     */
    protected makeFaceElement(): HTMLElement {
        const faceElement = document.createElement("div");

        faceElement.classList.add("face");

        for (let minute = 0; minute < 60; minute++) {
            if (minute % 5 === 0) {
                faceElement.appendChild(this.makeFaceLargeScaleElement(minute));
            } else if (this.showFaceSmallScale) {
                faceElement.appendChild(this.makeFaceScaleElement(minute));
            }
        }

        if (this.showFaceNumber) {
            for (let hour = 1; hour <= 12; hour++) {
                faceElement.appendChild(this.makeFaceNumberAreaElement(hour));
            }
        }

        return faceElement;
    }

    /**
     * make face scale element
     *
     * @param {number} minute
     * @returns {HTMLElement}
     */
    protected makeFaceScaleElement(minute: number): HTMLElement {
        const scaleElement = document.createElement("div");

        scaleElement.classList.add("scale");

        scaleElement.textContent = "";

        scaleElement.style.cssText = `--ca-face-scale: ${minute};`;

        return scaleElement;
    }

    /**
     * make face large scale element
     *
     * @param {number} minute
     * @returns {HTMLElement}
     */
    protected makeFaceLargeScaleElement(minute: number): HTMLElement {
        const scaleElement = this.makeFaceScaleElement(minute);

        scaleElement.classList.add("large");

        return scaleElement;
    }

    /**
     * make face number area element
     *
     * @param {number} hour
     * @returns {HTMLElement}
     */
    protected makeFaceNumberAreaElement(hour: number): HTMLElement {
        const numberAreaElement = document.createElement("div");

        numberAreaElement.classList.add("number-area");

        numberAreaElement.style.cssText = `--ca-face-number: ${hour};`;

        numberAreaElement.appendChild(this.makeFaceNumberElement(hour));

        return numberAreaElement;
    }

    /**
     * make face number element
     *
     * @param {number} hour
     * @returns {HTMLElement}
     */
    protected makeFaceNumberElement(hour: number): HTMLElement {
        const numberElement = document.createElement("div");

        numberElement.classList.add("number");

        numberElement.textContent = hour.toString();

        numberElement.style.cssText = `--ca-face-number: ${hour};`;

        return numberElement;
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
     * Static Method
     *----------------------------------------*/

    /**
     * make analog clock instance
     *
     * @param {HTMLElement} target
     * @returns {this}
     */
    public static make(target: HTMLElement): AnalogClock {
        return new this(target);
    }
}
