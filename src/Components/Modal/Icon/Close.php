<?php

namespace YukataRm\Laravel\Frontend\Components\Modal\Icon;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Modal Icon Close Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Modal\Icon
 */
class Close extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     */
    public function __construct() {}

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
        $class = [
            "btn-close",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class"           => implode(" ", $class),
            "type"            => "button",
            "data-bs-dismiss" => "modal",
            "aria-label"      => "Close",
        ]);
    }
}
