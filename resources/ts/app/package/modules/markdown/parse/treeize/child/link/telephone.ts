/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Link Telephone
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { TelephoneLinkTreeItem } from "../../types";

import type { Token, TelephoneLinkToken } from "../../../../lex/tokenize/types";

/**
 * Telephone Link Treeizer
 */
export class TelephoneLinkTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is TelephoneLinkToken}
     */
    public match(token: Token): token is TelephoneLinkToken {
        return token.type === "link-telephone";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {TelephoneLinkToken} token
     * @return {TelephoneLinkTreeItem}
     */
    public treeize(token: TelephoneLinkToken): TelephoneLinkTreeItem {
        return {
            type: "link-telephone",
            link: token.link,
        };
    }
}
