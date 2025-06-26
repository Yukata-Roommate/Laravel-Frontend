/*****************************************
 * Package Scripts Clock
 *
 * Simple
 *****************************************/

import { SimpleClock } from "../../modules/clock/simple";

/**
 * setup
 *
 * @return {Promise<void>}
 */
export async function setup(): Promise<void> {
    const clocks = document.querySelectorAll<HTMLElement>(".clock[type=simple]");

    if (!clocks.length) return;

    clocks.forEach(function (clock: HTMLElement) {
        const simpleClock = makeSimpleClock(clock);

        simpleClock.start();
    });
}

/**
 * make Simple Clock
 *
 * @param {HTMLElement} clock
 * @returns {SimpleClock}
 */
function makeSimpleClock(clock: HTMLElement): SimpleClock {
    const simpleClock = SimpleClock.make(clock);

    return simpleClock;
}
