/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Link Named
 *****************************************/

import type { NamedLinkToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Link Named Tokenizer
 */
export class NamedLinkTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^\[([^\]]+)\]\(([^)]+)\)/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {NamedLinkToken}
     */
    protected token(match: RegExpMatchArray): NamedLinkToken {
        return {
            type: "link-named",
            link: match[2],
            name: match[1],
        };
    }
}
