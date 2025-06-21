<?php

namespace YukataRm\Laravel\Frontend\Components;

use YukataRm\Laravel\Frontend\Components\BaseComponent;

/**
 * Markdown Component
 *
 * @package YukataRm\Laravel\Frontend\Components
 */
class Markdown extends BaseComponent
{
    /*----------------------------------------*
     * Constructor
     *----------------------------------------*/

    /**
     * constructor
     *
     * @param string $markdown
     */
    public function __construct(string $markdown)
    {
        $this->setMarkdown($markdown);
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
            "markdown-landmark",
        ];

        return array_merge(parent::mergeAttributes(), [
            "class" => implode(" ", $class),
        ]);
    }

    /*----------------------------------------*
     * Property
     *----------------------------------------*/

    /**
     * markdown text
     *
     * @var string
     */
    public string $markdown;

    /*----------------------------------------*
     * Method
     *----------------------------------------*/

    /**
     * set markdown text
     *
     * @param string $markdown
     * @return void
     */
    protected function setMarkdown(string $markdown): void
    {
        $this->markdown = $markdown;
    }
}
