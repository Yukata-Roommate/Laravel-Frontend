/*****************************************
 * Package Module Markdown Parse Manage
 *
 * Base
 *****************************************/

import type { TreeItem, ListTreeItem } from "../treeize/types";

import type { Bundle, ListBundle } from "../../lex/bundle/types";

import { BaseTreeizer, ListTreeizer } from "../treeize/base";

import { Json } from "../../../json";

/**
 * Base Manager
 */
export abstract class BaseManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeizer
     *
     * @type {BaseTreeizer}
     */
    protected abstract treeizer: BaseTreeizer;

    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match token bundle enum
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public match(bundle: Bundle): boolean {
        return this.treeizer.match(bundle);
    }
}

/**
 * Simple Manager
 */
export abstract class SimpleManager extends BaseManager {
    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize token bundle
     *
     * @param {Bundle} bundle
     * @return {TreeItem}
     */
    public treeize(bundle: Bundle): TreeItem {
        return this.treeizer.treeize(bundle);
    }
}

/**
 * List Manager
 */
export abstract class ListManager extends BaseManager {
    /*----------------------------------------*
     * Init
     *----------------------------------------*/

    /**
     * init
     *
     * @return {void}
     */
    public init(): void {
        this.treeItems = {};
        this.indent = 0;
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * parent treeizer
     *
     * @type {ListTreeizer}
     */
    protected abstract parent: ListTreeizer;

    /*----------------------------------------*
     * Tree
     *----------------------------------------*/

    /**
     * tree item list
     *
     * @type {[indent:number]: ListTreeItem}
     */
    protected treeItems: { [indent: number]: ListTreeItem } = {};

    /**
     * get tree item
     *
     * @return {ListTreeItem | null}
     */
    public get tree(): ListTreeItem | null {
        if (Json.isEmpty(this.treeItems)) return null;

        this.mergeParent(0);

        const treeItem = this.treeItems[0];

        this.init();

        return treeItem;
    }

    /*----------------------------------------*
     * Add
     *----------------------------------------*/

    /**
     * tree item indent
     *
     * @type {number}
     */
    protected indent: number = 0;

    /**
     * add token bundle
     *
     * @param {ListBundle} bundle
     * @return {this}
     */
    public add(bundle: ListBundle): this {
        const indent: number = bundle.indent;

        if (indent >= this.indent) this.addParent(indent);

        if (indent < this.indent) this.mergeParent(indent);

        this.addChild(bundle, indent);

        this.indent = indent;

        return this;
    }

    /**
     * add parent tree item
     *
     * @param {number} indent
     * @return {void}
     */
    protected addParent(indent: number): void {
        for (let i = this.indent; i <= indent; i++) {
            if (this.treeItems[i]) continue;

            this.treeItems[i] = this.parent.make();
        }
    }

    /**
     * merge parent tree item
     *
     * @param {number} indent
     * @return {void}
     */
    protected mergeParent(indent: number): void {
        for (let i = this.indent; i > indent; i--) {
            const targetIndent: number = i - 1;

            this.treeItems[targetIndent].children.push(this.treeItems[i]);

            delete this.treeItems[i];
        }

        this.indent = indent;
    }

    /**
     * add child tree item
     *
     * @param {Bundle} bundle
     * @param {number} indent
     * @return {void}
     */
    protected addChild(bundle: Bundle, indent: number): void {
        this.treeItems[indent].children.push(this.treeizer.treeize(bundle));
    }
}
