/*****************************************
 * Package Module Markdown Build Generate
 *
 * List Ordered
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    OrderedListTreeItem,
} from "../../../parse/treeize/types";

/**
 * Ordered List Generator
 */
export class OrderedListGenerator extends BaseGenerator {
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
        return treeItem.type === "list-ordered";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {OrderedListTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: OrderedListTreeItem): HTMLElement {
        const element = document.createElement("ol");

        element.classList.add("list");
        element.classList.add("list__ordered");

        return element;
    }
}
