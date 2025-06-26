/*****************************************
 * Package Module Draggable
 *
 * Area
 *****************************************/

import type {
    OnDragStartEventHandler,
    OnDragEndEventHandler,
    OnDragOverEventHandler,
    OnDragEnterEventHandler,
    OnDragLeaveEventHandler,
    OnDropEventHandler,
} from "./types";

/**
 * Draggable Area
 */
export class DraggableArea {
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param {HTMLElement} area
     */
    public constructor(area: HTMLElement) {
        this.area = area;

        this.dropSpace = this.createDropSpace();
    }

    /*----------------------------------------*
     * Area
     *----------------------------------------*/

    /**
     * draggable area
     *
     * @type {HTMLElement}
     */
    protected area: HTMLElement;

    /**
     * start draggable area
     *
     * @return {void}
     */
    public start(): void {
        Array.from(this.area.children).forEach((item: Element) => {
            item.setAttribute("draggable", "true");
        });

        this.area.addEventListener("dragstart", (event: DragEvent) => {
            this.handleOnDragStart(event);
        });

        this.area.addEventListener("dragend", (event: DragEvent) => {
            this.handleOnDragEnd(event);
        });

        this.area.addEventListener("dragover", (event: DragEvent) => {
            this.handleOnDragOver(event);
        });

        this.area.addEventListener("dragenter", (event: DragEvent) => {
            this.handleOnDragEnter(event);
        });

        this.area.addEventListener("dragleave", (event: DragEvent) => {
            this.handleOnDragLeave(event);
        });

        this.area.addEventListener("drop", (event: DragEvent) => {
            this.handleOnDrop(event);
        });
    }

    /**
     * stop draggable area
     *
     * @return {void}
     */
    public stop(): void {
        Array.from(this.area.children).forEach((item: Element) => {
            item.removeAttribute("draggable");
        });

        this.area.removeEventListener("dragstart", (event: DragEvent) => {
            this.handleOnDragStart(event);
        });

        this.area.removeEventListener("dragend", (event: DragEvent) => {
            this.handleOnDragEnd(event);
        });

        this.area.removeEventListener("dragover", (event: DragEvent) => {
            this.handleOnDragOver(event);
        });

        this.area.removeEventListener("dragenter", (event: DragEvent) => {
            this.handleOnDragEnter(event);
        });

        this.area.removeEventListener("dragleave", (event: DragEvent) => {
            this.handleOnDragLeave(event);
        });

        this.area.removeEventListener("drop", (event: DragEvent) => {
            this.handleOnDrop(event);
        });
    }

    /*----------------------------------------*
     * Dragged Item
     *----------------------------------------*/

    /**
     * dragged item
     *
     * @type {HTMLElement | null}
     */
    protected _draggedItem: HTMLElement | null = null;

    /**
     * get dragged item
     *
     * @return {HTMLElement}
     */
    protected get draggedItem(): HTMLElement {
        if (!this._draggedItem) throw new Error("Dragged item is not set.");

        return this._draggedItem;
    }

    /**
     * set dragged item
     *
     * @param {HTMLElement} item
     */
    protected set draggedItem(item: HTMLElement) {
        if (!(item instanceof HTMLElement))
            throw new Error("Dragged item must be an instance of HTMLElement.");

        if (!item.classList.contains("dragging"))
            item.classList.add("dragging");

        this._draggedItem = item;
    }

    /**
     * clear dragged item
     *
     * @return {void}
     */
    protected clearDraggedItem(): void {
        if (!this._draggedItem) throw new Error("Dragged item is not set.");

        this._draggedItem = null;
    }

    /*----------------------------------------*
     * Drop Space
     *----------------------------------------*/

    /**
     * drop space
     *
     * @type {HTMLElement}
     */
    protected dropSpace: HTMLElement;

    /**
     * create drop space
     *
     * @return {HTMLElement}
     */
    protected createDropSpace(): HTMLElement {
        const dropSpace = document.createElement("div");

        dropSpace.classList.add("drop-space");

        return dropSpace;
    }

    /**
     * show drop space
     *
     * @return {void}
     */
    protected showDropSpace(): void {
        this.dropSpace.classList.add("show");

        this.dropSpace.style.height = `${this.draggedItem.offsetHeight}px`;
    }

    /**
     * hide drop space
     *
     * @return {void}
     */
    protected hideDropSpace(): void {
        this.dropSpace.classList.remove("show");

        if (this.dropSpace.parentNode)
            this.dropSpace.parentNode.removeChild(this.dropSpace);

        this.dropSpace.style.height = "0";
    }

    /*----------------------------------------*
     * On Drag Start
     *----------------------------------------*/

    /**
     * ondragstart event handlers
     *
     * @type {OnDragStartEventHandler[]}
     */
    protected ondragstarts: OnDragStartEventHandler[] = [];

    /**
     * add ondragstart event handler
     *
     * @param {OnDragStartEventHandler} handler
     * @return {void}
     */
    public addOnDragStart(handler: OnDragStartEventHandler): void {
        this.ondragstarts.push(handler);
    }

    /**
     * clear ondragstart event handlers
     *
     * @return {void}
     */
    public clearOnDragStart(): void {
        this.ondragstarts.length = 0;
    }

    /**
     * handle ondragstart event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDragStart(event: DragEvent): void {
        this.draggedItem = event.target as HTMLElement;

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData(
                "text/plain",
                this.draggedItem.outerHTML
            );
        }

        this.ondragstarts.forEach((handler: OnDragStartEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * On Drag End
     *----------------------------------------*/

    /**
     * ondragend event handlers
     *
     * @type {OnDragEndEventHandler[]}
     */
    protected ondragends: OnDragEndEventHandler[] = [];

    /**
     * add ondragend event handler
     *
     * @param {OnDragEndEventHandler} handler
     * @return {void}
     */
    public addOnDragEnd(handler: OnDragEndEventHandler): void {
        this.ondragends.push(handler);
    }

    /**
     * clear ondragend event handlers
     *
     * @return {void}
     */
    public clearOnDragEnd(): void {
        this.ondragends.length = 0;
    }

    /**
     * handle ondragend event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDragEnd(event: DragEvent): void {
        if (this.draggedItem !== event.target)
            throw new Error("Unexpected dragged item.");

        this.hideDropSpace();

        this.area.classList.remove("drag-over");

        this.draggedItem.classList.remove("dragging");
        this.draggedItem.classList.add("dropped");

        setTimeout(() => {
            this.draggedItem.classList.remove("dropped");

            this.clearDraggedItem();
        }, 600);

        this.ondragends.forEach((handler: OnDragEndEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * On Drag Over
     *----------------------------------------*/

    /**
     * ondragover event handlers
     *
     * @type {OnDragOverEventHandler[]}
     */
    protected ondragovers: OnDragOverEventHandler[] = [];

    /**
     * add ondragover event handler
     *
     * @param {OnDragOverEventHandler} handler
     * @return {void}
     */
    public addOnDragOver(handler: OnDragOverEventHandler): void {
        this.ondragovers.push(handler);
    }

    /**
     * clear ondragover event handlers
     *
     * @return {void}
     */
    public clearOnDragOver(): void {
        this.ondragovers.length = 0;
    }

    /**
     * handle ondragover event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDragOver(event: DragEvent): void {
        event.preventDefault();

        const afterElement = this.getAfterElement(event.clientX, event.clientY);

        if (afterElement == null) {
            this.area.appendChild(this.dropSpace);
        } else {
            this.area.insertBefore(this.dropSpace, afterElement);
        }

        this.showDropSpace();

        this.ondragovers.forEach((handler: OnDragOverEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * On Drag Enter
     *----------------------------------------*/

    /**
     * ondragenter event handlers
     *
     * @type {OnDragEnterEventHandler[]}
     */
    protected ondragenters: OnDragEnterEventHandler[] = [];

    /**
     * add ondragenter event handler
     *
     * @param {OnDragEnterEventHandler} handler
     * @return {void}
     */
    public addOnDragEnter(handler: OnDragEnterEventHandler): void {
        this.ondragenters.push(handler);
    }

    /**
     * clear ondragenter event handlers
     *
     * @return {void}
     */
    public clearOnDragEnter(): void {
        this.ondragenters.length = 0;
    }

    /**
     * handle ondragenter event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDragEnter(event: DragEvent): void {
        if (event.target === this.area) this.area.classList.add("drag-over");

        this.ondragenters.forEach((handler: OnDragEnterEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * On Drag Leave
     *----------------------------------------*/

    /**
     * ondragleave event handlers
     *
     * @type {OnDragLeaveEventHandler[]}
     */
    protected ondragleaves: OnDragLeaveEventHandler[] = [];

    /**
     * add ondragleave event handler
     *
     * @param {OnDragLeaveEventHandler} handler
     * @return {void}
     */
    public addOnDragLeave(handler: OnDragLeaveEventHandler): void {
        this.ondragleaves.push(handler);
    }

    /**
     * clear ondragleave event handlers
     *
     * @return {void}
     */
    public clearOnDragLeave(): void {
        this.ondragleaves.length = 0;
    }

    /**
     * handle ondragleave event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDragLeave(event: DragEvent): void {
        if (event.target === this.area) this.area.classList.remove("drag-over");

        this.ondragleaves.forEach((handler: OnDragLeaveEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * On Drop
     *----------------------------------------*/

    /**
     * ondrop event handlers
     *
     * @type {OnDropEventHandler[]}
     */
    protected ondrops: OnDropEventHandler[] = [];

    /**
     * add ondrop event handler
     *
     * @param {OnDropEventHandler} handler
     * @return {void}
     */
    public addOnDrop(handler: OnDropEventHandler): void {
        this.ondrops.push(handler);
    }

    /**
     * clear ondrop event handlers
     *
     * @return {void}
     */
    public clearOnDrop(): void {
        this.ondrops.length = 0;
    }

    /**
     * handle ondrop event
     *
     * @param {DragEvent} event
     * @return {void}
     */
    protected handleOnDrop(event: DragEvent): void {
        const afterElement = this.getAfterElement(event.clientX, event.clientY);

        if (afterElement == null) {
            this.area.appendChild(this.draggedItem);
        } else {
            this.area.insertBefore(this.draggedItem, afterElement);
        }

        this.ondrops.forEach((handler: OnDropEventHandler) => {
            handler(event, this.area, this.draggedItem);
        });
    }

    /*----------------------------------------*
     * After Element
     *----------------------------------------*/

    /**
     * get after element
     *
     * @param {number} x
     * @param {number} y
     * @return {HTMLElement | null}
     */
    protected getAfterElement(x: number, y: number): HTMLElement | null {
        const draggableElements = Array.from(
            this.area.querySelectorAll<HTMLElement>(":not(.dragging)")
        );

        let closestElement: unknown = null;
        let minDistance = Infinity;
        let insertAfter = false;

        draggableElements.forEach((element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const elementCenterY = rect.top + rect.height / 2;
            const elementCenterX = rect.left + rect.width / 2;

            const distanceX = Math.abs(x - elementCenterX);
            const distanceY = Math.abs(y - elementCenterY);
            const totalDistance = Math.sqrt(
                distanceX * distanceX + distanceY * distanceY
            );

            if (totalDistance >= minDistance) return;

            minDistance = totalDistance;
            closestElement = element;

            insertAfter =
                y > elementCenterY ||
                (Math.abs(y - elementCenterY) < 10 && x > elementCenterX);
        });

        if (!(closestElement instanceof HTMLElement)) return null;

        if (insertAfter)
            return closestElement.nextElementSibling as HTMLElement;

        return closestElement;
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * make draggable area
     *
     * @param {HTMLElement} area
     * @returns {this}
     */
    public static make(area: HTMLElement): DraggableArea {
        return new this(area);
    }
}
