<?php

namespace YukataRm\Laravel\Frontend\Components\Nav;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Nav Content Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Nav
 */
class Content extends BaseComponent
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
        return array_merge(parent::mergeAttributes(), [
            "id"              => $this->id,
            "class"           => $this->class,
            "aria-labelledby" => $this->ariaLabelledBy,
            "role"            => "tabpanel",
            "tabindex"        => 0,
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
     * class
     *
     * @var string
     */
    public string $class;

    /**
     * aria labelled by
     *
     * @var string
     */
    public string $ariaLabelledBy;

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
        $this->id             = $this->navContentId($key);
        $this->ariaLabelledBy = $this->navItemId($key);
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
        $this->class = $active ? "tab-pane fade active show" : "tab-pane fade";
    }
}
