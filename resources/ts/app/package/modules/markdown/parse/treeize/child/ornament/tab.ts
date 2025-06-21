/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Ornament Tab
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { TabOrnamentTreeItem } from "../../types";

import type { Token, TabOrnamentToken } from "../../../../lex/tokenize/types";

/**
 * Tab Ornament Treeizer
 */
export class TabOrnamentTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is TabOrnamentToken}
     */
    public match(token: Token): token is TabOrnamentToken {
        return token.type === "tab";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {TabOrnamentToken} token
     * @return {TabOrnamentTreeItem}
     */
    public treeize(token: TabOrnamentToken): TabOrnamentTreeItem {
        return {
            type: "tab",
        };
    }
}
