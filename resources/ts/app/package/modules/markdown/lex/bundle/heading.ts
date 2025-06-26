/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Heading
 *****************************************/

import type { HeadingBundle } from "./types";

import { TokenizeBundler } from "./tokenizer";

/**
 * Heading Bundler
 */
export class HeadingBundler extends TokenizeBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^#{1,6} \S.*$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * trimming pattern
     *
     * @type {RegExp}
     */
    protected readonly trimPattern: RegExp = /^#{1,6} /;

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {HeadingBundle}
     */
    public bundle(row: string): HeadingBundle {
        return {
            type: "heading",
            tokens: this.tokenize(row),
            level: this.countSharp(row),
        };
    }
}
