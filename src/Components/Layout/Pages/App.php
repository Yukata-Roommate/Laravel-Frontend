<?php

namespace YukataRm\Laravel\Frontend\Components\Layout\Pages;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Layout Pages App Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Layout\Pages
 */
class App extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $pageTitle
     */
    public function __construct(string $pageTitle)
    {
        $this->setPageTitle($pageTitle);
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
}
