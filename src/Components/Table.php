<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Table Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Table extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $color
     * @param bool|null $hover
     * @param bool|null $striped
     * @param bool|null $stripedColumns
     */
    public function __construct(
        string|null $color = null,
        bool|null $hover = null,
        bool|null $striped = null,
        bool|null $stripedColumns = null,
    ) {
        $this->setColor($color);
        $this->setHover($hover);
        $this->setStriped($striped);
        $this->setStripedColumns($stripedColumns);
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
            "table",
        ];

        if ($this->color) $class[] = "table-{$this->color}";

        if ($this->hover) $class[] = "table-hover";

        if ($this->striped) $class[] = "table-striped";

        if ($this->stripedColumns) $class[] = "table-striped-columns";

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
     * @var string|null
     */
    public string|null $color;

    /**
     * hover
     *
     * @var bool
     */
    public bool $hover;

    /**
     * striped
     *
     * @var bool
     */
    public bool $striped;

    /**
     * stripedColumns
     *
     * @var bool
     */
    public bool $stripedColumns;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set color
     *
     * @param string|null $color
     * @return void
     */
    public function setColor(string|null $color): void
    {
        $this->color = $color;
    }

    /**
     * set hover
     *
     * @param bool|null $hover
     * @return void
     */
    public function setHover(bool|null $hover): void
    {
        $this->hover = $hover ?? false;
    }

    /**
     * set striped
     *
     * @param bool|null $striped
     * @return void
     */
    public function setStriped(bool|null $striped): void
    {
        $this->striped = $striped ?? false;
    }

    /**
     * set stripedColumns
     *
     * @param bool|null $stripedColumns
     * @return void
     */
    public function setStripedColumns(bool|null $stripedColumns): void
    {
        $this->stripedColumns = $stripedColumns ?? false;
    }
}
