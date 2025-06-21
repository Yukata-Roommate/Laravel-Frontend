<?php

namespace YukataRm\Laravel\Frontend\Components\Layout\Pages\Header;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Layout Pages Header Usermenu Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Layout\Pages\Header
 */
class Usermenu extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     */
    public function __construct()
    {
        $this->setUserName();
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * user name
     *
     * @var string
     */
    public string $userName;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set user name
     *
     * @return void
     */
    protected function setUserName(): void
    {
        $this->userName = $this->isLoggedIn() ? $this->user()->name : "Guest";
    }
}
