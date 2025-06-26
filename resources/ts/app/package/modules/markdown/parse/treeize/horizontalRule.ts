/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Horizontal Rule
 *****************************************/

import { BaseTreeizer } from "./base";

import type { HorizontalRuleTreeItem } from "./types";

import type { Bundle, HorizontalRuleBundle } from "../../lex/bundle/types";

/**
 * Horizontal Rule Treeizer
 */
export class HorizontalRuleTreeizer extends BaseTreeizer {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * whether match bundle
     *
     * @param {Bundle} bundle
     * @return {boolean}
     */
    public match(bundle: Bundle): boolean {
        return bundle.type === "horizontal-rule";
    }

    /*----------------------------------------*
     * Treeize
     *----------------------------------------*/

    /**
     * treeize markdown tokens
     *
     * @param {HorizontalRuleBundle} bundle
     * @return {HorizontalRuleTreeItem}
     */
    public treeize(bundle: HorizontalRuleBundle): HorizontalRuleTreeItem {
        return {
            type: "horizontal-rule",
        };
    }
}
