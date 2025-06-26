/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Text Strike
 *****************************************/

import type { StrikeTextToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Text Strike Tokenizer
 */
export class StrikeTextTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^(\~\~)(?=\S)(.+?)(?<=\S)(\~\~)/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {StrikeTextToken}
     */
    protected token(match: RegExpMatchArray): StrikeTextToken {
        return {
            type: "text-strike",
            text: match[2],
        };
    }
}
