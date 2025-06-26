/*****************************************
 * Package Module Markdown Build Generate
 *
 * Ornament New Line
 *****************************************/

import { BaseGenerator } from "../base";

import type { TreeItem, NewLineTreeItem } from "../../../parse/treeize/types";

/**
 * New Line Ornament Generator
 */
export class NewLineOrnamentGenerator extends BaseGenerator {
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
        return treeItem.type === "new-line";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {NewLineTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: NewLineTreeItem): HTMLElement {
        const element = document.createElement("br");

        element.classList.add("new-line");

        return element;
    }
}
