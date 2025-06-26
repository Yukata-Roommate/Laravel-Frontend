/*****************************************
 * Package Module Markdown Build Generate
 *
 * Text Normal
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    NormalTextTreeItem,
} from "../../../parse/treeize/types";

/**
 * Normal Text Generator
 */
export class NormalTextGenerator extends BaseGenerator {
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
        return treeItem.type === "text-normal";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {NormalTextTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: NormalTextTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = treeItem.text;

        element.classList.add("text");

        return element;
    }
}
