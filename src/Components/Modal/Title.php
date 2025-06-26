<?php

namespace YukataRm\Laravel\Frontend\Components\Modal;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Modal Title Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Modal
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
            "h5",
            "modal-title",
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
     * Methods
     *----------------------------------------*/

    /**
     * set title
     *
     * @param string $title
     * @return void
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
}
