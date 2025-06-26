<?php

namespace YukataRm\Laravel\Frontend\Components\Form\Select;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Select Option Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form\Select
 */
class Option extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $label
     * @param bool|null $isSelected
     */
    public function __construct(
        string $label,
        bool|null $isSelected = null,
    ) {
        $this->setLabel($label);
        $this->setIsSelected($isSelected);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * label
     *
     * @var string
     */
    public string $label;

    /**
     * is selected
     *
     * @var bool
     */
    public bool $isSelected;

    /*----------------------------------------*
     * Methods
     *----------------------------------------*/

    /**
     * set label
     *
     * @param string $label
     * @return void
     */
    protected function setLabel(string $label): void
    {
        $this->label = $label;
    }

    /**
     * set is selected
     *
     * @param bool|null $isSelected
     * @return void
     */
    protected function setIsSelected(bool|null $isSelected): void
    {
        $this->isSelected = $isSelected ?? false;
    }
}
