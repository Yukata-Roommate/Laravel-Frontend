/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Text Bold
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { BoldTextTreeItem } from "../../types";

import type { Token, BoldTextToken } from "../../../../lex/tokenize/types";

/**
 * Bold Text Treeizer
 */
export class BoldTextTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is BoldTextToken}
     */
    public match(token: Token): token is BoldTextToken {
        return token.type === "text-bold";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {BoldTextToken} token
     * @return {BoldTextTreeItem}
     */
    public treeize(token: BoldTextToken): BoldTextTreeItem {
        return {
            type: "text-bold",
            text: token.text,
        };
    }
}
