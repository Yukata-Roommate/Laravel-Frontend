/*****************************************
 * Package Module Element Observer
 *
 * Factory
 *****************************************/

import type {
    DOMObserverOptions,
    AttributeObserverOptions,
    ChildObserverOptions,
    TextObserverOptions,
} from "./types";

import { DOMObserver } from "./dom";

import { AttributeObserver } from "./attribute";
import { ChildObserver } from "./child";
import { ClassObserver } from "./class";
import { IdentifierObserver } from "./identifier";
import { StyleObserver } from "./style";
import { TextObserver } from "./text";

/**
 * Observer Factory
 */
export class Observer {
    /**
     * create dom observer
     *
     * @param {DOMObserverOptions} options
     * @returns {DOMObserver}
     */
    public static dom<Observed extends Element = Element>(
        options: DOMObserverOptions = {}
    ): DOMObserver<Observed> {
        return new DOMObserver<Observed>(options);
    }

    /**
     * create attribute observer
     *
     * @param {AttributeObserverOptions} options
     * @returns {AttributeObserver}
     */
    public static attribute<Observed extends Element = Element>(
        options: AttributeObserverOptions = {}
    ): AttributeObserver<Observed> {
        return new AttributeObserver<Observed>(options);
    }

    /**
     * create child observer
     *
     * @param {ChildObserverOptions} options
     * @returns {ChildObserver}
     */
    public static child<Observed extends Element = Element>(
        options: ChildObserverOptions = {}
    ): ChildObserver<Observed> {
        return new ChildObserver<Observed>(options);
    }

    /**
     * create class observer
     *
     * @returns {ClassObserver}
     */
    public static class<
        Observed extends Element = Element
    >(): ClassObserver<Observed> {
        return new ClassObserver<Observed>();
    }

    /**
     * create identifier observer
     *
     * @returns {IdentifierObserver}
     */
    public static identifier<
        Observed extends Element = Element
    >(): IdentifierObserver<Observed> {
        return new IdentifierObserver<Observed>();
    }

    /**
     * create style observer
     *
     * @returns {StyleObserver}
     */
    public static style<
        Observed extends Element = Element
    >(): StyleObserver<Observed> {
        return new StyleObserver<Observed>();
    }

    /**
     * create text observer
     *
     * @param {TextObserverOptions} options
     * @returns {TextObserver}
     */
    public static text<Observed extends Element = Element>(
        options: TextObserverOptions = {}
    ): TextObserver<Observed> {
        return new TextObserver<Observed>(options);
    }
}
