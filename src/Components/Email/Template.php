<?php

namespace YukataRm\Laravel\Frontend\Components\Email;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Email Template Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Email
 */
class Template extends BaseComponent
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
            "container",
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
