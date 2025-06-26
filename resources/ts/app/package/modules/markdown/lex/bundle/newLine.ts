/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * New Line
 *****************************************/

import type { NewLineBundle } from "./types";

import { BaseBundler } from "./base";

/**
 * New Line Bundler
 */
export class NewLineBundler extends BaseBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {NewLineBundle}
     */
    public bundle(row: string): NewLineBundle {
        return {
            type: "new-line",
        };
    }
}
