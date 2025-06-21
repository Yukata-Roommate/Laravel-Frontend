/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Text Italic
 *****************************************/

import type { ItalicTextToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Text Italic Tokenizer
 */
export class ItalicTextTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^(\*|_)(?=\S)(.+?)(?<=\S)(\*|_)/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {ItalicTextToken}
     */
    protected token(match: RegExpMatchArray): ItalicTextToken {
        return {
            type: "text-italic",
            text: match[2],
        };
    }
}
