/*****************************************
 * Package Module Markdown Build Generate
 *
 * Paragraph
 *****************************************/

import { BaseGenerator } from "./base";

import type { TreeItem, ParagraphTreeItem } from "../../parse/treeize/types";

/**
 * Paragraph Generator
 */
export class ParagraphGenerator extends BaseGenerator {
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
        return treeItem.type === "paragraph";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {ParagraphTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: ParagraphTreeItem): HTMLElement {
        const element = document.createElement("p");

        element.classList.add("paragraph");

        return element;
    }
}
