/*****************************************
 * Package Module Markdown Lex
 *
 * Types
 *****************************************/

import type { Token } from "../tokenize/types";

/*----------------------------------------*
 * Set
 *----------------------------------------*/

/**
 * Bundle
 */
export type Bundle =
    | ParagraphBundle
    | HeadingBundle
    | NewLineBundle
    | HorizontalRuleBundle
    | OrderedListItemBundle
    | UnorderedListItemBundle
    | CodeBlockBundle
    | CodeInnerBundle;

/**
 * List Bundle
 */
export type ListBundle = OrderedListItemBundle | UnorderedListItemBundle;

/*----------------------------------------*
 * Member
 *----------------------------------------*/

/**
 * Base Bundle
 */
export type BaseBundle = {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: string;
};

/**
 * Token Bundle
 */
export type TokenBundle = BaseBundle & {
    /**
     * tokens
     *
     * @type {Token[]}
     */
    tokens: Token[];
};

/**
 * Paragraph Bundle
 */
export type ParagraphBundle = TokenBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "paragraph";
};

/**
 * Heading Bundle
 */
export type HeadingBundle = TokenBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "heading";

    /**
     * heading level
     *
     * @type {number}
     */
    level: number;
};

/**
 * New Line Bundle
 */
export type NewLineBundle = BaseBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "new-line";
};

/**
 * Horizontal Rule Bundle
 */
export type HorizontalRuleBundle = BaseBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "horizontal-rule";
};

/**
 * Ordered List Item Bundle
 */
export type OrderedListItemBundle = TokenBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-item-ordered";

    /**
     * indent
     *
     * @type {number}
     */
    indent: number;
};

/**
 * Unordered List Item Bundle
 */
export type UnorderedListItemBundle = TokenBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-item-unordered";

    /**
     * indent
     *
     * @type {number}
     */
    indent: number;
};

/**
 * Code Block Bundle
 */
export type CodeBlockBundle = BaseBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "code-block";

    /**
     * language
     *
     * @type {string}
     */
    language: string;
};

/**
 * Code Inner Bundle
 */
export type CodeInnerBundle = BaseBundle & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "code-inner";

    /**
     * inner text
     *
     * @type {string}
     */
    text: string;
};
