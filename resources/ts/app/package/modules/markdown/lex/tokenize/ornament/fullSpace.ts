/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Ornament Full Space
 *****************************************/

import type { FullSpaceOrnamentToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Ornament Full Space Tokenizer
 */
export class FullSpaceOrnamentTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^　/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {FullSpaceOrnamentToken}
     */
    protected token(match: RegExpMatchArray): FullSpaceOrnamentToken {
        return {
            type: "full-space",
        };
    }
}
