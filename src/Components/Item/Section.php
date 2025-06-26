<?php

namespace YukataRm\Laravel\Frontend\Components\Item;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Item Section Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Item
 */
class Section extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $title
     * @param string|null $titleClass
     * @param string|null $size
     * @param string|null $color
     * @param bool|null $emphasis
     * @param bool|null $last
     */
    public function __construct(
        string $title,
        string|null $titleClass = null,
        string|null $size = null,
        string|null $color = null,
        bool|null $emphasis = null,
        bool|null $last = null,
    ) {
        $this->setTitle($title);
        $this->setTitleClass($titleClass, $size, $color, $emphasis);
        $this->setLast($last);
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
        $class = [];

        if (!$this->last) {
            $class[] = "border-3";
            $class[] = "border-bottom";
            $class[] = "pb-3";
            $class[] = "mb-3";
        }

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * title
     *
     * @var string
     */
    public string $title;

    /**
     * title class
     *
     * @var string
     */
    public string $titleClass;

    /**
     * last
     *
     * @var bool
     */
    public bool $last;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set title
     *
     * @param string $title
     * @return void
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * set title class
     *
     * @param string|null $titleClass
     * @param string|null $size
     * @param string|null $color
     * @param bool|null $emphasis
     * @return void
     */
    public function setTitleClass(string|null $titleClass, string|null $size, string|null $color, bool|null $emphasis): void
    {
        $sizeClass = $this->getSizeClass($size, $emphasis);

        $colorClass = $this->getColorClass($color, $emphasis);

        $this->titleClass = "{$titleClass} {$sizeClass} {$colorClass} mb-0";
    }

    /**
     * get size class
     *
     * @param string|null $size
     * @param bool|null $emphasis
     * @return string
     */
    protected function getSizeClass(string|null $size, bool|null $emphasis): string
    {
        $fontSizes = [
            "xxl" => "fs-1",
            "xl"  => "fs-2",
            "lg"  => "fs-3",
            "md"  => "fs-4",
            "sm"  => "fs-5",
            "xs"  => "fs-6",
        ];

        $headings = [
            "xxl" => "h1",
            "xl"  => "h2",
            "lg"  => "h3",
            "md"  => "h4",
            "sm"  => "h5",
            "xs"  => "h6",
        ];

        $sizeClasses = $emphasis ? $headings : $fontSizes;

        if (array_key_exists($size, $sizeClasses)) return $sizeClasses[$size];

        if (is_string($size)) return $size;

        return $emphasis ? "h2" : "fs-2";
    }

    /**
     * get color class
     *
     * @param string|null $color
     * @param bool|null $emphasis
     * @return string
     */
    protected function getColorClass(string|null $color, bool|null $emphasis): string
    {
        $colors = [
            "primary"        => "text-primary",
            "secondary"      => "text-secondary",
            "success"        => "text-success",
            "danger"         => "text-danger",
            "warning"        => "text-warning",
            "info"           => "text-info",
            "light"          => "text-light",
            "dark"           => "text-dark",
            "body"           => "text-body",
            "body-secondary" => "text-body-secondary",
            "body-tertiary"  => "text-body-tertiary",
            "black"          => "text-black",
            "white"          => "text-white",
            "black-50"       => "text-black-50",
            "white-50"       => "text-white-50",
        ];

        $emphasisColors = [
            "primary"   => "text-primary-emphasis",
            "secondary" => "text-secondary-emphasis",
            "success"   => "text-success-emphasis",
            "danger"    => "text-danger-emphasis",
            "warning"   => "text-warning-emphasis",
            "info"      => "text-info-emphasis",
            "light"     => "text-light-emphasis",
            "dark"      => "text-dark-emphasis",
            "body"      => "text-body-emphasis",
        ];

        $colorClasses = $emphasis ? $emphasisColors : $colors;

        if (array_key_exists($color, $colorClasses)) return $colorClasses[$color];

        if (is_string($color)) return $color;

        return $emphasis ? "text-body-emphasis" : "text-body";
    }

    /**
     * set last
     *
     * @param bool|null $last
     * @return void
     */
    public function setLast(bool|null $last): void
    {
        $this->last = $last ?? false;
    }
}
