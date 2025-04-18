<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Nav Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Nav extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $itemsClass
     * @param string|null $contentsClass
     */
    public function __construct(string|null $itemsClass = null, string|null $contentsClass = null)
    {
        $this->setItemsClass($itemsClass);
        $this->setContentsClass($contentsClass);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * items class
     *
     * @var string
     */
    public string $itemsClass;

    /**
     * contents class
     *
     * @var string
     */
    public string $contentsClass;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set items class
     *
     * @param string|null $itemsClass
     * @return void
     */
    public function setItemsClass(string|null $itemsClass): void
    {
        $this->itemsClass = $itemsClass ?? "";
    }

    /**
     * set contents class
     *
     * @param string|null $contentsClass
     * @return void
     */
    public function setContentsClass(string|null $contentsClass): void
    {
        $this->contentsClass = $contentsClass ?? "";
    }
}
