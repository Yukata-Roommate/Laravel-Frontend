/*****************************************
 * Package Module Markdown Build Generate
 *
 * Ornament Tab
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    TabOrnamentTreeItem,
} from "../../../parse/treeize/types";

/**
 * Tab Ornament Generator
 */
export class TabOrnamentGenerator extends BaseGenerator {
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
        return treeItem.type === "tab";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {TabOrnamentTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: TabOrnamentTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";

        element.classList.add("tab");

        return element;
    }
}
