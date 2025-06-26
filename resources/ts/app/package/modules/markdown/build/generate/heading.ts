/*****************************************
 * Package Module Markdown Build Generate
 *
 * Heading
 *****************************************/

import { BaseGenerator } from "./base";

import type { TreeItem, HeadingTreeItem } from "../../parse/treeize/types";

/**
 * Heading Generator
 */
export class HeadingGenerator extends BaseGenerator {
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
        return treeItem.type === "heading";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {HeadingTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: HeadingTreeItem): HTMLElement {
        const element = document.createElement(`h${treeItem.level}`);

        element.classList.add("heading");
        element.classList.add(`heading__${treeItem.level}`);

        return element;
    }
}
