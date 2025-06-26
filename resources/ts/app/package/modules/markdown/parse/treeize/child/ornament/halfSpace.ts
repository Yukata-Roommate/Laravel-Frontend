/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Ornament Half Space
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { HalfSpaceOrnamentTreeItem } from "../../types";

import type {
    Token,
    HalfSpaceOrnamentToken,
} from "../../../../lex/tokenize/types";

/**
 * Half Space Ornament Treeizer
 */
export class HalfSpaceOrnamentTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is HalfSpaceOrnamentToken}
     */
    public match(token: Token): token is HalfSpaceOrnamentToken {
        return token.type === "half-space";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {HalfSpaceOrnamentToken} token
     * @return {HalfSpaceOrnamentTreeItem}
     */
    public treeize(token: HalfSpaceOrnamentToken): HalfSpaceOrnamentTreeItem {
        return {
            type: "half-space",
        };
    }
}
