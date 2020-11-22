<template>
  <header class="wit-transition wit-header">
    <div class="wit-flex wit-flex--justify-end wit-flex--align-center wit-block--full-height">
      <ThemeSwitcher />
      <LocaleSwitcher />
      <UserDropdown v-if="user" class="wit-offset-left--none" />
    </div>
  </header>
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

<style scoped>
    .wit-header {
        background-color: var(--header-bg);
        height: 70px;
        position: sticky;
        padding: 0 var(--offset-sm);
        z-index: 50;
    }
</style>
