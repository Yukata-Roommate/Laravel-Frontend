/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Text Code
 *****************************************/

import type { CodeTextToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Text Code Tokenizer
 */
export class CodeTextTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^(`{1,3})([^`]+)(`{1,3})/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {CodeTextToken}
     */
    protected token(match: RegExpMatchArray): CodeTextToken {
        return {
            type: "text-code",
            text: match[2],
        };
    }
}
