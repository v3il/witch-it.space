<template>
    <div class="wit-flex wit-flex--align-center wit-block--full-width">
        <hr class="wit-block--full-width">

        <span class="wit-color--muted wit-flex__item--no-shrink wit-offset-left--sm wit-offset-right--sm">
            {{ $t('OrContinueWith') }}
        </span>

        <hr class="wit-block--full-width">
    </div>
</template>

<script setup>
const { $t } = useTranslate()
</script>
