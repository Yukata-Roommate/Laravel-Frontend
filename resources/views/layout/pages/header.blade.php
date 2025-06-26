<nav class="app-header navbar navbar-expand bg-body sticky-top">
    <div class="container-fluid">
        <x-yukata-rm::layout.pages.header.navbar>
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center" data-lte-toggle="sidebar" role="button">
                    <i class="bi bi-list"></i>
                </a>
            </li>

            @isset($navbar)
                {{ $navbar }}
            @endisset
        </x-yukata-rm::layout.pages.header.navbar>

        <x-yukata-rm::layout.pages.header.usermenu>
            @isset($usermenu)
                {{ $usermenu }}
            @endisset
        </x-yukata-rm::layout.pages.header.usermenu>
    </div>
</nav>
