<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Button Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Button extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $color
     * @param string|null $type
     * @param bool|null $block
     * @param bool|null $small
     * @param bool|null $outline
     */
    public function __construct(
        string $color,
        string|null $type = null,
        bool|null $block = null,
        bool|null $small = null,
        bool|null $outline = null,
    ) {
        $this->setColor($color);
        $this->setType($type);
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

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "type"  => $this->type,
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

    /**
     * type
     *
     * @var string
     */
    public string $type;

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
     * set type
     *
     * @param string|null $type
     * @return void
     */
    protected function setType(string|null $type): void
    {
        $this->type = $type ?? "button";
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
