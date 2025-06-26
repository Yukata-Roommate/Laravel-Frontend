/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Ornament Half Space
 *****************************************/

import type { HalfSpaceOrnamentToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Ornament Half Space Tokenizer
 */
export class HalfSpaceOrnamentTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^ /;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {HalfSpaceOrnamentToken}
     */
    protected token(match: RegExpMatchArray): HalfSpaceOrnamentToken {
        return {
            type: "half-space",
        };
    }
}
