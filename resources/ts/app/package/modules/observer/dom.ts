/*****************************************
 * Package Module Observer
 *
 * DOM
 *****************************************/

import type {
    DOMObserverOptions,
    AttributeObserverOptions,
    ChangeAttributeCallback,
    ChildObserverOptions,
    AddChildCallback,
    RemoveChildCallback,
    AddClassCallback,
    RemoveClassCallback,
    ChangeIdentifierCallback,
    ChangeStyleCallback,
    ChangeStylePropertyCallback,
    TextObserverOptions,
    ChangeTextCallback,
} from "./types";

import { BaseObserver } from "./base/observer";

import { AttributeObserver } from "./attribute";
import { ChildObserver } from "./child";
import { ClassObserver } from "./class";
import { IdentifierObserver } from "./identifier";
import { StyleObserver } from "./style";
import { TextObserver } from "./text";

import { ElementsTarget } from "./target/elements";

import type { RemoveListener } from "../callbacks";

/**
 * DOM Observer
 */
export class DOMObserver<
    Observed extends Element = Element
> extends BaseObserver {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {DOMObserverOptions} options
     */
    public constructor(options: DOMObserverOptions = {}) {
        super();

        this._attribute = new AttributeObserver<Observed>();
        this._child = new ChildObserver<Observed>();
        this._class = new ClassObserver<Observed>();
        this._identifier = new IdentifierObserver<Observed>();
        this._style = new StyleObserver<Observed>();
        this._text = new TextObserver<Observed>();

        this.setOptions(options);
    }

    /**
     * set options
     *
     * @param {DOMObserverOptions} options
     * @returns {this}
     */
    public setOptions(options: DOMObserverOptions): this {
        this.withPaused(() => {
            if (options.attribute !== undefined) {
                options.attribute
                    ? this.enableAttribute()
                    : this.disableAttribute();
            }

            if (options.child !== undefined) {
                options.child ? this.enableChild() : this.disableChild();
            }

            if (options.class !== undefined) {
                options.class ? this.enableClass() : this.disableClass();
            }

            if (options.identifier !== undefined) {
                options.identifier ? this.enableId() : this.disableId();
            }

            if (options.style !== undefined) {
                options.style ? this.enableStyle() : this.disableStyle();
            }

            if (options.text !== undefined) {
                options.text ? this.enableText() : this.disableText();
            }
        });

        return this;
    }

    /*-----------------------------------------*
     * Attribute
     *-----------------------------------------*/

    /**
     * attribute observer
     *
     * @type {AttributeObserver<Observed>}
     */
    protected _attribute: AttributeObserver<Observed>;

    /**
     * whether attribute observer is enable
     *
     * @type {boolean}
     */
    protected _isAttributeObserverEnable: boolean = false;

    /**
     * attribute observer options
     *
     * @type {AttributeObserverOptions}
     */
    protected _attributeOptions: AttributeObserverOptions = {};

    /**
     * get whether attribute observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableAttribute(): boolean {
        return this._isAttributeObserverEnable;
    }

    /**
     * get attribute observer options
     *
     * @returns {AttributeObserverOptions}
     */
    public get attributeOptions(): AttributeObserverOptions {
        return this._attributeOptions;
    }

    /**
     * enable attribute observer
     *
     * @returns {this}
     */
    public enableAttribute(): this {
        this.withPaused(() => {
            this._isAttributeObserverEnable = true;
        });

        return this;
    }

    /**
     * disable attribute observer
     *
     * @returns {this}
     */
    public disableAttribute(): this {
        this.withPaused(() => {
            this._isAttributeObserverEnable = false;
        });

        return this;
    }

    /**
     * set attribute observer options
     *
     * @param {AttributeObserverOptions} options
     * @returns {this}
     */
    public setAttributeOptions(options: AttributeObserverOptions): this {
        this.withPaused(() => {
            this._attributeOptions = options;
        });

        return this;
    }

    /**
     * add attribute change callback
     *
     * @param {string} attribute
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeAttribute(
        attribute: string,
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        return this._attribute.onChange(attribute, callback);
    }

    /**
     * add all attribute change callback
     *
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeAllAttribute(
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        return this._attribute.onChangeAll(callback);
    }

    /**
     * add data attribute change callback
     *
     * @param {string} data
     * @param {ChangeAttributeCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeData(
        data: string,
        callback: ChangeAttributeCallback<Observed>
    ): RemoveListener {
        return this._attribute.onChangeData(data, callback);
    }

    /**
     * start attribute observer
     *
     * @returns {void}
     */
    protected startAttributeObserver(): void {
        if (!this._isAttributeObserverEnable) return;

        this._attribute.setTargets(this._targets.get());
        this._attribute.setOptions(this._attributeOptions);

        this._attribute.start();
    }

    /*-----------------------------------------*
     * Child
     *-----------------------------------------*/

    /**
     * child observer
     *
     * @type {ChildObserver<Observed>}
     */
    protected _child: ChildObserver<Observed>;

    /**
     * whether child observer is enable
     *
     * @type {boolean}
     */
    protected _isChildObserverEnable: boolean = false;

    /**
     * child observer options
     *
     * @type {ChildObserverOptions}
     */
    protected _childOptions: ChildObserverOptions = {};

    /**
     * get whether child observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableChild(): boolean {
        return this._isChildObserverEnable;
    }

    /**
     * get child observer options
     *
     * @returns {ChildObserverOptions}
     */
    public get childOptions(): ChildObserverOptions {
        return this._childOptions;
    }

    /**
     * enable child observer
     *
     * @returns {this}
     */
    public enableChild(): this {
        this.withPaused(() => {
            this._isChildObserverEnable = true;
        });

        return this;
    }

    /**
     * disable child observer
     *
     * @returns {this}
     */
    public disableChild(): this {
        this.withPaused(() => {
            this._isChildObserverEnable = false;
        });

        return this;
    }

    /**
     * set child observer options
     *
     * @param {ChildObserverOptions} options
     * @returns {this}
     */
    public setChildOptions(options: ChildObserverOptions): this {
        this.withPaused(() => {
            this._childOptions = options;
        });

        return this;
    }

    /**
     * add child add callback
     *
     * @param {AddChildCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onAddChild(callback: AddChildCallback<Observed>): RemoveListener {
        return this._child.onAdd(callback);
    }

    /**
     * add child remove callback
     *
     * @param {RemoveChildCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onRemoveChild(
        callback: RemoveChildCallback<Observed>
    ): RemoveListener {
        return this._child.onRemove(callback);
    }

    /**
     * start child observer
     *
     * @returns {void}
     */
    protected startChildObserver(): void {
        if (!this._isChildObserverEnable) return;

        this._child.setTargets(this._targets.get());
        this._child.setOptions(this._childOptions);

        this._child.start();
    }

    /*-----------------------------------------*
     * Class
     *-----------------------------------------*/

    /**
     * class observer
     *
     * @type {ClassObserver<Observed>}
     */
    protected _class: ClassObserver<Observed>;

    /**
     * whether class observer is enable
     *
     * @type {boolean}
     */
    protected _isClassObserverEnable: boolean = false;

    /**
     * get whether class observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableClass(): boolean {
        return this._isClassObserverEnable;
    }

    /**
     * enable class observer
     *
     * @returns {this}
     */
    public enableClass(): this {
        this.withPaused(() => {
            this._isClassObserverEnable = true;
        });

        return this;
    }

    /**
     * disable class observer
     *
     * @returns {this}
     */
    public disableClass(): this {
        this.withPaused(() => {
            this._isClassObserverEnable = false;
        });

        return this;
    }

    /**
     * add class add callback
     *
     * @param {string} className
     * @param {AddClassCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onAddClass(
        className: string,
        callback: AddClassCallback<Observed>
    ): RemoveListener {
        return this._class.onAdd(className, callback);
    }

    /**
     * add class remove callback
     *
     * @param {string} className
     * @param {RemoveClassCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onRemoveClass(
        className: string,
        callback: RemoveClassCallback<Observed>
    ): RemoveListener {
        return this._class.onRemove(className, callback);
    }

    /**
     * add class toggle callback
     *
     * @param {string} className
     * @param {AddClassCallback<Observed>} addCallback
     * @param {RemoveClassCallback<Observed>} removeCallback
     * @returns {[RemoveListener, RemoveListener]}
     */
    public onToggleClass(
        className: string,
        addCallback: AddClassCallback<Observed>,
        removeCallback: RemoveClassCallback<Observed>
    ): [RemoveListener, RemoveListener] {
        return this._class.onToggle(className, addCallback, removeCallback);
    }

    /**
     * start class observer
     *
     * @returns {void}
     */
    protected startClassObserver(): void {
        if (!this._isClassObserverEnable) return;

        this._class.setTargets(this._targets.get());

        this._class.start();
    }

    /*-----------------------------------------*
     * Identifier
     *-----------------------------------------*/

    /**
     * identifier observer
     *
     * @type {IdentifierObserver<Observed>}
     */
    protected _identifier: IdentifierObserver<Observed>;

    /**
     * whether identifier observer is enable
     *
     * @type {boolean}
     */
    protected _isIdentifierObserverEnable: boolean = false;

    /**
     * get whether identifier observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableId(): boolean {
        return this._isIdentifierObserverEnable;
    }

    /**
     * enable identifier observer
     *
     * @returns {this}
     */
    public enableId(): this {
        this.withPaused(() => {
            this._isIdentifierObserverEnable = true;
        });

        return this;
    }

    /**
     * disable identifier observer
     *
     * @returns {this}
     */
    public disableId(): this {
        this.withPaused(() => {
            this._isIdentifierObserverEnable = false;
        });

        return this;
    }

    /**
     * add identifier change callback
     *
     * @param {ChangeIdentifierCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeId(
        callback: ChangeIdentifierCallback<Observed>
    ): RemoveListener {
        return this._identifier.onChange(callback);
    }

    /**
     * start identifier observer
     *
     * @returns {void}
     */
    protected startIdentifierObserver(): void {
        if (!this._isIdentifierObserverEnable) return;

        this._identifier.setTargets(this._targets.get());

        this._identifier.start();
    }

    /*-----------------------------------------*
     * Style
     *-----------------------------------------*/

    /**
     * style observer
     *
     * @type {StyleObserver<Observed>}
     */
    protected _style: StyleObserver<Observed>;

    /**
     * whether style observer is enable
     *
     * @type {boolean}
     */
    protected _isStyleObserverEnable: boolean = false;

    /**
     * get whether style observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableStyle(): boolean {
        return this._isStyleObserverEnable;
    }

    /**
     * enable style observer
     *
     * @returns {this}
     */
    public enableStyle(): this {
        this.withPaused(() => {
            this._isStyleObserverEnable = true;
        });

        return this;
    }

    /**
     * disable style observer
     *
     * @returns {this}
     */
    public disableStyle(): this {
        this.withPaused(() => {
            this._isStyleObserverEnable = false;
        });

        return this;
    }

    /**
     * add style change callback
     *
     * @param {ChangeStyleCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeStyle(
        callback: ChangeStyleCallback<Observed>
    ): RemoveListener {
        return this._style.onChange(callback);
    }

    /**
     * add style change property callback
     *
     * @param {string} property
     * @param {ChangeStylePropertyCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeStyleProperty(
        property: string,
        callback: ChangeStylePropertyCallback<Observed>
    ): RemoveListener {
        return this._style.onChangeProperty(property, callback);
    }

    /**
     * start style observer
     *
     * @returns {void}
     */
    protected startStyleObserver(): void {
        if (!this._isStyleObserverEnable) return;

        this._style.setTargets(this._targets.get());

        this._style.start();
    }

    /*----------------------------------------*
     * Text
     *----------------------------------------*/

    /**
     * text observer
     *
     * @type {TextObserver<Observed>}
     */
    protected _text: TextObserver<Observed>;

    /**
     * whether text observer is enable
     *
     * @type {boolean}
     */
    protected _isTextObserverEnable: boolean = false;

    /**
     * text observer option
     *
     * @type {TextObserverOptions}
     */
    protected _textOptions: TextObserverOptions = {};

    /**
     * get whether text observer is enable
     *
     * @returns {boolean}
     */
    public get isEnableText(): boolean {
        return this._isTextObserverEnable;
    }

    /**
     * get text observer options
     *
     * @returns {TextObserverOptions}
     */
    public get textOptions(): TextObserverOptions {
        return this._textOptions;
    }

    /**
     * enable text observer
     *
     * @returns {this}
     */
    public enableText(): this {
        this.withPaused(() => {
            this._isTextObserverEnable = true;
        });

        return this;
    }

    /**
     * disable text observer
     *
     * @returns {this}
     */
    public disableText(): this {
        this.withPaused(() => {
            this._isTextObserverEnable = false;
        });

        return this;
    }

    /**
     * set text observer options
     *
     * @param {TextObserverOptions} options
     * @returns {this}
     */
    public setTextOptions(options: TextObserverOptions): this {
        this.withPaused(() => {
            this._textOptions = options;
        });

        return this;
    }

    /**
     * add text change callback
     *
     * @param {ChangeTextCallback<Observed>} callback
     * @returns {RemoveListener}
     */
    public onChangeText(
        callback: ChangeTextCallback<Observed>
    ): RemoveListener {
        return this._text.onChange(callback);
    }

    /**
     * start text observer
     *
     * @returns {void}
     */
    protected startTextObserver(): void {
        if (!this._isTextObserverEnable) return;

        this._text.setTargets(this._targets.get());
        this._text.setOptions(this._textOptions);

        this._text.start();
    }

    /*----------------------------------------*
     * Targets
     *----------------------------------------*/

    /**
     * observed targets
     *
     * @type {ElementsTarget<Observed>}
     */
    protected _targets: ElementsTarget<Observed> =
        new ElementsTarget<Observed>();

    /**
     * get observed targets
     *
     * @returns {Observed[]}
     */
    public get targets(): Observed[] {
        return this._targets.get();
    }

    /**
     * whether has targets
     *
     * @returns {boolean}
     */
    public get hasTargets(): boolean {
        return !this._targets.isEmpty();
    }

    /**
     * set observed targets
     *
     * @param {Observed[]} targets
     * @returns {this}
     */
    public setTargets(targets: Observed[]): this {
        this.withPaused(() => {
            this._targets.set(targets);
        });

        return this;
    }

    /**
     * clear observed targets
     *
     * @returns {this}
     */
    public clearTargets(): this {
        return this.setTargets(this._targets.clear().get());
    }

    /**
     * add observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public addTarget(target: Observed): this {
        return this.setTargets(this._targets.add(target).get());
    }

    /**
     * remove observed target
     *
     * @param {Observed} target
     * @returns {this}
     */
    public removeTarget(target: Observed): this {
        return this.setTargets(this._targets.remove(target).get());
    }

    /**
     * set targets by selector
     *
     * @param {string} selector
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        return this.setTargets(
            this._targets.setBySelector(selector, throwError).get()
        );
    }

    /**
     * set targets by id
     *
     * @param {string} id
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsById(id: string, throwError: boolean = true): this {
        return this.setTargetsBySelector(`#${id}`, throwError);
    }

    /**
     * set targets by class
     *
     * @param {string} className
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsByClass(
        className: string,
        throwError: boolean = true
    ): this {
        return this.setTargetsBySelector(`.${className}`, throwError);
    }

    /**
     * set targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public setTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown,
        throwError: boolean = true
    ): this {
        return this.setTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`,
            throwError
        );
    }

    /**
     * add targets by selector
     *
     * @param {string} selector
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsBySelector(
        selector: string,
        throwError: boolean = true
    ): this {
        return this.setTargets(
            this._targets.addBySelector(selector, throwError).get()
        );
    }

    /**
     * add targets by class
     *
     * @param {string} className
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsByClass(
        className: string,
        throwError: boolean = true
    ): this {
        return this.addTargetsBySelector(`.${className}`, throwError);
    }

    /**
     * add targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @param {boolean} [throwError=true]
     * @returns {this}
     */
    public addTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown,
        throwError: boolean = true
    ): this {
        return this.addTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`,
            throwError
        );
    }

    /**
     * remove targets by selector
     *
     * @param {string} selector
     * @returns {this}
     */
    public removeTargetsBySelector(selector: string): this {
        return this.setTargets(this._targets.removeBySelector(selector).get());
    }

    /**
     * remove targets by id
     *
     * @param {string} id
     * @returns {this}
     */
    public removeTargetsById(id: string): this {
        return this.removeTargetsBySelector(`#${id}`);
    }

    /**
     * remove targets by class
     *
     * @param {string} className
     * @returns {this}
     */
    public removeTargetsByClass(className: string): this {
        return this.removeTargetsBySelector(`.${className}`);
    }

    /**
     * remove targets by attribute
     *
     * @param {string} attributeName
     * @param {unknown} attributeValue
     * @returns {this}
     */
    public removeTargetsByAttribute(
        attributeName: string,
        attributeValue: unknown
    ): this {
        return this.removeTargetsBySelector(
            `[${attributeName}="${attributeValue}"]`
        );
    }

    /*----------------------------------------*
     * Handle
     *----------------------------------------*/

    /**
     * start process
     *
     * @returns {this}
     */
    protected startProcess(): this {
        this.startTextObserver();
        this.startStyleObserver();
        this.startIdentifierObserver();
        this.startClassObserver();
        this.startChildObserver();
        this.startAttributeObserver();

        return this;
    }

    /**
     * stop process
     *
     * @returns {this}
     */
    protected stopProcess(): this {
        this._text.stop();
        this._style.stop();
        this._identifier.stop();
        this._class.stop();
        this._child.stop();
        this._attribute.stop();

        return this;
    }

    /**
     * destroy process
     *
     * @returns {void}
     */
    protected destroyProcess(): void {
        this._text.destroy();
        this._style.destroy();
        this._identifier.destroy();
        this._class.destroy();
        this._child.destroy();
        this._attribute.destroy();

        this._targets.clear();
    }
}
