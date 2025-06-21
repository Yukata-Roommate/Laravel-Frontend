/*****************************************
 * Package Module Markdown Parse Manage
 *
 * New Line
 *****************************************/

import { SimpleManager } from "./base";

import { NewLineTreeizer } from "../treeize/newLine";

/**
 * New Line Manager
 */
export class NewLineManager extends SimpleManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {NewLineTreeizer}
     */
    protected treeizer: NewLineTreeizer = new NewLineTreeizer();
}
