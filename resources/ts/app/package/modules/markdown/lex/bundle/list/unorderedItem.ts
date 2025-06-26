/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * List Unordered Item
 *****************************************/

import type { UnorderedListItemBundle } from "../types";

import { TokenizeBundler } from "../tokenizer";

/**
 * Unordered List Item Bundler
 */
export class UnorderedListItemBundler extends TokenizeBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^[-*+] [^\s].*$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * trimming pattern
     *
     * @type {RegExp}
     */
    protected readonly trimPattern: RegExp = /^[-*+]\s+/;

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {UnorderedListItemBundle}
     */
    public bundle(row: string): UnorderedListItemBundle {
        return {
            type: "list-item-unordered",
            tokens: this.tokenize(row),
            indent: this.countIndent(row),
        };
    }
}
