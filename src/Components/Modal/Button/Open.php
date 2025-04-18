<?php

namespace YukataRm\Laravel\Frontend\Components\Modal\Button;

use YukataRm\Laravel\Frontend\Components\Button;

/**
 * Modal Button Open Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Modal\Button
 */
class Open extends Button
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $modalId
     * @param string|null $color
     * @param bool|null $block
     * @param bool|null $small
     * @param bool|null $outline
     */
    public function __construct(
        string $modalId,
        string|null $color = null,
        bool|null $block = null,
        bool|null $small = null,
        bool|null $outline = null,
    ) {
        $this->setModalId($modalId);

        parent::__construct(
            $color ?? "info",
            "button",
            $block,
            $small,
            $outline,
        );
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
            "data-bs-toggle" => "modal",
            "data-bs-target" => "#{$this->modalId}",
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * modal id
     *
     * @var string
     */
    public string $modalId;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set modal id
     *
     * @param string $modalId
     * @return void
     */
    protected function setModalId(string $modalId): void
    {
        $this->modalId = $modalId;
    }
}
