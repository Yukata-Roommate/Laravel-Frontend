<?php

namespace YukataRm\Laravel\Frontend\Components\Breadcrumb;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Breadcrumb Active Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Breadcrumb
 */
class Active extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $title
     */
    public function __construct(string $title)
    {
        $this->setTitle($title);
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
            "breadcrumb-item",
            "active",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class"        => implode(" ", $class),
            "aria-current" => "page",
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
}
