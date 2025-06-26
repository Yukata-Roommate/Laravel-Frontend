<ul class="navbar-nav ms-auto">
    <li class="nav-item dropdown user-menu">
        <a class="nav-link dropdown-toggle cursor-pointer" data-bs-toggle="dropdown">
            <span class="d-inline">
                {{ $userName }}
            </span>
        </a>

        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end" style="width: 350px;">
            @if ($slot->isNotEmpty())
                <li class="user-footer d-flex flex-column">
                    {{ $slot }}
                </li>
            @endif
        </ul>
    </li>
</ul>
