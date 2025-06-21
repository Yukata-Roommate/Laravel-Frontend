<?php

namespace YukataRm\Laravel\Frontend\Components\Layout\Pages\Sidebar;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Layout Pages Sidebar Border Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Layout\Pages\Sidebar
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
            "mb-1",
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
