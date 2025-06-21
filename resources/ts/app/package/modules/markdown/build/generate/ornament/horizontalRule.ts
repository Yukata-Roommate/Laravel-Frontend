/*****************************************
 * Package Module Markdown Build Generate
 *
 * Ornament Horizontal Rule
 *****************************************/

import { BaseGenerator } from "../base";

import type {
    TreeItem,
    HorizontalRuleTreeItem,
} from "../../../parse/treeize/types";

/**
 * Horizontal Rule Ornament Generator
 */
export class HorizontalRuleOrnamentGenerator extends BaseGenerator {
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
        return treeItem.type === "horizontal-rule";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {HorizontalRuleTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: HorizontalRuleTreeItem): HTMLElement {
        const element = document.createElement("hr");

        element.classList.add("horizontal-rule");

        return element;
    }
}
