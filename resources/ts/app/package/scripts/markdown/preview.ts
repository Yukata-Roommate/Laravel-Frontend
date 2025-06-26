/*****************************************
 * Package Scripts Markdown
 *
 * Preview
 *****************************************/

import Modal from "bootstrap/js/dist/modal";

import { EventListener } from "../../modules/eventListener";

import { Markdown } from "../../modules/markdown";

/**
 * setup
 *
 * @return {Promise<void>}
 */
export async function setup(): Promise<void> {
    EventListener.add(".markdown-editor__textarea", "input", showPreview);

    EventListener.add(".markdown-preview-button", "click", showPreviewModal);
}

/**
 * show markdown content preview
 *
 * @param {Event} event
 * @param {Element} element
 * @returns {void}
 */
function showPreview(event: Event, element: Element): void {
    if (!(element instanceof HTMLTextAreaElement)) return;

    const previewId = element.getAttribute("preview");

    if (!previewId) return;

    const previewElement = document.getElementById(previewId) as HTMLElement;

    if (!previewElement) return;

    previewElement.innerHTML = Markdown.toHtml(element.value);
}

/**
 * show markdown content preview modal
 *
 * @param {Event} event
 * @param {Element} element
 * @returns {void}
 */
function showPreviewModal(event: Event, element: Element): void {
    if (!(element instanceof HTMLButtonElement)) return;

    const sourceId = element.getAttribute("source");

    if (!sourceId) return;

    const sourceElement = document.getElementById(
        sourceId
    ) as HTMLTextAreaElement;

    if (!sourceElement) return;

    const previewModal = document.getElementById("markdown-preview-modal");

    if (!previewModal) return;

    const previewModalBody = previewModal.querySelector(".modal-body");

    if (!previewModalBody) return;

    previewModalBody.innerHTML = Markdown.toHtml(sourceElement.value);

    const modal = new Modal(previewModal);

    modal.show();
}
