/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Base
 *****************************************/

import type { TreeItem, ListTreeItem } from "./types";

import type { Bundle, TokenBundle } from "../../lex/bundle/types";

import type { Token } from "../../lex/tokenize/types";

import { BaseChildTreeizer } from "./child/base";
import { NormalTextTreeizer } from "./child/text/normal";
import { BoldTextTreeizer } from "./child/text/bold";
import { ItalicTextTreeizer } from "./child/text/italic";
import { StrikeTextTreeizer } from "./child/text/strike";
import { CodeTextTreeizer } from "./child/text/code";
import { NamedLinkTreeizer } from "./child/link/named";
import { NoNameLinkTreeizer } from "./child/link/noName";
import { TelephoneLinkTreeizer } from "./child/link/telephone";
import { FullSpaceOrnamentTreeizer } from "./child/ornament/fullSpace";
import { HalfSpaceOrnamentTreeizer } from "./child/ornament/halfSpace";
import { TabOrnamentTreeizer } from "./child/ornament/tab";

import { Json } from "../../../json";

/**
 * Base Treeizer
 */
export abstract class BaseTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match bundle
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public abstract match(bundle: Bundle): boolean;

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {Bundle} bundle
     * @return {TreeItem}
     */
    public abstract treeize(bundle: Bundle): TreeItem;
}

/**
 * Parent Treeizer
 */
export abstract class ParentTreeizer extends BaseTreeizer {
    /*----------------------------------------*
     * Treeize: Children
     *----------------------------------------*/

    /**
     * make children tree items
     *
     * @param {TokenBundle} bundle
     * @return {TreeItem[]}
     */
    protected children(bundle: TokenBundle): TreeItem[] {
        const children: TreeItem[] = [];

        for (const token of bundle.tokens) {
            children.push(this.treeizeChildren(token));
        }

        return children;
    }

    /**
     * treeize children
     *
     * @param {Token} token
     * @return {TreeItem}
     */
    protected treeizeChildren(token: Token): TreeItem {
        for (let treeizer of this.childTreeizers()) {
            if (!treeizer.match(token)) continue;

            return treeizer.treeize(token);
        }

        throw new Error(
            `No treeizer found for token: ${Json.stringify(token)}`
        );
    }

    /**
     * get child treeizers
     *
     * @return {BaseChildTreeizer[]}
     */
    protected childTreeizers(): BaseChildTreeizer[] {
        return [
            new NormalTextTreeizer(),
            new BoldTextTreeizer(),
            new ItalicTextTreeizer(),
            new StrikeTextTreeizer(),
            new CodeTextTreeizer(),

            new NamedLinkTreeizer(),
            new NoNameLinkTreeizer(),
            new TelephoneLinkTreeizer(),

            new FullSpaceOrnamentTreeizer(),
            new HalfSpaceOrnamentTreeizer(),
            new TabOrnamentTreeizer(),
        ];
    }
}

/**
 * Simple Treeizer
 */
export abstract class ListTreeizer {
    /**
     * make tree item
     *
     * @return {ListTreeItem}
     */
    public abstract make(): ListTreeItem;
}
