/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * List Ordered Item
 *****************************************/

import { ParentTreeizer } from "../base";

import type { OrderedListItemTreeItem } from "../types";

import type { Bundle, OrderedListItemBundle } from "../../../lex/bundle/types";

/**
 * List Ordered Item Treeizer
 */
export class OrderedListItemTreeizer extends ParentTreeizer {
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
        return bundle.type === "list-item-ordered";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {OrderedListItemBundle} bundle
     * @return {OrderedListItemTreeItem}
     */
    public treeize(bundle: OrderedListItemBundle): OrderedListItemTreeItem {
        return {
            type: "list-item-ordered",
            children: this.children(bundle),
        };
    }
}
