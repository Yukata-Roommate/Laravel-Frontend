/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Code Inner
 *****************************************/

import type { CodeInnerBundle } from "../types";

import { BaseBundler } from "../base";

/**
 * Code Inner Bundler
 */
export class CodeInnerBundler extends BaseBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^.*$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {CodeInnerBundle}
     */
    public bundle(row: string): CodeInnerBundle {
        return {
            type: "code-inner",
            text: row,
        };
    }
}
