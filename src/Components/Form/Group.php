<?php

namespace YukataRm\Laravel\Frontend\Components\Form;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Group Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form
 */
class Group extends BaseComponent
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
            "form-group",
            "mb-3",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }
}
