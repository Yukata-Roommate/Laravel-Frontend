<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\View\Component\BaseComponent as Component;

/**
 * Base Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
abstract class BaseComponent extends Component
{
    /*----------------------------------------*
     * Required
     *----------------------------------------*/

    /**
     * get component
     *
     * @return string
     */
    protected function component(): string
    {
        return "yr-frontend::" . $this->componentKey();
    }

    /**
     * get component key
     *
     * @return string
     */
    protected function componentKey(): string
    {
        $class = str_replace("YukataRm\\Laravel\\Frontend\\Components\\", "", static::class);

        $component = str_replace("\\", ".", ltrim($class, "\\"));

        $kebab = strtolower(preg_replace("/(?<!^)[A-Z]/", "-$0", $component));

        return str_replace(".-", ".", $kebab);
    }
}
