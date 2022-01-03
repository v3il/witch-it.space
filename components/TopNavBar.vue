<template>
  <b-navbar class="wiz-header">
    <template #brand>
      <b-navbar-item class="wit-font-size--sm">
        <slot name="brand" />
      </b-navbar-item>
    </template>

    <template #start>
      <slot name="topMenu" />

      <div v-if="user" class="wit-flex wit-flex--column wit-flex--align-start bbbb">
        <b-button
          v-for="link in links"
          :key="link.to"
          type="is-ghost"
          class="wit-transition wit-link"
          :to="link.to"
          tag="nuxt-link"
        >
          <b-icon size="is-small" class="is-size-4 wit-color--Y400 wit-offset-right--xs" :icon="link.icon" />
          {{ $t(link.textId) }}
        </b-button>
      </div>
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
import { getNavbarLinks } from '@/shared'

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
    },

    created () {
        this.links = getNavbarLinks(this.user)
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

.bbbb {
    border-top: 1px solid rgb(58 68 91);
    border-bottom: 1px solid rgb(58 68 91);
    display: none;
}

.wit-link {
    padding: 4px 20px;
    width: 100%;
    color: white;
    justify-content: flex-start;
    height: auto;
    align-items: center;
    text-decoration: none;

    &:hover,
    &.nuxt-link-exact-active {
        background-color: rgba(239, 242, 247, 0.05);
        color: white;
        text-decoration: none;
    }
}

@media screen and (max-width: 1023px) {
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

    .bbbb {
        display: block;
    }
}
</style>
