/*****************************************
 * Package Module Markdown Parse Manage
 *
 * List Ordered Item
 *****************************************/

import { ListManager } from "../base";

import { OrderedListTreeizer } from "../../treeize/list/ordered";
import { OrderedListItemTreeizer } from "../../treeize/list/orderedItem";

/**
 * Ordered Item List Manager
 */
export class OrderedListItemManager extends ListManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {OrderedListItemTreeizer}
     */
    protected treeizer: OrderedListItemTreeizer = new OrderedListItemTreeizer();

    /**
     * parent treeizer
     *
     * @type {OrderedListTreeizer}
     */
    protected parent: OrderedListTreeizer = new OrderedListTreeizer();
}
