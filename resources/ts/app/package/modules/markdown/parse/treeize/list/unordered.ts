/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * List Unordered
 *****************************************/

import { ListTreeizer } from "../base";

import type { UnorderedListTreeItem } from "../types";

/**
 * Markdown List Unordered Treeizer
 */
export class UnorderedListTreeizer extends ListTreeizer {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * make tree item
     *
     * @return {UnorderedListTreeItem}
     */
    public make(): UnorderedListTreeItem {
        return {
            type: "list-unordered",
            children: [],
        };
    }
}
