<?php

namespace YukataRm\Laravel\Frontend\Components\Nav;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Nav Contents Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Nav
 */
class Contents extends BaseComponent
{
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
            "tab-content",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }
}
