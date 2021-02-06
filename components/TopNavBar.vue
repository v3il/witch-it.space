<template>
  <b-navbar class="wiz-header">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="wit-paddings--none">
        <img class="wiz-header__logo" src="images/hey.png" alt="Hey!">
      </b-navbar-item>
    </template>

    <template v-if="user" #start class="wiz-header__start">
      <b-navbar-item
        v-for="link in $options.links"
        :key="link.to"
        :to="link.to"
        tag="nuxt-link"
        :class="getLinkClasses(link)"
        class="wit-transition wiz-header__link"
      >
        {{ $t(link.textId) }}
      </b-navbar-item>
    </template>

    <template #end class="wiz-header__end">
      <b-navbar-item tag="div" class="wit-header__locale-switcher wit-paddings--none wiz-background--transparent">
        <LocaleSwitcher />
      </b-navbar-item>

      <b-navbar-item tag="div" class="wit-header__theme-switcher wit-paddings--none wiz-background--transparent">
        <ThemeSwitcher />
      </b-navbar-item>

      <!--      <b-navbar-item tag="div" class="wit-header__locale-switcher wit-paddings&#45;&#45;none wiz-background&#45;&#45;transparent">-->
      <!--        <SettingsLink />-->
      <!--      </b-navbar-item>-->

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
import { Routes } from '@/shared'
// import SettingsLink from '@/components/SettingsLink'

export default {
    name: 'TopNavBar',

    links: [
        { to: Routes.MAIN, textId: 'MainMenu_MyMarket', icon: '' },
        { to: Routes.WISHLIST, textId: 'MainMenu_MyWishlist', icon: '' },
        { to: Routes.PROFILES, textId: 'MainMenu_Profiles', icon: '' },
        { to: Routes.ITEMS, textId: 'MainMenu_Items', icon: '' },
        { to: Routes.QUESTS, textId: 'MainMenu_Quests', icon: '' }
    ],

    components: {
        ThemeSwitcher,
        LocaleSwitcher,
        UserDropdown
        // SettingsLink
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        activeLink () {
            return this.$options.links.find(({ to }) => to === this.$route.path)
        }
    },

    methods: {
        getLinkClasses (link) {
            return {
                active: link === this.activeLink
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wiz-header {
    background-color: var(--header-bg);
    height: var(--header-height);
    padding: 0 var(--offset-sm);
    position: sticky;
    top: 0;
}

.wiz-header__link {
    padding: 0 var(--offset-sm);

    &.active,
    &:active,
    &:focus,
    &:hover {
        color: white;
        text-decoration: none;
        background-color: var(--locale-switcher-hover-background);
    }
}

.wiz-header__logo {
    max-height: none;
}

@media screen and (max-width: 1024px) {
    .wiz-header {
        padding: 0;
    }

    .wiz-header__link {
        padding: var(--offset-xs) var(--offset-sm);
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
