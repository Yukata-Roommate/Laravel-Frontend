/*****************************************
 * TypeScript
 *
 * Package
 *****************************************/

/*----------------------------------------*
 * Form
 *----------------------------------------*/

import { setup as setupFormEditor } from "./package/scripts/form/editor";

/*----------------------------------------*
 * Markdown
 *----------------------------------------*/

import { setup as setupMarkdownLandmark } from "./package/scripts/markdown/landmark";
import { setup as setupMarkdownCopyButton } from "./package/scripts/markdown/copyButton";
import { setup as setupMarkdownPreview } from "./package/scripts/markdown/preview";

/*----------------------------------------*
 * Clock
 *----------------------------------------*/

import { setup as setupClockSimple } from "./package/scripts/clock/simple";
import { setup as setupClockAnalog } from "./package/scripts/clock/analog";

/*----------------------------------------*
 * Event Listener
 *----------------------------------------*/

document.addEventListener("DOMContentLoaded", async function () {
    // Form
    await setupFormEditor();

    // Markdown
    await setupMarkdownLandmark();
    await setupMarkdownCopyButton();
    await setupMarkdownPreview();

    // Clock
    await setupClockSimple();
    await setupClockAnalog();
});
