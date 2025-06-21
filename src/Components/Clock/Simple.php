<?php

namespace YukataRm\Laravel\Frontend\Components\Clock;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Clock Simple Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Clock
 */
class Simple extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $size
     * @param bool|null $border
     * @param bool|null $wrap
     * @param bool|null $inline
     */
    public function __construct(
        string|null $size = null,
        bool|null $border = null,
        bool|null $wrap = null,
        bool|null $inline = null,
    ) {
        $this->setSize($size);
        $this->setBorder($border);
        $this->setWrap($wrap);
        $this->setInline($inline);
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
            "clock-simple",
            "clock-{$this->size}",
        ];

        if ($this->border) $class[] = "clock-border";

        if ($this->wrap) $class[] = "clock-wrap";

        if ($this->inline) $class[] = "clock-inline";

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "type"  => "simple",
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

    /**
     * clock border
     *
     * @var bool
     */
    public bool $border;

    /**
     * clock wrap
     *
     * @var bool
     */
    public bool $wrap;

    /**
     * clock inline
     *
     * @var bool
     */
    public bool $inline;

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

    /**
     * set clock border
     *
     * @param bool|null $border
     * @return void
     */
    protected function setBorder(bool|null $border): void
    {
        $this->border = $border ?? false;
    }

    /**
     * set clock wrap
     *
     * @param bool|null $wrap
     * @return void
     */
    protected function setWrap(bool|null $wrap): void
    {
        $this->wrap = $wrap ?? false;
    }

    /**
     * set clock inline
     *
     * @param bool|null $inline
     * @return void
     */
    protected function setInline(bool|null $inline): void
    {
        $this->inline = $inline ?? false;
    }
}
