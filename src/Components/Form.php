<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Form extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $method
     * @param bool|null $csrf
     * @param bool|null $hasFile
     * @param bool|null $isHidden
     * @param bool|null $blank
     */
    public function __construct(
        string $method,
        bool|null $csrf = null,
        bool|null $hasFile = null,
        bool|null $isHidden = null,
        bool|null $blank = null,
    ) {
        $this->setMethod($method);
        $this->setCsrf($csrf);
        $this->setHasFile($hasFile);
        $this->setIsHidden($isHidden);
        $this->setBlank($blank);
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
        $attributes = [];

        $attributes["method"] = match ($this->isMethodCompatible) {
            true  => $this->method,
            false => "post",
        };

        if ($this->hasFile) $attributes["enctype"] = "multipart/form-data";

        if ($this->isHidden) $attributes["class"] = "d-none";

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
     * method
     *
     * @var string
     */
    public string $method;

    /**
     * is method compatible
     *
     * @var bool
     */
    public bool $isMethodCompatible;

    /**
     * csrf
     *
     * @var bool
     */
    public bool $csrf;

    /**
     * has file
     *
     * @var bool
     */
    public bool $hasFile;

    /**
     * is hidden
     *
     * @var bool
     */
    public bool $isHidden;

    /**
     * target blank
     *
     * @var bool
     */
    public bool $blank;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set method
     *
     * @param string $method
     * @return void
     */
    protected function setMethod(string $method): void
    {
        $this->method             = $method;
        $this->isMethodCompatible = match ($method) {
            "get"   => true,
            "post"  => true,
            default => false,
        };
    }

    /**
     * set csrf
     *
     * @param bool|null $csrf
     * @return void
     */
    protected function setCsrf(bool|null $csrf): void
    {
        $this->csrf = $csrf ?? true;
    }

    /**
     * set has file
     *
     * @param bool|null $hasFile
     * @return void
     */
    protected function setHasFile(bool|null $hasFile): void
    {
        $this->hasFile = $hasFile ?? false;
    }

    /**
     * set is hidden
     *
     * @param bool|null $isHidden
     * @return void
     */
    public function setIsHidden(bool|null $isHidden): void
    {
        $this->isHidden = $isHidden ?? false;
    }

    /**
     * set target blank
     *
     * @param bool|null $blank
     * @return void
     */
    protected function setBlank(bool|null $blank): void
    {
        $this->blank = $blank ?? false;
    }
}
