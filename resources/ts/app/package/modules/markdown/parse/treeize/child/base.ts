/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Base
 *****************************************/

import type { TreeItem } from "../types";

import type { Token } from "../../../lex/tokenize/types";

/**
 * Base Child Treeizer
 */
export abstract class BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {boolean}
     */
    public abstract match(token: Token): boolean;

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {Token} token
     * @return {TreeItem}
     */
    public abstract treeize(token: Token): TreeItem;
}
