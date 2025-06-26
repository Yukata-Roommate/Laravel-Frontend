/*****************************************
 * Package Module Entity
 *
 * Base
 *****************************************/

import { Json } from "../json";

/**
 * Base Entity
 */
export abstract class BaseEntity {
    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * clone the entity
     *
     * @returns {this}
     */
    public clone(): this {
        return Json.clone<this>(this);
    }

    /**
     * convert entity to string representation
     *
     * @returns {string}
     */
    public toString(): string {
        return `[${this.constructor.name}]`;
    }

    /**
     * convert entity to JSON representation
     *
     * @returns {object}
     */
    public toJSON(): object {
        const result: Record<string, unknown> = {};

        for (const key of Json.keys(this)) {
            result[key] = this[key];
        }

        return result;
    }
}
