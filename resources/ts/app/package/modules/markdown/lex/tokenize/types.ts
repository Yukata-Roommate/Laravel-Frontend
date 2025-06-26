/*****************************************
 * Package Module Markdown Lex Tokenize
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Set
 *----------------------------------------*/

/**
 * Token
 */
export type Token =
    | NormalTextToken
    | BoldTextToken
    | ItalicTextToken
    | StrikeTextToken
    | CodeTextToken
    | NamedLinkToken
    | NoNameLinkToken
    | TelephoneLinkToken
    | HalfSpaceOrnamentToken
    | FullSpaceOrnamentToken
    | TabOrnamentToken;

/*----------------------------------------*
 * Member
 *----------------------------------------*/

/**
 * Base Token
 */
export type BaseToken = {
    /**
     * token type
     *
     * @type {string}
     */
    type: string;
};

/**
 * Normal Text Token
 */
export type NormalTextToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "text-normal";

    /**
     * token text
     *
     * @type {string}
     */
    text: string;
};

/**
 * Bold Text Token
 */
export type BoldTextToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "text-bold";

    /**
     * token text
     *
     * @type {string}
     */
    text: string;
};

/**
 * Italic Text Token
 */
export type ItalicTextToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "text-italic";

    /**
     * token text
     *
     * @type {string}
     */
    text: string;
};

/**
 * Strike Text Token
 */
export type StrikeTextToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "text-strike";

    /**
     * token text
     *
     * @type {string}
     */
    text: string;
};

/**
 * Code Text Token
 */
export type CodeTextToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "text-code";

    /**
     * token text
     *
     * @type {string}
     */
    text: string;
};

/**
 * Named Link Token
 */
export type NamedLinkToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "link-named";

    /**
     * link
     *
     * @type {string}
     */
    link: string;

    /**
     * name
     *
     * @type {string}
     */
    name: string;
};

/**
 * NoName Link Token
 */
export type NoNameLinkToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "link-no-name";

    /**
     * link
     *
     * @type {string}
     */
    link: string;
};

/**
 * Telephone Link Token
 */
export type TelephoneLinkToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "link-telephone";

    /**
     * link
     *
     * @type {string}
     */
    link: string;
};

/**
 * Half Space Ornament Token
 */
export type HalfSpaceOrnamentToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "half-space";
};

/**
 * Full Space Ornament Token
 */
export type FullSpaceOrnamentToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "full-space";
};

/**
 * Tab Ornament Token
 */
export type TabOrnamentToken = BaseToken & {
    /**
     * token type
     *
     * @type {string}
     */
    type: "tab";
};
