<template>
  <header class="wit-transition wit-header wit-flex wit-flex--justify-between">
    <img class="login-page__image" src="images/hey.png" alt="Hey!">

    <ul v-if="user" class="wit-flex wit-flex--align-center wit-header__menu">
      <li v-for="link in $options.links" :key="link.to" class="wit-header__menu-item" :class="getLinkClasses(link)">
        <nuxt-link :to="link.to" class="wit-flex wit-flex--center wit-color--white wit-header__menu-link wit-block--full-height">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">{{ $t(link.textId) }}</span>
        </nuxt-link>
      </li>
    </ul>

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

.wit-header__menu-item {
    height: 100%;
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

.wit-header__menu-link {
    //display: block;
    //height: 100%;
}
</style>
