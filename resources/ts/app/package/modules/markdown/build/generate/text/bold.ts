/*****************************************
 * Package Module Markdown Build Generate
 *
 * Text Bold
 *****************************************/

import { BaseGenerator } from "../base";

import type { TreeItem, BoldTextTreeItem } from "../../../parse/treeize/types";

/**
 * Bold Text Generator
 */
export class BoldTextGenerator extends BaseGenerator {
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
        return treeItem.type === "text-bold";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {BoldTextTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: BoldTextTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = treeItem.text;

        element.classList.add("text");
        element.classList.add("text__bold");

        return element;
    }
}
