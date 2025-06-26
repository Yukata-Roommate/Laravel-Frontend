/*****************************************
 * Package Module Markdown
 *
 * Markdown
 *****************************************/

import { Lexer } from "./lex/lexer";
import { Parser } from "./parse/parser";
import { Builder } from "./build/builder";

/**
 * Markdown
 */
export class Markdown {
    /**
     * markdown lexer
     *
     * @type {Lexer}
     */
    public lexer: Lexer = new Lexer();

    /**
     * markdown parser
     *
     * @type {Parser}
     */
    public parser: Parser = new Parser();

    /**
     * markdown builder
     *
     * @type {Builder}
     */
    public builder: Builder = new Builder();

    /**
     * markdown to html element
     *
     * @param {string} markdown
     * @return {HTMLElement}
     */
    public toElement(markdown: string): HTMLElement {
        const tokens = this.lexer.lex(markdown);

        const tree = this.parser.parse(tokens);

        const html = this.builder.build(tree);

        return html;
    }

    /**
     * markdown to html
     *
     * @param {string} markdown
     * @return {string}
     */
    public toHtml(markdown: string): string {
        return this.toElement(markdown).outerHTML;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * markdown instance
     *
     * @type {Markdown}
     */
    public static readonly instance: Markdown = new Markdown();

    /**
     * markdown to html element
     *
     * @param {string} markdown
     * @return {HTMLElement}
     */
    public static toElement(markdown: string): HTMLElement {
        return this.instance.toElement(markdown);
    }

    /**
     * markdown to html
     *
     * @param {string} markdown
     * @return {string}
     */
    public static toHtml(markdown: string): string {
        return this.instance.toHtml(markdown);
    }
}
