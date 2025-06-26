<?php

namespace YukataRm\Laravel\Frontend\Components\Button;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Button Link Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Button
 */
class Link extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $href
     * @param string $color
     * @param bool|null $blank
     * @param bool|null $block
     * @param bool|null $small
     * @param bool|null $outline
     */
    public function __construct(
        string $href,
        string $color,
        bool|null $blank = null,
        bool|null $block = null,
        bool|null $small = null,
        bool|null $outline = null,
    ) {
        $this->setHref($href);
        $this->setColor($color);
        $this->setBlank($blank);
        $this->setBlock($block);
        $this->setSmall($small);
        $this->setOutline($outline);
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
            "btn",
        ];

        $class[] .= $this->outline ? "btn-outline-{$this->color}" : "btn-{$this->color}";

        if ($this->block) $class[] .= "d-block";

        if ($this->small) $class[] .= "btn-sm";

        $attributes = [
            "class" => implode(" ", $class),
            "href"  => $this->href,
        ];

        if ($this->blank) {
            $attributes["target"] = "_blank";
            $attributes["rel"]    = "noopener noreferrer";
        }

        return array_merge(parent::mergeAttributes(), $attributes);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * href
     *
     * @var string
     */
    public string $href;

    /**
     * color
     *
     * @var string
     */
    public string $color;

    /**
     * blank
     *
     * @var bool
     */
    public bool $blank;

    /**
     * block
     *
     * @var bool|null
     */
    public bool|null $block;

    /**
     * small
     *
     * @var bool|null
     */
    public bool|null $small;

    /**
     * outline
     *
     * @var bool|null
     */
    public bool|null $outline;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set href
     *
     * @param string $href
     * @return void
     */
    protected function setHref(string $href): void
    {
        $this->href = $href;
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

    /**
     * set blank
     *
     * @param bool|null $blank
     * @return void
     */
    protected function setBlank(bool|null $blank): void
    {
        $this->blank = $blank ?? false;
    }

    /**
     * set block
     *
     * @param bool|null $block
     * @return void
     */
    protected function setBlock(bool|null $block): void
    {
        $this->block = $block;
    }

    /**
     * set small
     *
     * @param bool|null $small
     * @return void
     */
    protected function setSmall(bool|null $small): void
    {
        $this->small = $small;
    }

    /**
     * set outline
     *
     * @param bool|null $outline
     * @return void
     */
    protected function setOutline(bool|null $outline): void
    {
        $this->outline = $outline;
    }
}
