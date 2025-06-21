/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * List Ordered Item
 *****************************************/

import type { OrderedListItemBundle } from "../types";

import { TokenizeBundler } from "../tokenizer";

/**
 * Ordered List Item Bundler
 */
export class OrderedListItemBundler extends TokenizeBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^\d{1,3}\. [^\s].*$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * trimming pattern
     *
     * @type {RegExp}
     */
    protected readonly trimPattern: RegExp = /^\d{1,3}\.\s+/;

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {OrderedListItemBundle}
     */
    public bundle(row: string): OrderedListItemBundle {
        return {
            type: "list-item-ordered",
            tokens: this.tokenize(row),
            indent: this.countIndent(row),
        };
    }
}
