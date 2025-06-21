/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Base
 *****************************************/

import type { Bundle } from "./types";

/**
 * Base Bundler
 */
export abstract class BaseBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected abstract readonly pattern: RegExp;

    /**
     * whether match regex
     *
     * @param {string} row
     * @return {boolean}
     */
    public match(row: string): boolean {
        return this.pattern.test(row.trim());
    }

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {Bundle}
     */
    public abstract bundle(row: string): Bundle;

    /*----------------------------------------*
     * Bundle: Count
     *----------------------------------------*/

    /**
     * count indent
     *
     * @param {string} row
     * @return {number}
     */
    protected countIndent(row: string): number {
        let tabCount: number = 0;
        let spaceCount: number = 0;

        for (let character of row) {
            if (character === "\t") {
                tabCount++;

                spaceCount = 0;
            } else if (character === " ") {
                spaceCount++;

                if (spaceCount === 4) {
                    tabCount++;

                    spaceCount = 0;
                }
            } else break;
        }

        return tabCount;
    }

    /**
     * count sharp
     *
     * @param {string} row
     * @return {number}
     */
    protected countSharp(row: string): number {
        let count: number = 0;

        for (let character of row) {
            if (character === "#") count++;
            else break;
        }

        return count;
    }
}
