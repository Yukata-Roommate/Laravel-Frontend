/*****************************************
 * Package Scripts Markdown
 *
 * Editor
 *****************************************/

/*----------------------------------------*
 * Imports
 *----------------------------------------*/

import Modal from "bootstrap/js/dist/modal"

import { addEventListener } from "../eventListener";

import { Markdown } from "../../modules/markdown";

/*----------------------------------------*
 * Event Listener
 *----------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    addEventListener(".markdown-editor__textarea", "keydown", showPreview);

    addEventListener(".markdown-preview-button", "click", showPreviewModal);
});

/*----------------------------------------*
 * Method
 *----------------------------------------*/

/**
 * show markdown content preview
 *
 * @param {Event} event
 * @param {HTMLTextAreaElement} element
 * @returns {void}
 */
function showPreview(event: Event, element: HTMLTextAreaElement): void {
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
 * @param {HTMLElement} element
 * @returns {void}
 */
function showPreviewModal(event: Event, element: HTMLElement): void {
    const sourceId = element.getAttribute("source");

    if (!sourceId) return;

    const sourceElement = document.getElementById(sourceId) as HTMLTextAreaElement;

    if (!sourceElement) return;

    const previewModal = document.getElementById("markdown-preview-modal");

    if (!previewModal) return;

    const previewModalBody = previewModal.querySelector(".modal-body");

    if (!previewModalBody) return;

    previewModalBody.innerHTML = Markdown.toHtml(sourceElement.value);

    const modal = new Modal(previewModal);

    modal.show();
}
