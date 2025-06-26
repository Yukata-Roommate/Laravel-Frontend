<?php

namespace YukataRm\Laravel\Frontend\Components\Nav;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Nav Items Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Nav
 */
class Items extends BaseComponent
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
            "nav",
            "nav-tabs",
            "text-center",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "role"  => "tablist",
        ]);
    }
}
