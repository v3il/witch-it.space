<template>
  <b-navbar class="wiz-header">
    <template #brand>
      <b-navbar-item class="wit-paddings--none wit-font-size--sm">
        <slot name="brand" />
      </b-navbar-item>
    </template>

    <template #start>
      <slot name="topMenu" />
    </template>

    <template #end>
      <b-navbar-item tag="div" class="wit-header__locale-switcher wit-paddings--none wiz-background--transparent">
        <LocaleSwitcher />
      </b-navbar-item>

      <b-navbar-item tag="div" class="wit-header__theme-switcher wit-paddings--none wiz-background--transparent">
        <ThemeSwitcher />
      </b-navbar-item>

      <b-navbar-item v-if="user" tag="div" class="wit-header__user-dropdown wit-paddings--none wiz-background--transparent">
        <UserDropdown class="wit-offset-left--none" />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { User } from '@/store'
import UserDropdown from '@/components/UserDropdown'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher,
        LocaleSwitcher,
        UserDropdown
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ])
    }
}
</script>

<style scoped lang="scss">
.wiz-header {
    background-color: var(--header-bg);
    min-height: var(--header-height);
    height: var(--header-height);
    padding: 0 var(--offset-md);
    position: sticky;
    top: 0;
}

@media screen and (max-width: 1024px) {
    .wiz-header {
        padding: 0;
    }

    .wit-header__locale-switcher,
    .wit-header__theme-switcher {
        border-right: var(--default-border);
    }

    .wit-header__user-dropdown {
        margin-left: auto;
        border-left: var(--default-border);
    }
}
</style>
