/*****************************************
 * Package Module Markdown Build Generate
 *
 * Link Named
 *****************************************/

import { BaseGenerator } from "../base";

import type { TreeItem, NamedLinkTreeItem } from "../../../parse/treeize/types";

/**
 * Named Link Generator
 */
export class NamedLinkGenerator extends BaseGenerator {
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
        return treeItem.type === "link-named";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {NamedLinkTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: NamedLinkTreeItem): HTMLElement {
        const element = document.createElement("a");

        element.href = treeItem.link;
        element.innerHTML = treeItem.name;

        element.target = "_blank";
        element.rel = "noopener noreferrer";

        element.classList.add("text");
        element.classList.add("text__link");

        return element;
    }
}
