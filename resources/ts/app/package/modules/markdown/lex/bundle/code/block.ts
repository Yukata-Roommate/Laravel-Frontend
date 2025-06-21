/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Code Block
 *****************************************/

import type { CodeBlockBundle } from "../types";

import { BaseBundler } from "../base";

/**
 * Code Block Bundler
 */
export class CodeBlockBundler extends BaseBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^```/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {CodeBlockBundle}
     */
    public bundle(row: string): CodeBlockBundle {
        return {
            type: "code-block",
            language: this.language(row),
        };
    }

    /**
     * get code language
     *
     * @param {string} row
     * @return {string}
     */
    protected language(row: string): string {
        return row.replace(this.pattern, "").trim();
    }
}
