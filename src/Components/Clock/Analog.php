<?php

namespace YukataRm\Laravel\Frontend\Components\Clock;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Clock Analog Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Clock
 */
class Analog extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $size
     */
    public function __construct(string|null $size = null)
    {
        $this->setSize($size);
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
            "clock",
            "clock-analog",
            "clock-{$this->size}",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "type"  => "analog",
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * clock size class
     *
     * @var string
     */
    public string $size;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set clock size
     *
     * @param string|null $size
     * @return void
     */
    protected function setSize(string|null $size): void
    {
        $this->size = match ($size) {
            "xs", "x-small" => "xs",
            "sm", "small"   => "sm",
            "md", "medium"  => "md",
            "lg", "large"   => "lg",
            "xl", "x-large" => "xl",

            default => "md",
        };
    }
}
