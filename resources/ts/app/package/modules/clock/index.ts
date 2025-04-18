/*****************************************
 * Package Module Clock
 *
 * Index
 *****************************************/

/*----------------------------------------*
 * Imports
 *----------------------------------------*/

import { SimpleClock } from "./simple";
import { AnalogClock } from "./analog";

/*----------------------------------------*
 * Exports
 *----------------------------------------*/

export class Clock {
    /**
     * Simple Clock
     *
     * @param {HTMLElement} target
     * @returns {SimpleClock}
     */
    public static simple(target: HTMLElement): SimpleClock {
        return new SimpleClock(target);
    }

    /**
     * Analog Clock
     *
     * @param {HTMLElement} target
     * @returns {AnalogClock}
     */
    public static analog(target: HTMLElement): AnalogClock {
        return new AnalogClock(target);
    }
}
