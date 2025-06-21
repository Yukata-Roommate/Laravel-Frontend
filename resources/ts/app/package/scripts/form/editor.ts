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
        handleMarkdownEditor
    );

    EventListener.add(
        "textarea:not(.markdown-editor__textarea)",
        "keydown",
        handleTextEditor
    );
}

/**
 * handle markdown editor
 *
 * @param {KeyboardEvent} event
 * @param {Element} target
 * @return {void}
 */
function handleMarkdownEditor(event: KeyboardEvent, target: Element): void {
    MarkdownEditor.onKeydown(event, target);
}

/**
 * handle text editor
 *
 * @param {KeyboardEvent} event
 * @param {Element} target
 * @return {void}
 */
function handleTextEditor(event: KeyboardEvent, target: Element): void {
    TextEditor.onKeydown(event, target);
}
