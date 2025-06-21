/*****************************************
 * Package Module Markdown Build Generate
 *
 * Ornament Full Space
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    FullSpaceOrnamentTreeItem,
} from "../../../parse/treeize/types";

/**
 * Full Space Ornament Generator
 */
export class FullSpaceOrnamentGenerator extends BaseGenerator {
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
        return treeItem.type === "full-space";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {FullSpaceOrnamentTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: FullSpaceOrnamentTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = "&nbsp;&nbsp;";

        element.classList.add("full-space");

        return element;
    }
}
