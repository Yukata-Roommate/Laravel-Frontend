/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * List Ordered
 *****************************************/

import { ListTreeizer } from "../base";

import type { OrderedListTreeItem } from "../types";

/**
 * List Ordered Treeizer
 */
export class OrderedListTreeizer extends ListTreeizer {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * make tree item
     *
     * @return {OrderedListTreeItem}
     */
    public make(): OrderedListTreeItem {
        return {
            type: "list-ordered",
            children: [],
        };
    }
}
