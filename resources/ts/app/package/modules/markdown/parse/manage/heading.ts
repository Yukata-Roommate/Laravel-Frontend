/*****************************************
 * Package Module Markdown Parse Manage
 *
 * Heading
 *****************************************/

import { SimpleManager } from "./base";

import { HeadingTreeizer } from "../treeize/heading";

/**
 * Heading Manager
 */
export class HeadingManager extends SimpleManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {HeadingTreeizer}
     */
    protected treeizer: HeadingTreeizer = new HeadingTreeizer();
}
