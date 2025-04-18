<?php

namespace YukataRm\Laravel\Frontend\Components\Modal\Button;

use YukataRm\Laravel\Frontend\Components\Button;

/**
 * Modal Button Close Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Modal\Button
 */
class Close extends Button
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $color
     * @param bool|null $block
     * @param bool|null $small
     * @param bool|null $outline
     */
    public function __construct(
        string|null $color = null,
        bool|null $block = null,
        bool|null $small = null,
        bool|null $outline = null,
    ) {
        parent::__construct(
            $color ?? "secondary",
            "button",
            $block,
            $small,
            $outline,
        );
    }

    /*----------------------------------------*
     * Attributes
     *----------------------------------------*/

    /**
     * merge attributes
     *
     * @return array<string, mixed>
     */
    #[\Override]
    protected function mergeAttributes(): array
    {
        return array_merge(parent::mergeAttributes(), [
            "data-bs-dismiss" => "modal",
        ]);
    }
}
