<?php

namespace YukataRm\Laravel\Frontend\Components\Table;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Table Row Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Table
 */
class Row extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param bool|null $active
     */
    public function __construct(bool|null $active = null)
    {
        $this->setActive($active);
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
        $attributes = $this->getDefaultMergeAttributes();

        return array_merge(parent::mergeAttributes(), $attributes);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * active
     *
     * @var bool
     */
    public bool $active;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * get default merge attributes
     *
     * @return array<string, mixed>
     */
    protected function getDefaultMergeAttributes(): array
    {
        return $this->active ? ["class" => "table-active"] : [];
    }

    /**
     * set active
     *
     * @param bool|null $active
     * @return void
     */
    protected function setActive(bool|null $active): void
    {
        $this->active = $active ?? false;
    }
}
