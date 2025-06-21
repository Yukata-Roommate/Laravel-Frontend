/*****************************************
 * Package Module Event Listener
 *
 * Handler
 *****************************************/

import type { Callable, EventListenerCallback } from "./types";

/**
 * Event Listener
 */
export class EventListener<EventName extends keyof DocumentEventMap> {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * event name
     *
     * @type {EventName}
     */
    protected event: EventName;

    /**
     * callback
     *
     * @type {EventListenerCallback}
     */
    protected callback: EventListenerCallback;

    /**
     * options
     *
     * @type {AddEventListenerOptions}
     */
    protected options: AddEventListenerOptions;

    /**
     * constructor
     *
     * @param {string} selector
     * @param {EventName} event
     * @param {Callable<EventName>} callable
     * @param {AddEventListenerOptions} options
     */
    public constructor(
        selector: string,
        event: EventName,
        callable: Callable<EventName>,
        options: AddEventListenerOptions = {}
    ) {
        this.event = event;
        this.callback = this.getCallback(selector, callable);
        this.options = this.getOptions(options);

        this.add();
    }

    /**
     * get event listener callback
     *
     * @param {string} selector
     * @param {Callable<EventName>} callable
     * @return {EventListenerCallback}
     */
    protected getCallback(
        selector: string,
        callable: Callable<EventName>
    ): EventListenerCallback {
        return function (event: Event) {
            if (!(event.target instanceof Element)) return;

            const target = event.target.closest(selector);

            if (!target) return;

            if (target.classList.contains("event-disabled")) return;

            if (
                target.classList.contains("event-confirm") ||
                target.classList.contains("event-confirm-once")
            ) {
                const confirmMessage = target.getAttribute("confirm-message");

                if (!confirmMessage) return;

                if (!window.confirm(confirmMessage)) return;

                if (target.classList.contains("event-confirm-once")) {
                    target.classList.remove("event-confirm-once");
                    target.classList.add("event-confirmed");

                    target.removeAttribute("confirm-message");
                }
            }

            const typedEvent = event as DocumentEventMap[EventName];

            if (typeof callable === "object") {
                callable.handleEvent(typedEvent);
                return;
            }

            callable(typedEvent, target);
        };
    }

    /**
     * get event listener options
     *
     * @param {AddEventListenerOptions} options
     * @return {AddEventListenerOptions}
     */
    protected getOptions(
        options: AddEventListenerOptions
    ): AddEventListenerOptions {
        return options;
    }

    /*----------------------------------------*
     * Handle
     *----------------------------------------*/

    /**
     * add event listener
     *
     * @return {void}
     */
    public add(): void {
        document.addEventListener(this.event, this.callback, this.options);
    }

    /**
     * remove event listener
     *
     * @return {void}
     */
    public remove(): void {
        document.removeEventListener(this.event, this.callback, this.options);
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * make event listener
     *
     * @param {string} selector
     * @param {EventName} event
     * @param {Callable<EventName>} callable
     * @param {AddEventListenerOptions} options
     * @return {this<EventName>}
     */
    public static make<EventName extends keyof DocumentEventMap>(
        selector: string,
        event: EventName,
        callable: Callable<EventName>,
        options: AddEventListenerOptions = {}
    ): EventListener<EventName> {
        return new this(selector, event, callable, options);
    }

    /**
     * add event listener
     *
     * @param {string} selector
     * @param {EventName} event
     * @param {Callable<EventName>} callable
     * @param {AddEventListenerOptions} options
     * @return {this<EventName>}
     */
    public static add<EventName extends keyof DocumentEventMap>(
        selector: string,
        event: EventName,
        callable: Callable<EventName>,
        options: AddEventListenerOptions = {}
    ): EventListener<EventName> {
        return this.make(selector, event, callable, options);
    }
}
