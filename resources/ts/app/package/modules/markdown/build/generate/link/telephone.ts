/*****************************************
 * Package Module Markdown Build Generate
 *
 * Link Telephone
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    TelephoneLinkTreeItem,
} from "../../../parse/treeize/types";

/**
 * Telephone Link Generator
 */
export class TelephoneLinkGenerator extends BaseGenerator {
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
        return treeItem.type === "link-telephone";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {TelephoneLinkTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: TelephoneLinkTreeItem): HTMLElement {
        const element = document.createElement("a");

        element.href = `tel:${treeItem.link}`;
        element.innerHTML = treeItem.link;

        element.target = "_blank";
        element.rel = "noopener noreferrer";

        element.classList.add("text");
        element.classList.add("text__link");

        return element;
    }
}
