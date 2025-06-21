/*****************************************
 * Package Module Markdown Build Generate
 *
 * Ornament Half Space
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    HalfSpaceOrnamentTreeItem,
} from "../../../parse/treeize/types";

/**
 * Half Space Ornament Generator
 */
export class HalfSpaceOrnamentGenerator extends BaseGenerator {
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
        return treeItem.type === "half-space";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {HalfSpaceOrnamentTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: HalfSpaceOrnamentTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = "&nbsp;";

        element.classList.add("half-space");

        return element;
    }
}
