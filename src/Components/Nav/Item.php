<?php

namespace YukataRm\Laravel\Frontend\Components\Nav;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Nav Item Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Nav
 */
class Item extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $key
     * @param bool $active
     */
    public function __construct(string $key, bool $active)
    {
        $this->setKey($key);
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
        $class = [
            "nav-item",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "role"  => "presentation",
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * id
     *
     * @var string
     */
    public string $id;

    /**
     * aria controls
     *
     * @var string
     */
    public string $ariaControls;

    /**
     * class
     *
     * @var string
     */
    public string $class;

    /**
     * aria selected
     *
     * @var string
     */
    public string $ariaSelected;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set key
     *
     * @param string $key
     * @return void
     */
    protected function setKey(string $key): void
    {
        $this->id           = $this->navItemId($key);
        $this->ariaControls = $this->navContentId($key);
    }

    /**
     * get nav item id
     *
     * @param string $key
     * @return string
     */
    protected function navItemId(string $key): string
    {
        return "nav-item-{$key}";
    }

    /**
     * get nav content id
     *
     * @param string $key
     * @return string
     */
    protected function navContentId(string $key): string
    {
        return "nav-content-{$key}";
    }

    /**
     * set active
     *
     * @param bool $active
     * @return void
     */
    protected function setActive(bool $active): void
    {
        $this->class        = $active ? "nav-link active" : "nav-link";
        $this->ariaSelected = $active ? "true" : "false";
    }
}
