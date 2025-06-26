/*****************************************
 * Package Module Markdown Parse
 *
 * Parser
 *****************************************/

import type { Bundle, ListBundle } from "../lex/bundle/types";

import type { TreeItem } from "./treeize/types";

import { ParagraphManager } from "./manage/paragraph";
import { HeadingManager } from "./manage/heading";
import { NewLineManager } from "./manage/newLine";
import { HorizontalRuleManager } from "./manage/horizontalRule";
import { OrderedListItemManager } from "./manage/list/orderedItem";
import { UnorderedListItemManager } from "./manage/list/unorderedItem";
import { CodeBlockManager } from "./manage/code/block";

import { Json } from "../../json";

/**
 * Parser
 */
export class Parser {
    /**
     * tree items
     *
     * @type {TreeItem[]}
     * @readonly
     */
    protected readonly tree: TreeItem[] = [];

    /**
     * parse markdown bundles
     *
     * @param {Bundle[]} bundles
     * @return {TreeItem[]}
     */
    public parse(bundles: Bundle[]): TreeItem[] {
        this.init();

        for (const bundle of bundles) {
            switch (true) {
                case this.heading.match(bundle):
                    this.pushHeading(bundle);

                    break;

                case this.listOrderedItem.match(bundle):
                    this.addListOrderedItem(bundle as ListBundle);

                    break;

                case this.listUnorderedItem.match(bundle):
                    this.addListUnorderedItem(bundle as ListBundle);

                    break;

                case this.codeBlock.match(bundle):
                    this.addCodeBlock(bundle);

                    break;

                case this.paragraph.match(bundle):
                    this.pushParagraph(bundle);

                    break;

                case this.newLine.match(bundle):
                    this.pushNewLine(bundle);

                    break;

                case this.horizontalRule.match(bundle):
                    this.pushHorizontalRule(bundle);

                    break;

                default:
                    throw new Error(
                        `Unknown token bundle: ${Json.stringify(bundle)}`
                    );
            }
        }

        this.pushRemainings();

        return this.tree;
    }

    /**
     * push remainings
     *
     * @return {void}
     */
    protected pushRemainings(): void {
        this.pushListOrderedItem();
        this.pushListUnorderedItem();
        this.pushCodeBlock();
    }

    /*----------------------------------------*
     * Parse: Init
     *----------------------------------------*/

    /**
     * init
     *
     * @return {void}
     */
    protected init(): void {
        this.tree.length = 0;

        this.listOrderedItem.init();
        this.listUnorderedItem.init();
    }

    /*----------------------------------------*
     * Parse: Treeize Heading
     *----------------------------------------*/

    /**
     * heading manager
     *
     * @type {HeadingManager}
     */
    protected heading: HeadingManager = new HeadingManager();

    /**
     * push heading
     *
     * @param {Bundle} bundle
     * @return {void}
     */
    protected pushHeading(bundle: Bundle): void {
        this.pushRemainings();

        this.tree.push(this.heading.treeize(bundle));
    }

    /*----------------------------------------*
     * Parse: Treeize List Ordered Item
     *----------------------------------------*/

    /**
     * list ordered item manager
     *
     * @type {OrderedListItemManager}
     */
    protected listOrderedItem: OrderedListItemManager =
        new OrderedListItemManager();

    /**
     * add list ordered item
     *
     * @param {ListBundle} bundle
     * @return {void}
     */
    protected addListOrderedItem(bundle: ListBundle): void {
        this.listOrderedItem.add(bundle);
    }

    /**
     * push list ordered
     *
     * @return {void}
     */
    protected pushListOrderedItem(): void {
        const tree: TreeItem | null = this.listOrderedItem.tree;

        if (!tree) return;

        this.tree.push(tree);
    }

    /*----------------------------------------*
     * Parse: Treeize List Unordered Item
     *----------------------------------------*/

    /**
     * list unordered item manager
     *
     * @type {UnorderedListItemManager}
     */
    protected listUnorderedItem: UnorderedListItemManager =
        new UnorderedListItemManager();

    /**
     * add list unordered item
     *
     * @param {ListBundle} bundle
     * @return {void}
     */
    protected addListUnorderedItem(bundle: ListBundle): void {
        this.listUnorderedItem.add(bundle);
    }

    /**
     * push list unordered
     *
     * @return {void}
     */
    protected pushListUnorderedItem(): void {
        const tree: TreeItem | null = this.listUnorderedItem.tree;

        if (!tree) return;

        this.tree.push(tree);
    }

    /*----------------------------------------*
     * Parse: Treeize Code Block
     *----------------------------------------*/

    /**
     * code block manager
     *
     * @type {CodeBlockManager}
     */
    protected codeBlock: CodeBlockManager = new CodeBlockManager();

    /**
     * add code block
     *
     * @param {Bundle} bundle
     * @return {void}
     */
    protected addCodeBlock(bundle: Bundle): void {
        if (this.codeBlock.isRequirePush(bundle)) this.pushRemainings();

        this.codeBlock.add(bundle);
    }

    /**
     * push code block
     *
     * @return {void}
     */
    protected pushCodeBlock(): void {
        const tree: TreeItem | null = this.codeBlock.tree;

        if (!tree) return;

        this.tree.push(tree);
    }

    /*----------------------------------------*
     * Parse: Treeize Paragraph
     *----------------------------------------*/

    /**
     * paragraph manager
     *
     * @type {ParagraphManager}
     */
    protected paragraph: ParagraphManager = new ParagraphManager();

    /**
     * push paragraph
     *
     * @param {Bundle} bundle
     * @return {void}
     */
    protected pushParagraph(bundle: Bundle): void {
        this.pushRemainings();

        this.tree.push(this.paragraph.treeize(bundle));
    }

    /*----------------------------------------*
     * Parse: Treeize New Line
     *----------------------------------------*/

    /**
     * new line manager
     *
     * @type {NewLineManager}
     */
    protected newLine: NewLineManager = new NewLineManager();

    /**
     * push new line
     *
     * @param {Bundle} bundle
     * @return {void}
     */
    protected pushNewLine(bundle: Bundle): void {
        this.pushRemainings();

        this.tree.push(this.newLine.treeize(bundle));
    }

    /*----------------------------------------*
     * Parse: Treeize Horizontal Rule
     *----------------------------------------*/

    /**
     * horizontal rule manager
     *
     * @type {HorizontalRuleManager}
     */
    protected horizontalRule: HorizontalRuleManager =
        new HorizontalRuleManager();

    /**
     * push horizontal rule
     *
     * @param {Bundle} bundle
     * @return {void}
     */
    protected pushHorizontalRule(bundle: Bundle): void {
        this.pushRemainings();

        this.tree.push(this.horizontalRule.treeize(bundle));
    }
}
