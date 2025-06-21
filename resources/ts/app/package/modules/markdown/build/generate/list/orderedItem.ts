/*****************************************
 * Package Module Markdown Build Generate
 *
 * List Ordered Item
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    OrderedListItemTreeItem,
} from "../../../parse/treeize/types";

/**
 * Ordered Item List Generator
 */
export class OrderedListItemGenerator extends BaseGenerator {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match type enum
     *
     * @param {TreeItem} treeItem
     * @return {boolean}
     */
    public match(treeItem: TreeItem): boolean {
        return treeItem.type === "list-item-ordered";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {OrderedListItemTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: OrderedListItemTreeItem): HTMLElement {
        const element = document.createElement("li");

        element.classList.add("list-item");
        element.classList.add("list-item__ordered");

        return element;
    }
}
