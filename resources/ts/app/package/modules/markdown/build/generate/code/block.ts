/*****************************************
 * Package Module Markdown Build Generate
 *
 * Code Block
 *****************************************/

import { BaseGenerator } from "../base";

import type { TreeItem, CodeBlockTreeItem } from "../../../parse/treeize/types";

/**
 * Code Block Generator
 */
export class CodeBlockGenerator extends BaseGenerator {
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
        return treeItem.type === "code-block";
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate markdown html element
     *
     * @param {CodeBlockTreeItem} treeItem
     * @return {HTMLElement}
     */
    public generate(treeItem: CodeBlockTreeItem): HTMLElement {
        const element = document.createElement("div");

        element.classList.add("code-block-container");

        element.appendChild(this.generatePre(treeItem));

        element.appendChild(this.generateCopyButton(treeItem));

        if (treeItem.language) {
            element.appendChild(this.generateLanguage(treeItem));
        }

        return element;
    }

    /**
     * generate code block pre
     *
     * @param {CodeBlockTreeItem} treeItem
     * @return {HTMLPreElement}
     */
    protected generatePre(treeItem: CodeBlockTreeItem): HTMLPreElement {
        const pre = document.createElement("pre");

        pre.classList.add("code-block");

        pre.appendChild(this.generateCode(treeItem));

        return pre;
    }

    /**
     * generate code block code
     *
     * @param {CodeBlockTreeItem} treeItem
     * @return {HTMLElement}
     */
    protected generateCode(treeItem: CodeBlockTreeItem): HTMLElement {
        const code = document.createElement("code");

        code.classList.add("code-block-inner");

        code.innerHTML = treeItem.code.trim();

        return code;
    }

    /**
     * generate code block copy button
     *
     * @param {CodeBlockTreeItem} treeItem
     * @return {HTMLButtonElement}
     */
    protected generateCopyButton(
        treeItem: CodeBlockTreeItem
    ): HTMLButtonElement {
        const button = document.createElement("button");

        button.classList.add("code-block__copy-button");

        button.innerHTML = "Copy";

        return button;
    }

    /**
     * generate code block language
     *
     * @param {CodeBlockTreeItem} treeItem
     * @return {HTMLSpanElement}
     */
    protected generateLanguage(treeItem: CodeBlockTreeItem): HTMLSpanElement {
        const language = document.createElement("span");

        language.classList.add("code-block-language");

        language.innerHTML = treeItem.language;

        return language;
    }
}
