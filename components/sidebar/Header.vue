<template>
  <div class="wit-flex wit-flex--align-center wit-flex--justify-between wis-sidebar-header">
    <Logo class="wis-sidebar-header__logo" />

    <div class="wit-flex wit-flex--align-center">
      <Notifications class="wit-offset-right--xsm" />
      <UserDropdown />
    </div>
  </div>
</template>

<script>
import { Logo, UserDropdown, Notifications } from './components'

export default {
    name: 'Header',

    components: {
        Logo,
        Notifications,
        UserDropdown
    }
}
</script>

<style scoped lang="scss">
.wis-sidebar-header {
    padding: var(--offset-sm) var(--offset-sm) var(--offset-sm) var(--offset-md);
}

.wis-sidebar-header__logo {
    width: 48px;
    height: auto;
}
</style>
