<template>
  <header class="wit-transition wit-header">
    <div class="wit-flex wit-flex--justify-end wit-flex--align-center wit-block--full-height">
      <ThemeSwitcher />
      <LocaleSwitcher />
    </div>
  </header>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher,
        LocaleSwitcher
    }
}
</script>

<style scoped>
    .wit-header {
        background-color: var(--header-bg);
        height: 70px;
        position: sticky;
        padding: 0 var(--offset-sm);
        z-index: 50;
    }
</style>
