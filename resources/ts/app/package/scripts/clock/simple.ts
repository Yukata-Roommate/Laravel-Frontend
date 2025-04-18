/*****************************************
 * Package Scripts Clock
 *
 * Simple
 *****************************************/

/*----------------------------------------*
 * Imports
 *----------------------------------------*/

import { Clock } from "../../modules/clock";
import type { SimpleClock } from "../../modules/clock/simple";

/*----------------------------------------*
 * Event Listener
 *----------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    const clocks = document.querySelectorAll(".clock[type=simple]");

    if (!clocks.length) return;

    clocks.forEach(function (clock: Element) {
        if (!(clock instanceof HTMLElement)) return;

        const simpleClock = makeSimpleClock(clock);

        simpleClock.start();
    });
});

/*----------------------------------------*
 * Methods
 *----------------------------------------*/

/**
 * make Simple Clock
 *
 * @param {HTMLElement} clock
 * @returns {SimpleClock}
 */
function makeSimpleClock(clock: HTMLElement): SimpleClock {
    const simpleClock = Clock.simple(clock);

    return simpleClock;
}
