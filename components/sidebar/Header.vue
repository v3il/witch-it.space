<template>
    <div class="wit-flex wit-flex--align-center wit-flex--justify-between wis-sidebar-header">
        <Logo class="wis-sidebar-header__logo" />
    </div>
</template>

<script setup>
import Logo from '~/components/sidebar/components/Logo'
</script>

<style scoped lang="scss">
.wis-sidebar-header {
    padding: var(--offset-md) var(--offset-md) 0;
    height: 5rem;
    margin-bottom: 32px;
}

.wis-sidebar-header__logo {
    height: 64px;
}
</style>
