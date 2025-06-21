/*****************************************
 * Package Module Markdown Build Generate
 *
 * Base
 *****************************************/

import type { TreeItem } from "../../parse/treeize/types";

/**
 * Base Generator
 */
export abstract class BaseGenerator {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match type enum
     *
     * @param {TreeItem} treeItem
     * @return {boolean}
     */
    public abstract match(treeItem: TreeItem): boolean;

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {TreeItem} treeItem
     * @return {HTMLElement}
     */
    public abstract generate(treeItem: TreeItem): HTMLElement;
}
