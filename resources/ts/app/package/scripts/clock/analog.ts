/*****************************************
 * Package Scripts Clock
 *
 * Analog
 *****************************************/

import { AnalogClock } from "../../modules/clock/analog";

/**
 * setup
 *
 * @return {Promise<void>}
 */
export async function setup(): Promise<void> {
    const clocks = document.querySelectorAll<HTMLElement>(".clock[type=analog]");

    if (!clocks.length) return;

    clocks.forEach(function (clock: HTMLElement) {
        const analogClock = makeAnalogClock(clock);

        analogClock.start();
    });
}

/**
 * make Analog Clock
 *
 * @param {HTMLElement} clock
 * @returns {AnalogClock}
 */
function makeAnalogClock(clock: HTMLElement): AnalogClock {
    const analogClock = AnalogClock.make(clock);

    return analogClock;
}
