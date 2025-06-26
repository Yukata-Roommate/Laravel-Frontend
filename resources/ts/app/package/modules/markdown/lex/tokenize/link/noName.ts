/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Link No Name
 *****************************************/

import type { NoNameLinkToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Link No Name Tokenizer
 */
export class NoNameLinkTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp =
        /^(?<![\[\(])(?:http|https):\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {NoNameLinkToken}
     */
    protected token(match: RegExpMatchArray): NoNameLinkToken {
        return {
            type: "link-no-name",
            link: match[0],
        };
    }
}
