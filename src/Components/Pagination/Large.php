<?php

namespace YukataRm\Laravel\Frontend\Components\Pagination;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

/**
 * Pagination Large Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Pagination
 */
class Large extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param \Illuminate\Pagination\LengthAwarePaginator $paginator
     */
    public function __construct(LengthAwarePaginator $paginator)
    {
        $this->setPaginator($paginator);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * links
     *
     * @var \Illuminate\Support\Collection<array<string, mixed>>
     */
    public Collection $links;

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
        $this->links = $paginator->linkCollection();
    }
}
