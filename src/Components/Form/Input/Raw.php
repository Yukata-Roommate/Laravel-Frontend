<?php

namespace YukataRm\Laravel\Frontend\Components\Form\Input;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Input Raw Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form\Input
 */
class Raw extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string|null $type
     * @param bool|null $isRequired
     * @param bool|null $isDisabled
     * @param bool|null $isReadonly
     */
    public function __construct(
        string|null $type = null,
        bool|null $isRequired = null,
        bool|null $isDisabled = null,
        bool|null $isReadonly = null,
    ) {
        $this->setType($type);
        $this->setIsRequired($isRequired);
        $this->setIsDisabled($isDisabled);
        $this->setIsReadonly($isReadonly);
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
            "form-control",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "type"  => $this->type,
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * type
     *
     * @var string
     */
    public string $type;

    /**
     * is required
     *
     * @var bool
     */
    public bool $isRequired;

    /**
     * is disabled
     *
     * @var bool
     */
    public bool $isDisabled;

    /**
     * is readonly
     *
     * @var bool
     */
    public bool $isReadonly;

    /*----------------------------------------*
     * Methods
     *----------------------------------------*/

    /**
     * set type
     *
     * @param string|null $type
     * @return void
     */
    protected function setType(string|null $type): void
    {
        $this->type = $type ?? "text";
    }

    /**
     * set is required
     *
     * @param bool|null $isRequired
     * @return void
     */
    protected function setIsRequired(bool|null $isRequired): void
    {
        $this->isRequired = $isRequired ?? false;
    }

    /**
     * set is disabled
     *
     * @param bool|null $isDisabled
     * @return void
     */
    protected function setIsDisabled(bool|null $isDisabled): void
    {
        $this->isDisabled = $isDisabled ?? false;
    }

    /**
     * set is readonly
     *
     * @param bool|null $isReadonly
     * @return void
     */
    protected function setIsReadonly(bool|null $isReadonly): void
    {
        $this->isReadonly = $isReadonly ?? false;
    }
}
