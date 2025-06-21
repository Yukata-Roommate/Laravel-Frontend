<?php

namespace YukataRm\Laravel\Frontend;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

use YukataRm\Laravel\Frontend\Commands\PublishStubsCommand;
use YukataRm\Laravel\Frontend\Commands\ManagePackageCommand;

use Illuminate\Support\Facades\Blade;

/**
 * Frontend Service Provider
 *
 * @package YukataRm\Laravel\Frontend
 */
class ServiceProvider extends BaseServiceProvider
{
    /*----------------------------------------*
     * Boot
     *----------------------------------------*/

    /**
     * boot
     *
     * @return void
     */
    public function boot(): void
    {
        $this->bootCommands();
        $this->bootLangs();
        $this->bootViews();
    }

    /**
     * boot commands
     *
     * @return void
     */
    protected function bootCommands(): void
    {
        if (!$this->app->runningInConsole()) return;

        $this->commands([
            PublishStubsCommand::class,
            ManagePackageCommand::class,
        ]);
    }

    /**
     * boot langs
     *
     * @return void
     */
    protected function bootLangs(): void
    {
        $path = __DIR__ . "/../langs";

        $this->loadTranslationsFrom($path, "yr-frontend");

        $this->publishes([
            $path => $this->app->langPath("vendor/yr-frontend"),
        ]);
    }

    /**
     * boot views
     *
     * @return void
     */
    protected function bootViews(): void
    {
        $this->loadViewsFrom(__DIR__ . "/../resources/views", "yr-frontend");

        Blade::componentNamespace("YukataRm\\Laravel\\Frontend\\Components", "yukata-rm");
    }
}
