<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Pagination Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Pagination extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param \Illuminate\Pagination\LengthAwarePaginator $paginator
     * @param bool|null $showResult
     */
    public function __construct(LengthAwarePaginator $paginator, bool|null $showResult = null)
    {
        $this->setPaginator($paginator);
        $this->setShowResult($showResult);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * paginator
     *
     * @var \Illuminate\Pagination\LengthAwarePaginator
     */
    public LengthAwarePaginator $paginator;

    /**
     * show result
     *
     * @var bool
     */
    public bool $showResult;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set paginator
     *
     * @param \Illuminate\Pagination\LengthAwarePaginator $paginator
     * @return void
     */
    protected function setPaginator(LengthAwarePaginator $paginator): void
    {
        $this->paginator = $paginator;
    }

    /**
     * set show result
     *
     * @param bool|null $showResult
     * @return void
     */
    protected function setShowResult(bool|null $showResult): void
    {
        $this->showResult = $showResult ?? true;
    }
}
