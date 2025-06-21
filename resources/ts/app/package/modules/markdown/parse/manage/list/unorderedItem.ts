/*****************************************
 * Package Module Markdown Parse Manage
 *
 * List Unordered Item
 *****************************************/

import { ListManager } from "../base";

import { UnorderedListTreeizer } from "../../treeize/list/unordered";
import { UnorderedListItemTreeizer } from "../../treeize/list/unorderedItem";

/**
 * Unordered Item List Manager
 */
export class UnorderedListItemManager extends ListManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {UnorderedListItemTreeizer}
     */
    protected treeizer: UnorderedListItemTreeizer =
        new UnorderedListItemTreeizer();

    /**
     * parent treeizer
     *
     * @type {UnorderedListTreeizer}
     */
    protected parent: UnorderedListTreeizer = new UnorderedListTreeizer();
}
