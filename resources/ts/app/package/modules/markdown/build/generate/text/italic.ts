/*****************************************
 * Package Module Markdown Build Generate
 *
 * Text Italic
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    ItalicTextTreeItem,
} from "../../../parse/treeize/types";

/**
 * Italic Text Generator
 */
export class ItalicTextGenerator extends BaseGenerator {
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
        return treeItem.type === "text-italic";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {ItalicTextTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: ItalicTextTreeItem): HTMLElement {
        const element = document.createElement("span");

        element.innerHTML = treeItem.text;

        element.classList.add("text");
        element.classList.add("text__italic");

        return element;
    }
}
