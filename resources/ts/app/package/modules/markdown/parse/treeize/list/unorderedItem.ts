/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * List Unordered Item
 *****************************************/

import { ParentTreeizer } from "../base";

import type { UnorderedListItemTreeItem } from "../types";

import type {
    Bundle,
    UnorderedListItemBundle,
} from "../../../lex/bundle/types";

/**
 * List Unordered Item Treeizer
 */
export class UnorderedListItemTreeizer extends ParentTreeizer {
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
        return bundle.type === "list-item-unordered";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {UnorderedListItemBundle} bundle
     * @return {UnorderedListItemTreeItem}
     */
    public treeize(bundle: UnorderedListItemBundle): UnorderedListItemTreeItem {
        return {
            type: "list-item-unordered",
            children: this.children(bundle),
        };
    }
}
