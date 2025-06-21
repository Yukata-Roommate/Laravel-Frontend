/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Link No Name
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { NoNameLinkTreeItem } from "../../types";

import type { Token, NoNameLinkToken } from "../../../../lex/tokenize/types";

/**
 * No Name Link Treeizer
 */
export class NoNameLinkTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is NoNameLinkToken}
     */
    public match(token: Token): token is NoNameLinkToken {
        return token.type === "link-no-name";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {NoNameLinkToken} token
     * @return {NoNameLinkTreeItem}
     */
    public treeize(token: NoNameLinkToken): NoNameLinkTreeItem {
        return {
            type: "link-no-name",
            link: token.link,
        };
    }
}
