<?php

namespace YukataRm\Laravel\Frontend\Components\Button;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Button Group Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Button
 */
class Group extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $position
     */
    public function __construct(string $position)
    {
        $this->setPosition($position);
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
            "d-flex",
            "align-items-center",
        ];

        $class[] = match ($this->position) {
            "left"   => "justify-content-start",
            "right"  => "justify-content-end",
            "center" => "justify-content-center",

            default => "",
        };

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * position
     *
     * @var string
     */
    public string $position;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set position
     *
     * @param string $position
     * @return void
     */
    public function setPosition(string $position): void
    {
        $this->position = $position;
    }
}
