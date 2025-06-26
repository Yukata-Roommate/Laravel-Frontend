<?php

namespace YukataRm\Laravel\Frontend\Commands;

use YukataRm\Laravel\Command\PublishStubsCommand as BaseCommand;

/**
 * Publish Stubs Command
 *
 * @package YukataRm\Laravel\Frontend\Commands
 */
class PublishStubsCommand extends BaseCommand
{
    /**
     * command signature
     *
     * @var string
     */
    protected $signature = "frontend:publish";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Publish frontend resources";

    /*----------------------------------------*
     * Parameter
     *----------------------------------------*/

    /**
     * set parameter
     *
     * @return void
     */
    protected function setParameter(): void {}

    /*----------------------------------------*
     * Process
     *----------------------------------------*/

    /**
     * assets name
     *
     * @var string
     */
    protected string $assetsName = "frontend";

    /**
     * stubs directory path
     *
     * @var string
     */
    protected string $stubsDirectory = __DIR__ . "/../../stubs";
}
