/*****************************************
 * Package Module Markdown Build Generate
 *
 * List Unordered
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    UnorderedListTreeItem,
} from "../../../parse/treeize/types";

/**
 * Unordered List Generator
 */
export class UnorderedListGenerator extends BaseGenerator {
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
        return treeItem.type === "list-unordered";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {UnorderedListTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: UnorderedListTreeItem): HTMLElement {
        const element = document.createElement("ul");

        element.classList.add("list");
        element.classList.add("list__unordered");

        return element;
    }
}
