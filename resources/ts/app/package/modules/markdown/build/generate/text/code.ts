/*****************************************
 * Package Module Markdown Build Generate
 *
 * Text Code
 *****************************************/

import { BaseGenerator } from "../base";

import type { TreeItem, CodeTextTreeItem } from "../../../parse/treeize/types";

/**
 * Code Text Generator
 */
export class CodeTextGenerator extends BaseGenerator {
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
        return treeItem.type === "text-code";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {CodeTextTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: CodeTextTreeItem): HTMLElement {
        const element = document.createElement("code");

        element.innerHTML = treeItem.text;

        element.classList.add("text");
        element.classList.add("text__code");

        return element;
    }
}
