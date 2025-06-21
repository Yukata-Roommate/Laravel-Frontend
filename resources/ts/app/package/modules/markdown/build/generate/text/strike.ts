/*****************************************
 * Package Module Markdown Build Generate
 *
 * Text Strike
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    StrikeTextTreeItem,
} from "../../../parse/treeize/types";

/**
 * Strike Text Generator
 */
export class StrikeTextGenerator extends BaseGenerator {
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
        return treeItem.type === "text-strike";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {StrikeTextTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: StrikeTextTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = treeItem.text;

        element.classList.add("text");
        element.classList.add("text__strike");

        return element;
    }
}
