/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Paragraph
 *****************************************/

import type { ParagraphBundle } from "./types";

import { TokenizeBundler } from "./tokenizer";

/**
 * Paragraph Bundler
 */
export class ParagraphBundler extends TokenizeBundler {
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
     * trimming pattern
     *
     * @type {RegExp}
     */
    protected readonly trimPattern: RegExp = /^$/;

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {ParagraphBundle}
     */
    public bundle(row: string): ParagraphBundle {
        return {
            type: "paragraph",
            tokens: this.tokenize(row),
        };
    }
}
