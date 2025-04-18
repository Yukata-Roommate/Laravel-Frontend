<?php

namespace YukataRm\Laravel\Frontend\Components\Layout;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Layout Pages Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Layout
 */
class Pages extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $pageTitle
     * @param bool|null $noIndex
     */
    public function __construct(string $pageTitle, bool|null $noIndex = null)
    {
        $this->setPageTitle($pageTitle);
        $this->setNoIndex($noIndex);
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
            "app-wrapper",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * page title
     *
     * @var string
     */
    public string $pageTitle;

    /**
     * no index
     *
     * @var bool
     */
    public bool $noIndex;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set page title
     *
     * @param string $pageTitle
     * @return void
     */
    protected function setPageTitle(string $pageTitle): void
    {
        $this->pageTitle = $pageTitle;
    }

    /**
     * set no index
     *
     * @param bool|null $noIndex
     * @return void
     */
    protected function setNoIndex(bool|null $noIndex): void
    {
        $this->noIndex = $noIndex ?? true;
    }
}
