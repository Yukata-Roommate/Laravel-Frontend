/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Text Bold
 *****************************************/

import type { BoldTextToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Text Bold Tokenizer
 */
export class BoldTextTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp =
        /^(\*\*|__)(?=\S)(.+?)(?<=\S)(\*\*|__)/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {BoldTextToken}
     */
    protected token(match: RegExpMatchArray): BoldTextToken {
        return {
            type: "text-bold",
            text: match[2],
        };
    }
}
