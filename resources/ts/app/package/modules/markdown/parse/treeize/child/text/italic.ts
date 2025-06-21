/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Child Text Italic
 *****************************************/

import { BaseChildTreeizer } from "../base";

import type { ItalicTextTreeItem } from "../../types";

import type { Token, ItalicTextToken } from "../../../../lex/tokenize/types";

/**
 * Italic Text Treeizer
 */
export class ItalicTextTreeizer extends BaseChildTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token
     *
     * @param {Token} token
     * @return {token is ItalicTextToken}
     */
    public match(token: Token): token is ItalicTextToken {
        return token.type === "text-italic";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown token
     *
     * @param {ItalicTextToken} token
     * @return {ItalicTextTreeItem}
     */
    public treeize(token: ItalicTextToken): ItalicTextTreeItem {
        return {
            type: "text-italic",
            text: token.text,
        };
    }
}
