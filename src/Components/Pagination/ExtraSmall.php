<?php

namespace YukataRm\Laravel\Frontend\Components\Pagination;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Pagination Extra Small Component
 *
 * @package YukataRm\Laravel\Frontend\Components\Pagination
 */
class ExtraSmall extends BaseComponent
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
     * on first page
     *
     * @var bool
     */
    public bool $onFirstPage;

    /**
     * first page url
     *
     * @var string
     */
    public string $firstPageUrl;

    /**
     * previous page url
     *
     * @var string|null
     */
    public string|null $previousPageUrl;

    /**
     * on last page
     *
     * @var bool
     */
    public bool $onLastPage;

    /**
     * last page url
     *
     * @var string
     */
    public string $lastPageUrl;

    /**
     * next page url
     *
     * @var string|null
     */
    public string|null $nextPageUrl;

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
        $this->onFirstPage     = $paginator->onFirstPage();
        $this->firstPageUrl    = $paginator->url(1);
        $this->previousPageUrl = $paginator->previousPageUrl();

        $this->onLastPage  = !$paginator->hasMorePages();
        $this->lastPageUrl = $paginator->url($paginator->lastPage());
        $this->nextPageUrl = $paginator->nextPageUrl();
    }
}
