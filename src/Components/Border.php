<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Border Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Border extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $color
     */
    public function __construct(string $color = "secondary")
    {
        $this->setColor($color);
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
        $class = [
            "border-top",
            "border-{$this->color}",
            "my-2",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * color
     *
     * @var string
     */
    public string $color;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set color
     *
     * @param string $color
     * @return void
     */
    protected function setColor(string $color): void
    {
        $this->color = $color;
    }
}
