/*****************************************
 * Package Module Markdown Lex
 *
 * Lexer
 *****************************************/

import type { Bundle } from "./bundle/types";

import { BaseBundler } from "./bundle/base";
import { ParagraphBundler } from "./bundle/paragraph";
import { HeadingBundler } from "./bundle/heading";
import { NewLineBundler } from "./bundle/newLine";
import { HorizontalRuleBundler } from "./bundle/horizontalRule";
import { OrderedListItemBundler } from "./bundle/list/orderedItem";
import { UnorderedListItemBundler } from "./bundle/list/unorderedItem";
import { CodeBlockBundler } from "./bundle/code/block";
import { CodeInnerBundler } from "./bundle/code/inner";

/**
 * Lexer
 */
export class Lexer {
    /**
     * lex markdown text
     *
     * @param {string} markdown
     * @return {Bundle[]}
     */
    public lex(markdown: string): Bundle[] {
        const rows: string[] = markdown.split("\n");

        const bundles: Bundle[] = [];

        for (const row of rows) {
            const bundle = this.bundle(row);

            if (bundle === null) continue;

            bundles.push(bundle);
        }

        return bundles;
    }

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {Bundle | null}
     */
    protected bundle(row: string): Bundle | null {
        const bundle = this.getBundle(row);

        if (this.isBundleCodeBlock(bundle)) {
            this.toggleCodeMode();

            return this.isCodeMode ? bundle : null;
        }

        if (this.isCodeMode) return new CodeInnerBundler().bundle(row);

        return bundle;
    }

    /**
     * get bundle
     *
     * @param {string} row
     * @return {Bundle}
     */
    protected getBundle(row: string): Bundle {
        const bundlers: BaseBundler[] = this.bundlers();

        for (const bundler of bundlers) {
            if (!bundler.match(row)) continue;

            return bundler.bundle(row);
        }

        return new ParagraphBundler().bundle(row);
    }

    /**
     * get bundlers
     *
     * @return {BaseBundler[]}
     */
    protected bundlers(): BaseBundler[] {
        return [
            new HeadingBundler(),
            new NewLineBundler(),
            new HorizontalRuleBundler(),

            new OrderedListItemBundler(),
            new UnorderedListItemBundler(),

            new CodeBlockBundler(),
        ];
    }

    /**
     * whether is Bundle Code Block
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    protected isBundleCodeBlock(bundle: Bundle): boolean {
        return bundle.type === "code-block";
    }

    /*----------------------------------------*
     * Bundle Mode
     *----------------------------------------*/

    /**
     * whether code mode
     *
     * @type {boolean}
     */
    protected isCodeMode: boolean = false;

    /**
     * toggle code mode
     *
     * @return {void}
     */
    protected toggleCodeMode(): void {
        this.isCodeMode = !this.isCodeMode;
    }
}
