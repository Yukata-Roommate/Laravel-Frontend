/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Paragraph
 *****************************************/

import { ParentTreeizer } from "./base";

import type { ParagraphTreeItem } from "./types";

import type { Bundle, ParagraphBundle } from "../../lex/bundle/types";

/**
 * Paragraph Treeizer
 */
export class ParagraphTreeizer extends ParentTreeizer {
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
        return bundle.type === "paragraph";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {ParagraphBundle} bundle
     * @return {ParagraphTreeItem}
     */
    public treeize(bundle: ParagraphBundle): ParagraphTreeItem {
        return {
            type: "paragraph",
            children: this.children(bundle),
        };
    }
}
