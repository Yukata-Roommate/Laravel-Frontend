/*****************************************
 * Package Module Markdown Parse Manage
 *
 * Horizontal Rule
 *****************************************/

import { SimpleManager } from "./base";

import { HorizontalRuleTreeizer } from "../treeize/horizontalRule";

/**
 * Horizontal Rule Manager
 */
export class HorizontalRuleManager extends SimpleManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {HorizontalRuleTreeizer}
     */
    protected treeizer: HorizontalRuleTreeizer = new HorizontalRuleTreeizer();
}
