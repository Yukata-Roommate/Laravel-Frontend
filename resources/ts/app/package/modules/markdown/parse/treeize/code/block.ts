/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Code Block
 *****************************************/

import { BaseTreeizer } from "../base";

import type { CodeBlockTreeItem } from "../types";

import type { Bundle, CodeBlockBundle } from "../../../lex/bundle/types";

/**
 * Code Block Treeizer
 */
export class CodeBlockTreeizer extends BaseTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match bundle
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public match(bundle: Bundle): boolean {
        return bundle.type === "code-block";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {CodeBlockBundle} bundle
     * @return {CodeBlockTreeItem}
     */
    public treeize(bundle: CodeBlockBundle): CodeBlockTreeItem {
        return {
            type: "code-block",
            language: bundle.language,
            code: "",
        };
    }
}
