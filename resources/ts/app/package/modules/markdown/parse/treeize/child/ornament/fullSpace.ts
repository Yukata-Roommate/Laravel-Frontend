/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Ornament Full Space
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { FullSpaceOrnamentTreeItem } from "../../types";

import type {
    Token,
    FullSpaceOrnamentToken,
} from "../../../../lex/tokenize/types";

/**
 * Full Space Ornament Treeizer
 */
export class FullSpaceOrnamentTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is FullSpaceOrnamentToken}
     */
    public match(token: Token): token is FullSpaceOrnamentToken {
        return token.type === "full-space";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {FullSpaceOrnamentToken} token
     * @return {FullSpaceOrnamentTreeItem}
     */
    public treeize(token: FullSpaceOrnamentToken): FullSpaceOrnamentTreeItem {
        return {
            type: "full-space",
        };
    }
}
