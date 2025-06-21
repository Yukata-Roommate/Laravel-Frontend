/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Horizontal Rule
 *****************************************/

import type { HorizontalRuleBundle } from "./types";

import { BaseBundler } from "./base";

/**
 * Horizontal Rule Bundler
 */
export class HorizontalRuleBundler extends BaseBundler {
    /*----------------------------------------*
     * Match
     *----------------------------------------*/

    /**
     * regex pattern
     *
     * @type {RegExp}
     */
    protected readonly pattern: RegExp = /^(\*{3,}|-{3,}|_{3,})$/;

    /*----------------------------------------*
     * Bundle
     *----------------------------------------*/

    /**
     * bundle markdown text
     *
     * @param {string} row
     * @return {HorizontalRuleBundle}
     */
    public bundle(row: string): HorizontalRuleBundle {
        return {
            type: "horizontal-rule",
        };
    }
}
