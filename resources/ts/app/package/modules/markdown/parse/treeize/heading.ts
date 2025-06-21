/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Heading
 *****************************************/

import { ParentTreeizer } from "./base";

import type { HeadingTreeItem } from "./types";

import type { Bundle, HeadingBundle } from "../../lex/bundle/types";

/**
 * Heading Treeizer
 */
export class HeadingTreeizer extends ParentTreeizer {
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
        return bundle.type === "heading";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {HeadingBundle} bundle
     * @return {HeadingTreeItem}
     */
    public treeize(bundle: HeadingBundle): HeadingTreeItem {
        return {
            type: "heading",
            level: bundle.level,
            children: this.children(bundle),
        };
    }
}
