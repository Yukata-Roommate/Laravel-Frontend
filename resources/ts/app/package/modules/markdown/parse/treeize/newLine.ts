/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * New Line
 *****************************************/

import { BaseTreeizer } from "./base";

import type { NewLineTreeItem } from "./types";

import type { Bundle, NewLineBundle } from "../../lex/bundle/types";

/**
 * New Line Treeizer
 */
export class NewLineTreeizer extends BaseTreeizer {
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
        return bundle.type === "new-line";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {NewLineBundle} bundle
     * @return {NewLineTreeItem}
     */
    public treeize(bundle: NewLineBundle): NewLineTreeItem {
        return {
            type: "new-line",
        };
    }
}
