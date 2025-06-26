<?php

namespace YukataRm\Laravel\Frontend\Components\Layout\Pages\Sidebar;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Layout Pages Sidebar Title Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Layout\Pages\Sidebar
 */
class Title extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $title
     * @param string $color
     */
    public function __construct(string $title, string $color = "light")
    {
        $this->setTitle($title);
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
            "text-{$this->color}",
            "ps-3",
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
     * title
     *
     * @var string
     */
    public string $title;

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
     * set title
     *
     * @param string $title
     * @return void
     */
    protected function setTitle(string $title): void
    {
        $this->title = $title;
    }

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
