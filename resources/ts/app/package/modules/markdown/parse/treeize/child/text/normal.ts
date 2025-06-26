/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Text Normal
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { NormalTextTreeItem } from "../../types";

import type { Token, NormalTextToken } from "../../../../lex/tokenize/types";

/**
 * Normal Text Treeizer
 */
export class NormalTextTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is NormalTextToken}
     */
    public match(token: Token): token is NormalTextToken {
        return token.type === "text-normal";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {NormalTextToken} token
     * @return {NormalTextTreeItem}
     */
    public treeize(token: NormalTextToken): NormalTextTreeItem {
        return {
            type: "text-normal",
            text: token.text,
        };
    }
}
