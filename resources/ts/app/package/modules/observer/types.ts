/*****************************************
 * Package Module Observer
 *
 * Types
 *****************************************/

/*----------------------------------------*
 * DOM
 *----------------------------------------*/

/**
 * DOM Observer Options
 */
export type DOMObserverOptions = {
    attribute?: boolean;
    child?: boolean;
    class?: boolean;
    identifier?: boolean;
    style?: boolean;
    text?: boolean;
};

/*----------------------------------------*
 * Attribute
 *----------------------------------------*/

/**
 * Attribute Observer Options
 */
export type AttributeObserverOptions = {
    attributes?: string[];
};

/**
 * Attribute Change Callback
 */
export type ChangeAttributeCallback<Observed extends Element = Element> = (
    detail: ChangeAttributeEventArguments<Observed>
) => void;

/**
 * Attribute Change Event Arguments
 */
export type ChangeAttributeEventArguments<Observed extends Element = Element> =
    {
        target: Observed;
        attributeName: string;
        newValue: string | null;
        oldValue: string | null;
    };

/*----------------------------------------*
 * Child
 *----------------------------------------*/

/**
 * Child Observer Options
 */
export type ChildObserverOptions = {
    subtree?: boolean;
};

/**
 * Child Add Callback
 */
export type AddChildCallback<Observed extends Element = Element> = (
    detail: AddedChildEventArguments<Observed>
) => void;

/**
 * Child Added Event Arguments
 */
export type AddedChildEventArguments<Observed extends Element = Element> = {
    parent: Observed;
    element: Element;
};

/**
 * Child Remove Callback
 */
export type RemoveChildCallback<Observed extends Element = Element> = (
    detail: RemovedChildEventArguments<Observed>
) => void;

/**
 * Child Removed Event Arguments
 */
export type RemovedChildEventArguments<Observed extends Element = Element> = {
    parent: Observed;
    element: Element;
};

/*----------------------------------------*
 * Class
 *----------------------------------------*/

/**
 * Class Add Callback
 */
export type AddClassCallback<Observed extends Element = Element> = (
    detail: AddedClassEventArguments<Observed>
) => void;

/**
 * Class Added Event Arguments
 */
export type AddedClassEventArguments<Observed extends Element = Element> = {
    target: Observed;
    className: string;
};

/**
 * Class Remove Callback
 */
export type RemoveClassCallback<Observed extends Element = Element> = (
    detail: RemovedClassEventArguments<Observed>
) => void;

/**
 * Class Removed Event Arguments
 */
export type RemovedClassEventArguments<Observed extends Element = Element> = {
    target: Observed;
    className: string;
};

/*----------------------------------------*
 * Identifier
 *----------------------------------------*/

/**
 * Identifier Change Callback
 */
export type ChangeIdentifierCallback<Observed extends Element = Element> = (
    detail: ChangeIdentifierEventArguments<Observed>
) => void;

/**
 * Identifier Change Event Arguments
 */
export type ChangeIdentifierEventArguments<Observed extends Element = Element> =
    {
        target: Observed;
        newId: string | null;
        oldId: string | null;
    };

/*----------------------------------------*
 * Style
 *----------------------------------------*/

/**
 * Style Change Callback
 */
export type ChangeStyleCallback<Observed extends Element = Element> = (
    detail: ChangeStyleEventArguments<Observed>
) => void;

/**
 * Style Change Event Arguments
 */
export type ChangeStyleEventArguments<Observed extends Element = Element> = {
    target: Observed;
    newStyles: StyleValues;
    oldStyles: StyleValues;
};

/**
 * Style Property Change Callback
 */
export type ChangeStylePropertyCallback<Observed extends Element = Element> = (
    detail: ChangeStylePropertyEventArguments<Observed>
) => void;

/**
 * Style Property Change Event Arguments
 */
export type ChangeStylePropertyEventArguments<
    Observed extends Element = Element
> = {
    target: Observed;
    property: string;
    newStyle: StyleValue;
    oldStyle: StyleValue;
};

/**
 * Style Value
 */
export type StyleValue = string | number | null;

/**
 * Style Values
 */
export type StyleValues = {
    [key: string]: StyleValue;
};

/*----------------------------------------*
 * Text
 *----------------------------------------*/

/**
 * Text Observer Options
 */
export type TextObserverOptions = {
    subtree?: boolean;
};

/**
 * Text Change Callback
 */
export type ChangeTextCallback<Observed extends Element = Element> = (
    detail: ChangeTextEventArguments<Observed>
) => void;

/**
 * Text Change Event Arguments
 */
export type ChangeTextEventArguments<Observed extends Element = Element> = {
    container: Observed;
    textNode: Text;
    newValue: string;
    oldValue: string | null;
};
