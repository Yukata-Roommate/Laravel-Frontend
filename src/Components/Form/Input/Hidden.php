<?php

namespace YukataRm\Laravel\Frontend\Components\Form\Input;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Input Hidden Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form\Input
 */
class Hidden extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param bool|null $isHidden
     */
    public function __construct(bool|null $isHidden = null)
    {
        $this->setIsHidden($isHidden ?? true);
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
        if (!$this->isHidden) return parent::mergeAttributes();

        return array_merge(parent::mergeAttributes(), [
            "type" => "hidden",
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * is hidden
     *
     * @var bool
     */
    public bool $isHidden;

    /*----------------------------------------*
     * Methods
     *----------------------------------------*/

    /**
     * set is hidden
     *
     * @param bool $isHidden
     * @return void
     */
    public function setIsHidden(bool $isHidden): void
    {
        $this->isHidden = $isHidden;
    }
}
