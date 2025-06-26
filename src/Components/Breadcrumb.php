<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Breadcrumb Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Breadcrumb extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $title
     * @param string $url
     */
    public function __construct(string $title, string $url)
    {
        $this->setTitle($title);
        $this->setUrl($url);
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
            "breadcrumb-item",
        ];

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
     * url
     *
     * @var string
     */
    public string $url;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set title
     *
     * @param string $title
     * @return void
     */
    protected function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * set url
     *
     * @param string|null $url
     * @return void
     */
    protected function setUrl(string|null $url): void
    {
        $this->url = $url;
    }
}
