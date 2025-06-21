/*****************************************
 * Package Scripts Markdown
 *
 * Landmark
 *****************************************/

import { Markdown } from "../../modules/markdown";

/**
 * setup
 *
 * @return {Promise<void>}
 */
export async function setup(): Promise<void> {
    const markdowns = document.querySelectorAll(".markdown-landmark");

    markdowns.forEach(function (markdown) {
        try {
            markdown.innerHTML = Markdown.toHtml(markdown.innerHTML);
        } catch (error) {}
    });
}
