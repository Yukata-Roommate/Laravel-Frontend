/*****************************************
 * Package Scripts Clock
 *
 * Analog
 *****************************************/

/*----------------------------------------*
 * Imports
 *----------------------------------------*/

import { Clock } from "../../modules/clock";
import type { AnalogClock } from "../../modules/clock/analog";

/*----------------------------------------*
 * Event Listener
 *----------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    const clocks = document.querySelectorAll(".clock[type=analog]");

    if (!clocks.length) return;

    clocks.forEach(function (clock: Element) {
        if (!(clock instanceof HTMLElement)) return;

        const analogClock = makeAnalogClock(clock);

        analogClock.start();
    });
});

/*----------------------------------------*
 * Methods
 *----------------------------------------*/

/**
 * make Analog Clock
 *
 * @param {HTMLElement} clock
 * @returns {AnalogClock}
 */
function makeAnalogClock(clock: HTMLElement): AnalogClock {
    const analogClock = Clock.analog(clock);

    return analogClock;
}
