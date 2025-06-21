/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Text Code
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { CodeTextTreeItem } from "../../types";

import type { Token, CodeTextToken } from "../../../../lex/tokenize/types";

/**
 * Code Text Treeizer
 */
export class CodeTextTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is CodeTextToken}
     */
    public match(token: Token): token is CodeTextToken {
        return token.type === "text-code";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {CodeTextToken} token
     * @return {CodeTextTreeItem}
     */
    public treeize(token: CodeTextToken): CodeTextTreeItem {
        return {
            type: "text-code",
            text: token.text,
        };
    }
}
