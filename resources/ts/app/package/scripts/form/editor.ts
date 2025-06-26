/*****************************************
 * Package Scripts Form
 *
 * Editor
 *****************************************/

import { EventListener } from "../../modules/eventListener";

import { MarkdownEditor, TextEditor } from "../../modules/editor";

/**
 * setup
 *
 * @return {Promise<void>}
 */
export async function setup(): Promise<void> {
    EventListener.add(
        "textarea.markdown-editor__textarea",
        "keydown",
        handleMarkdownEditorKeydown
    );

    EventListener.add(
        "textarea.markdown-editor__textarea",
        "input",
        handleMarkdownEditorInput
    );

    EventListener.add(
        "textarea:not(.markdown-editor__textarea)",
        "keydown",
        handleTextEditorKeydown
    );

    EventListener.add(
        "textarea:not(.markdown-editor__textarea)",
        "input",
        handleTextEditorInput
    );
}

/**
 * handle markdown editor keydown
 *
 * @param {KeyboardEvent} event
 * @param {Element} target
 * @return {void}
 */
function handleMarkdownEditorKeydown(
    event: KeyboardEvent,
    target: Element
): void {
    MarkdownEditor.onKeydown(event, target);
}

/**
 * handle markdown editor input
 *
 * @param {Event} event
 * @param {Element} target
 * @return {void}
 */
function handleMarkdownEditorInput(event: Event, target: Element): void {
    MarkdownEditor.onInput(event, target);
}

/**
 * handle text editor keydown
 *
 * @param {KeyboardEvent} event
 * @param {Element} target
 * @return {void}
 */
function handleTextEditorKeydown(event: KeyboardEvent, target: Element): void {
    TextEditor.onKeydown(event, target);
}

/**
 * handle text editor input
 *
 * @param {Event} event
 * @param {Element} target
 * @return {void}
 */
function handleTextEditorInput(event: Event, target: Element): void {
    TextEditor.onInput(event, target);
}
