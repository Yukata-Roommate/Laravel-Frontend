/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Link Telephone
 *****************************************/

import type { TelephoneLinkToken } from "../types";

import { BaseTokenizer } from "../base";

/**
 * Link Telephone Tokenizer
 */
export class TelephoneLinkTokenizer extends BaseTokenizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp =
        /^0(?:\d{1}-\d{4}-\d{4}|\d{2}-\d{3}-\d{4}|\d{2}-\d{4}-\d{3,4}|\d{3}-\d{2}-\d{4}|\d{3}-\d{3}-\d{3}|\d{4}-\d{1}-\d{4})/;

    /*----------------------------------------*
     * Tokenize
     *----------------------------------------*/

    /**
     * make token from match
     *
     * @param {RegExpMatchArray} match
     * @return {TelephoneLinkToken}
     */
    protected token(match: RegExpMatchArray): TelephoneLinkToken {
        return {
            type: "link-telephone",
            link: match[0],
        };
    }
}
