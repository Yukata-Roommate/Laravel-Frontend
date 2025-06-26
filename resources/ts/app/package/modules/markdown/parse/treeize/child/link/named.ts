/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Link Named
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { NamedLinkTreeItem } from "../../types";

import type { Token, NamedLinkToken } from "../../../../lex/tokenize/types";

/**
 * Named Link Treeizer
 */
export class NamedLinkTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is NamedLinkToken}
     */
    public match(token: Token): token is NamedLinkToken {
        return token.type === "link-named";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {NamedLinkToken} token
     * @return {NamedLinkTreeItem}
     */
    public treeize(token: NamedLinkToken): NamedLinkTreeItem {
        return {
            type: "link-named",
            link: token.link,
            name: token.name,
        };
    }
}
