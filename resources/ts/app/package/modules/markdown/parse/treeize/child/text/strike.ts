/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Text Strike
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { StrikeTextTreeItem } from "../../types";

import type { Token, StrikeTextToken } from "../../../../lex/tokenize/types";

/**
 * Strike Text Treeizer
 */
export class StrikeTextTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is StrikeTextToken}
     */
    public match(token: Token): token is StrikeTextToken {
        return token.type === "text-strike";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {StrikeTextToken} token
     * @return {StrikeTextTreeItem}
     */
    public treeize(token: StrikeTextToken): StrikeTextTreeItem {
        return {
            type: "text-strike",
            text: token.text,
        };
    }
}
