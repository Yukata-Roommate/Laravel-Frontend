/*****************************************
 * Package Module Markdown Parse Treeize
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * Set
 *----------------------------------------*/

/**
 * Tree Item
 */
export type TreeItem =
    | ParagraphTreeItem
    | HeadingTreeItem
    | NewLineTreeItem
    | HorizontalRuleTreeItem
    | OrderedListTreeItem
    | OrderedListItemTreeItem
    | UnorderedListTreeItem
    | UnorderedListItemTreeItem
    | CodeBlockTreeItem
    | NormalTextTreeItem
    | BoldTextTreeItem
    | ItalicTextTreeItem
    | StrikeTextTreeItem
    | CodeTextTreeItem
    | NamedLinkTreeItem
    | NoNameLinkTreeItem
    | TelephoneLinkTreeItem
    | HalfSpaceOrnamentTreeItem
    | FullSpaceOrnamentTreeItem
    | TabOrnamentTreeItem;

/**
 * List Tree Item
 */
export type ListTreeItem =
    | OrderedListTreeItem
    | OrderedListItemTreeItem
    | UnorderedListTreeItem
    | UnorderedListItemTreeItem;

/**
 * Parents Tree Item
 */
export type ParentsTreeItem =
    | ParagraphTreeItem
    | HeadingTreeItem
    | OrderedListTreeItem
    | OrderedListItemTreeItem
    | UnorderedListTreeItem
    | UnorderedListItemTreeItem
    | CodeBlockTreeItem;

/*----------------------------------------*
 * Member
 *----------------------------------------*/

/**
 * Base Tree Item
 */
export type BaseTreeItem = {
    /**
     * tree item type
     *
     * @type {string}
     */
    type: string;
};

/**
 * Parent Tree Item
 */
export type ParentTreeItem = BaseTreeItem & {
    /**
     * tree item children
     *
     * @type {BaseTreeItem[]}
     */
    children: BaseTreeItem[];
};

/**
 * Paragraph Tree Item
 */
export type ParagraphTreeItem = ParentTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "paragraph";
};

/**
 * Heading Tree Item
 */
export type HeadingTreeItem = ParentTreeItem & {
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
 * New Line Tree Item
 */
export type NewLineTreeItem = BaseTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "new-line";
};

/**
 * Horizontal Rule Tree Item
 */
export type HorizontalRuleTreeItem = BaseTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "horizontal-rule";
};

/**
 * Ordered List Tree Item
 */
export type OrderedListTreeItem = ParentTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-ordered";
};

/**
 * Ordered List Item Tree Item
 */
export type OrderedListItemTreeItem = ParentTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-item-ordered";
};

/**
 * Unordered List Tree Item
 */
export type UnorderedListTreeItem = ParentTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-unordered";
};

/**
 * Unordered List Item Tree Item
 */
export type UnorderedListItemTreeItem = ParentTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "list-item-unordered";
};

/**
 * Code Block Tree Item
 */
export type CodeBlockTreeItem = BaseTreeItem & {
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

    /**
     * code inner
     *
     * @type {string}
     */
    code: string;
};

/**
 * Normal Text Tree Item
 */
export type NormalTextTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Bold Text Tree Item
 */
export type BoldTextTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Italic Text Tree Item
 */
export type ItalicTextTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Strike Text Tree Item
 */
export type StrikeTextTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Code Text Tree Item
 */
export type CodeTextTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Named Link Tree Item
 */
export type NamedLinkTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * No Name Link Tree Item
 */
export type NoNameLinkTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Telephone Link Tree Item
 */
export type TelephoneLinkTreeItem = BaseTreeItem & {
    /**
     * bundle type
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
 * Half Space Ornament Tree Item
 */
export type HalfSpaceOrnamentTreeItem = BaseTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "half-space";
};

/**
 * Full Space Ornament Tree Item
 */
export type FullSpaceOrnamentTreeItem = BaseTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "full-space";
};

/**
 * Tab Ornament Tree Item
 */
export type TabOrnamentTreeItem = BaseTreeItem & {
    /**
     * bundle type
     *
     * @type {string}
     */
    type: "tab";
};
