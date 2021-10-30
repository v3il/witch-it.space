<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img class="login-page__image" src="images/hey.png" alt="Hey!">
      </b-navbar-item>
    </template>
    <template v-if="user" #start>
      <b-navbar-item
        v-for="link in $options.links"
        :key="link.to"
        :to="link.to"
        tag="nuxt-link"
        :class="getLinkClasses(link)"
        class="wit-transition"
      >
        {{ $t(link.textId) }}
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <ThemeSwitcher />
        <LocaleSwitcher />
        <UserDropdown v-if="user" class="wit-offset-left--none" />
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
.wit-header {
    background-color: var(--header-bg);
    height: 70px;
    position: sticky;
    padding: 0 var(--offset-sm);
    z-index: 50;
    //overflow-x: hidden;
}

.navbar-item {
    &.active,
    &:active,
    &:focus,
    &:hover {
        color: white;
        text-decoration: none;
        background-color: var(--locale-switcher-hover-background);
    }
}

.wit-header__menu-item {
    height: 100%;
    padding: 0 var(--offset-sm);
}

.wit-header__menu-link {
    //display: block;
    //height: 100%;
}
</style>
