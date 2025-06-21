/*****************************************
 * Package Module Markdown Build Generate
 *
 * List Unordered Item
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    UnorderedListItemTreeItem,
} from "../../../parse/treeize/types";

/**
 * Unordered Item List Generator
 */
export class UnorderedListItemGenerator extends BaseGenerator {
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
        return treeItem.type === "list-item-unordered";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {UnorderedListItemTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: UnorderedListItemTreeItem): HTMLElement {
        const element = document.createElement("li");

        element.classList.add("list-item");
        element.classList.add("list-item__unordered");

        return element;
    }
}
