/*****************************************
 * Package Module Markdown Parse Manage
 *
 * Paragraph
 *****************************************/

import { SimpleManager } from "./base";

import { ParagraphTreeizer } from "../treeize/paragraph";

/**
 * Paragraph Manager
 */
export class ParagraphManager extends SimpleManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {ParagraphTreeizer}
     */
    protected treeizer: ParagraphTreeizer = new ParagraphTreeizer();
}
