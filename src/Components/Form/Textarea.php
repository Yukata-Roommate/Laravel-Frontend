<?php

namespace YukataRm\Laravel\Frontend\Components\Form;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Form Textarea Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Form
 */
class Textarea extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $id
     * @param string $label
     * @param string|int|null $value
     * @param int|null $rows
     * @param bool|null $isRequired
     * @param bool|null $isDisabled
     * @param bool|null $isReadonly
     */
    public function __construct(
        string $id,
        string $label,
        string|int|null $value = null,
        int|null $rows = null,
        bool|null $isRequired = null,
        bool|null $isDisabled = null,
        bool|null $isReadonly = null,
    ) {
        $this->setId($id);
        $this->setLabel($label);
        $this->setValue($value);
        $this->setRows($rows);
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
            "rows"  => $this->rows,
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
     * value
     *
     * @var string|int|null
     */
    public string|int|null $value;

    /**
     * rows
     *
     * @var int
     */
    public int $rows;

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
     * set value
     *
     * @param string|int|null $value
     * @return void
     */
    protected function setValue(string|int|null $value): void
    {
        $this->value = $value;
    }

    /**
     * set rows
     *
     * @param int|null $rows
     * @return void
     */
    protected function setRows(int|null $rows): void
    {
        $this->rows = $rows ?? 3;
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
