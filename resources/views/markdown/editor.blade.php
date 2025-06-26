<x-yukata-rm::form.group class="markdown-editor">
    <div class="markdown-editor__header">
        <label class="header__title" for="{{ $id }}">{{ $label }}</label>

        <button type="button" class="header__button markdown-preview-button" source="{{ $id }}">
            <i class="bi bi-eye"></i>
        </button>
    </div>

    <textarea id="{{ $id }}" {{ $attributes->merge($merge) }} @required($isRequired) preview="{{ $previewId }}">{{ $value }}</textarea>
</x-yukata-rm::form.group>
