/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Ornament Tab
 *****************************************/

import type { TabOrnamentToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Ornament Tab Tokenizer
 */
export class TabOrnamentTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^(\t| {4})/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {TabOrnamentToken}
     */
    protected token(match: RegExpMatchArray): TabOrnamentToken {
        return {
            type: "tab",
        };
    }
}
