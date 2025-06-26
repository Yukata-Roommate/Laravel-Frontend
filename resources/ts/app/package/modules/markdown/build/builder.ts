/*****************************************
 * Package Module Markdown Build
 *
 * Builder
 *****************************************/

import type { TreeItem } from "../parse/treeize/types";

import type { BaseGenerator } from "./generate/base";
import { HeadingGenerator } from "./generate/heading";
import { ParagraphGenerator } from "./generate/paragraph";
import { BoldTextGenerator } from "./generate/text/bold";
import { CodeTextGenerator } from "./generate/text/code";
import { ItalicTextGenerator } from "./generate/text/italic";
import { NormalTextGenerator } from "./generate/text/normal";
import { StrikeTextGenerator } from "./generate/text/strike";
import { NamedLinkGenerator } from "./generate/link/named";
import { NoNameLinkGenerator } from "./generate/link/noName";
import { TelephoneLinkGenerator } from "./generate/link/telephone";
import { OrderedListGenerator } from "./generate/list/ordered";
import { OrderedListItemGenerator } from "./generate/list/orderedItem";
import { UnorderedListGenerator } from "./generate/list/unordered";
import { UnorderedListItemGenerator } from "./generate/list/unorderedItem";
import { CodeBlockGenerator } from "./generate/code/block";
import { HalfSpaceOrnamentGenerator } from "./generate/ornament/halfSpace";
import { FullSpaceOrnamentGenerator } from "./generate/ornament/fullSpace";
import { TabOrnamentGenerator } from "./generate/ornament/tab";
import { NewLineOrnamentGenerator } from "./generate/ornament/newLine";
import { HorizontalRuleOrnamentGenerator } from "./generate/ornament/horizontalRule";

import { Json } from "../../json";

/**
 * Builder
 */
export class Builder {
    /**
     * build html from abstract syntax tree
     *
     * @param {TreeItem[]} tree
     * @return {HTMLElement}
     */
    public build(tree: TreeItem[]): HTMLElement {
        const element = document.createElement("div");

        element.classList.add("markdown-container");

        tree.forEach((item) => {
            element.appendChild(this.generate(item));
        });

        return element;
    }

    /*----------------------------------------*
     * Generate
     *----------------------------------------*/

    /**
     * generate html element
     *
     * @param {TreeItem} treeItem
     * @return {HTMLElement}
     */
    protected generate(treeItem: TreeItem): HTMLElement {
        const generators: BaseGenerator[] = this.generators();

        for (const generator of generators) {
            if (!generator.match(treeItem)) continue;

            const element = generator.generate(treeItem);

            if ("children" in treeItem) {
                treeItem.children.forEach((child) => {
                    element.appendChild(this.generate(child as TreeItem));
                });
            }

            return element;
        }

        throw new Error(
            `No generator found for item: ${Json.stringify(treeItem)}`
        );
    }

    /**
     * get generators
     *
     * @return {BaseGenerator[]}
     */
    protected generators(): BaseGenerator[] {
        return [
            new HeadingGenerator(),
            new ParagraphGenerator(),

            new BoldTextGenerator(),
            new CodeTextGenerator(),
            new ItalicTextGenerator(),
            new NormalTextGenerator(),
            new StrikeTextGenerator(),

            new NamedLinkGenerator(),
            new NoNameLinkGenerator(),
            new TelephoneLinkGenerator(),

            new OrderedListGenerator(),
            new OrderedListItemGenerator(),
            new UnorderedListGenerator(),
            new UnorderedListItemGenerator(),

            new CodeBlockGenerator(),

            new HalfSpaceOrnamentGenerator(),
            new FullSpaceOrnamentGenerator(),
            new TabOrnamentGenerator(),
            new NewLineOrnamentGenerator(),
            new HorizontalRuleOrnamentGenerator(),
        ];
    }
}
