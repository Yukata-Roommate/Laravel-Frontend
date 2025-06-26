/*****************************************
 * Package Module Element Observer
 *
 * Index
 *****************************************/

/*----------------------------------------*
 * Factory
 *----------------------------------------*/

export { Observer } from "./factory";

/*----------------------------------------*
 * Class
 *----------------------------------------*/

export { BaseObserver } from "./base/observer";
export { NodeObserver } from "./base/node";
export { SingleObserver } from "./base/single";
export { ElementObserver } from "./base/element";
export { MultipleObserver } from "./base/multiple";
export { ElementsObserver } from "./base/elements";

export { DOMObserver } from "./dom";
export { AttributeObserver } from "./attribute";
export { ChildObserver } from "./child";
export { ClassObserver } from "./class";
export { IdentifierObserver } from "./identifier";
export { StyleObserver } from "./style";
export { TextObserver } from "./text";

export { SingleTarget } from "./target/single";
export { MultipleTarget } from "./target/multiple";
export { ElementTarget } from "./target/element";
export { ElementsTarget } from "./target/elements";

/*----------------------------------------*
 * Type
 *----------------------------------------*/

export type {
    DOMObserverOptions,
    AttributeObserverOptions,
    ChangeAttributeCallback,
    ChangeAttributeEventArguments,
    ChildObserverOptions,
    AddChildCallback,
    AddedChildEventArguments,
    RemoveChildCallback,
    RemovedChildEventArguments,
    AddClassCallback,
    AddedClassEventArguments,
    RemoveClassCallback,
    RemovedClassEventArguments,
    ChangeIdentifierCallback,
    ChangeIdentifierEventArguments,
    ChangeStyleCallback,
    ChangeStyleEventArguments,
    ChangeStylePropertyCallback,
    ChangeStylePropertyEventArguments,
    StyleValue,
    StyleValues,
    TextObserverOptions,
    ChangeTextCallback,
    ChangeTextEventArguments,
} from "./types";
