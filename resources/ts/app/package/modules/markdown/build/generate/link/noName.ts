/*****************************************
 * Package Module Markdown Build Generate
 *
 * Link No Name
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    NoNameLinkTreeItem,
} from "../../../parse/treeize/types";

/**
 * No Name Link Generator
 */
export class NoNameLinkGenerator extends BaseGenerator {
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
        return treeItem.type === "link-no-name";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {NoNameLinkTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: NoNameLinkTreeItem): HTMLElement {
        const element = document.createElement("a");

        element.href = treeItem.link;
        element.innerHTML = treeItem.link;

        element.target = "_blank";
        element.rel = "noopener noreferrer";

        element.classList.add("text");
        element.classList.add("text__link");

        return element;
    }
}
