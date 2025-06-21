/*****************************************
 * Package Module Markdown Parse Manage
 *
 * Code Block
 *****************************************/

import { BaseManager } from "../base";

import type { CodeBlockTreeItem } from "../../treeize/types";

import { CodeBlockTreeizer } from "../../treeize/code/block";

import type {
    Bundle,
    CodeBlockBundle,
    CodeInnerBundle,
} from "../../../lex/bundle/types";

import { Json } from "../../../../json";

/**
 * Code Block Manager
 */
export class CodeBlockManager extends BaseManager {
    /*----------------------------------------*
     * Init
     *----------------------------------------*/

    /**
     * init
     *
     * @return {void}
     */
    public init(): void {
        this.treeItem = null;
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {CodeBlockTreeizer}
     */
    protected treeizer: CodeBlockTreeizer = new CodeBlockTreeizer();

    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token bundle enum
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public override match(bundle: Bundle): boolean {
        return super.match(bundle) || bundle.type === "code-inner";
    }

    /*----------------------------------------*
     * Tree
     *----------------------------------------*/

    /**
     * tree item
     *
     * @type {CodeBlockTreeItem | null}
     */
    protected treeItem: CodeBlockTreeItem | null = null;

    /**
     * get tree item
     *
     * @return {CodeBlockTreeItem | null}
     */
    public get tree(): CodeBlockTreeItem | null {
        const treeItem = this.treeItem;

        this.init();

        return treeItem;
    }

    /**
     * whether require push
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public isRequirePush(bundle: Bundle): boolean {
        return super.match(bundle) && this.treeItem !== null;
    }

    /*----------------------------------------*
     * Add
     *----------------------------------------*/

    /**
     * add token bundle
     *
     * @param {Bundle} bundle
     * @return {this}
     */
    public add(bundle: Bundle): this {
        if (super.match(bundle)) this.addParent(bundle as CodeBlockBundle);
        else this.addChild(bundle as CodeInnerBundle);

        return this;
    }

    /**
     * add parent tree item
     *
     * @param {CodeBlockBundle} bundle
     * @return {void}
     */
    protected addParent(bundle: CodeBlockBundle): void {
        if (this.treeItem !== null)
            throw new Error(
                `Tree item already exists: ${Json.stringify(bundle)}`
            );

        this.treeItem = this.treeizer.treeize(bundle);
    }

    /**
     * add child tree item
     *
     * @param {CodeInnerBundle} bundle
     * @return {void}
     */
    protected addChild(bundle: CodeInnerBundle): void {
        if (this.treeItem === null)
            throw new Error(
                `Tree item does not exist: ${Json.stringify(bundle)}`
            );

        this.treeItem.code += `${bundle.text}\n`;
    }
}
