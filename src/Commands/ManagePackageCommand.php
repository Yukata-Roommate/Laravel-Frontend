<?php

namespace YukataRm\Laravel\Frontend\Commands;

use YukataRm\Laravel\Command\ManageShellCommand;

/**
 * Manage Package Command
 *
 * @package YukataRm\Laravel\Frontend\Commands
 */
class ManagePackageCommand extends ManageShellCommand
{
    /**
     * command signature
     *
     * @var string
     */
    protected $signature = "frontend:package";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Manage NPM packages";

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
     * run command process
     *
     * @return array<mixed>
     */
    protected function process(): array
    {
        $this->manageNpmPackages();

        return [];
    }

    /**
     * manage npm packages
     *
     * @return void
     */
    protected function manageNpmPackages(): void
    {
        $this->outputInfo("Manage NPM packages.");

        $this->npmInstallPackage("sass", true);

        $this->npmInstallPackage("typescript", true);

        $this->npmInstallPackage("ts-loader", true);

        $this->npmInstallPackage("vite-plugin-checker", true);

        $this->npmInstallPackage("bootstrap");
        $this->npmInstallPackage("@types/bootstrap");

        $this->npmInstallPackage("admin-lte@4.0.0-beta3");

        $this->npmInstallPackage("@fontsource/source-sans-3");

        $this->npmInstallPackage("bootstrap-icons");

        $this->npmInstallPackage("crypto-js");
        $this->npmInstallPackage("@types/crypto-js");

        $this->npmRun("build");
    }
}
