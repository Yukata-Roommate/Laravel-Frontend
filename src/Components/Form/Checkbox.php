<?php

namespace YukataRm\Laravel\Frontend\Components\Form;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Checkbox Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form
 */
class Checkbox extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $id
     * @param string $label
     * @param bool|null $isChecked
     * @param bool|null $isRequired
     * @param bool|null $isDisabled
     * @param bool|null $isInline
     * @param bool|null $isSwitch
     * @param bool|null $isReverse
     */
    public function __construct(
        string $id,
        string $label,
        bool|null $isChecked = null,
        bool|null $isRequired = null,
        bool|null $isDisabled = null,
        bool|null $isInline = null,
        bool|null $isSwitch = null,
        bool|null $isReverse = null,
    ) {
        $this->setId($id);
        $this->setLabel($label);
        $this->setIsChecked($isChecked);
        $this->setIsRequired($isRequired);
        $this->setIsDisabled($isDisabled);
        $this->setIsInline($isInline);
        $this->setIsSwitch($isSwitch);
        $this->setIsReverse($isReverse);

        $this->setCheckClass();
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
            "form-check-input",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
            "type"  => "checkbox",
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
     * label
     *
     * @var string
     */
    public string $label;

    /**
     * is checked
     *
     * @var bool
     */
    public bool $isChecked;

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
     * is inline
     *
     * @var bool
     */
    public bool $isInline;

    /**
     * is switch
     *
     * @var bool
     */
    public bool $isSwitch;

    /**
     * is reverse
     *
     * @var bool
     */
    public bool $isReverse;

    /**
     * check class
     *
     * @var string
     */
    public string $checkClass;

    /*----------------------------------------*
     * Methods
     *----------------------------------------*/

    /**
     * set id
     *
     * @param string $id
     * @return void
     */
    protected function setId(string $id): void
    {
        $this->id = $id;
    }

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
     * set is checked
     *
     * @param bool|null $isChecked
     * @return void
     */
    protected function setIsChecked(bool|null $isChecked): void
    {
        $this->isChecked = $isChecked ?? false;
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
     * set is inline
     *
     * @param bool|null $isInline
     * @return void
     */
    protected function setIsInline(bool|null $isInline): void
    {
        $this->isInline = $isInline ?? false;
    }

    /**
     * set is switch
     *
     * @param bool|null $isSwitch
     * @return void
     */
    protected function setIsSwitch(bool|null $isSwitch): void
    {
        $this->isSwitch = $isSwitch ?? false;
    }

    /**
     * set is reverse
     *
     * @param bool|null $isReverse
     * @return void
     */
    protected function setIsReverse(bool|null $isReverse): void
    {
        $this->isReverse = $isReverse ?? false;
    }

    /**
     * set check class
     *
     * @return void
     */
    protected function setCheckClass(): void
    {
        $checkClass = "form-check mb-3";

        if ($this->isInline) $checkClass .= " form-check-inline";

        if ($this->isSwitch) $checkClass .= " form-switch";

        if ($this->isReverse) $checkClass .= " form-check-reverse";

        $this->checkClass = $checkClass;
    }
}
