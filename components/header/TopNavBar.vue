<template>
  <header v-if="true" class="wis-header">
    <BurgerButton class="wis-header__burger" @click="onBurgerClick" />

    <div v-if="isAuthorized" class="wit-offset-left--auto wit-flex wit-flex--align-center">
      <!--      <LocaleSwitcher />-->
      <!--      <ThemeSwitcher />-->
      <Notifications class="wit-offset-right--xsm" />
      <UserDropdown />
    </div>
  </header>

<!--  <b-navbar v-else class="wiz-header" :class="headerClass">-->
<!--    <template #brand>-->
<!--      <b-navbar-item>-->
<!--        <slot name="brand" />-->
<!--      </b-navbar-item>-->
<!--    </template>-->

<!--    <template #start>-->
<!--      <slot name="topMenu" />-->

<!--      <div v-if="user" class="wit-flex wit-flex&#45;&#45;column wit-flex&#45;&#45;align-start bbbb">-->
<!--        <b-button-->
<!--          v-for="link in links"-->
<!--          :key="link.to"-->
<!--          type="is-ghost"-->
<!--          class="wit-transition wit-link"-->
<!--          :to="link.to"-->
<!--          tag="nuxt-link"-->
<!--          @click.native="onLinkClick"-->
<!--        >-->
<!--          <b-icon size="is-small" class="is-size-4 wit-color&#45;&#45;Y400 wit-offset-right&#45;&#45;xs" :icon="link.icon" />-->
<!--          {{ $t(link.textId) }}-->
<!--        </b-button>-->
<!--      </div>-->
<!--    </template>-->

<!--    <template #end>-->
<!--      &lt;!&ndash;      <b-navbar-item tag="div" class="wit-header__locale-switcher wit-paddings&#45;&#45;none wiz-background&#45;&#45;transparent">&ndash;&gt;-->
<!--      &lt;!&ndash;        <LocaleSwitcher />&ndash;&gt;-->
<!--      &lt;!&ndash;      </b-navbar-item>&ndash;&gt;-->

<!--      <b-navbar-item tag="div" class="wit-header__theme-switcher wit-paddings&#45;&#45;none wiz-background&#45;&#45;transparent">-->
<!--        <ThemeSwitcher />-->
<!--      </b-navbar-item>-->

<!--      <b-navbar-item tag="div" class="wit-header__theme-switcher wit-paddings&#45;&#45;none wiz-background&#45;&#45;transparent">-->
<!--        <Notifications class="wit-offset-right&#45;&#45;xsm" />-->
<!--        &lt;!&ndash;        <UserDropdown />&ndash;&gt;-->
<!--      </b-navbar-item>-->

<!--      <b-navbar-item v-if="user" tag="div" class="wit-header__user-dropdown wit-paddings&#45;&#45;none wiz-background&#45;&#45;transparent">-->
<!--        <UserDropdown class="wit-offset-left&#45;&#45;none" />-->
<!--      </b-navbar-item>-->
<!--    </template>-->
<!--  </b-navbar>-->
</template>

<script>
import { computed, ref, useStore } from '@nuxtjs/composition-api'
import UserDropdown from '@/components/header/UserDropdown.vue'
import Notifications from '@/components/header/Notifications.vue'
import BurgerButton from '@/components/basic/BurgerButton.vue'

export default {
    name: 'TopNavBar',

    components: {
        UserDropdown,
        Notifications,
        BurgerButton
    },

    setup (_, { emit }) {
        const store = useStore()

        const isAuthorized = computed(() => store.getters['user/isAuthorized'])
        const onBurgerClick = () => emit('open-sidebar')

        return { isAuthorized, onBurgerClick }
    }

    // props: {
    //     sticky: {
    //         required: false,
    //         type: Boolean,
    //         default: false
    //     }
    // },

    // computed: {
    //     ...mapState(User.PATH, [
    //         User.State.USER
    //     ]),
    //
    //     headerClass () {
    //         return { 'wiz-header--sticky': this.sticky }
    //     }
    // },

    // created () {
    //     this.links = getNavbarLinks(this.user)
    // },
    //
    // methods: {
    //     onLinkClick () {
    //         document.body.click()
    //     }
    // }
}
</script>

<style scoped lang="scss">
.wis-header {
    display: flex;
    align-items: center;
    background-color: var(--dark-blue);
    min-height: var(--header-height);
    height: var(--header-height);
    padding: 0 24px;
    border-bottom: 1px solid var(--border-color);
    z-index: 10000;

    @media (max-width: 769px) {
        position: sticky;
        top: 0;
    }
}

.wis-header__burger {
    --button-ghost-color: var(--muted-text-color);
    --button-ghost-hover-color: #fff;
    --button-ghost-hover-decoration: none;

    @media (min-width: 1024px) {
        display: none !important;
    }
}

//.bbbb {
//    border-top: 1px solid rgb(58 68 91);
//    border-bottom: 1px solid rgb(58 68 91);
//    display: none;
//}
//
//.wit-link {
//    padding: 4px 20px;
//    width: 100%;
//    color: white;
//    justify-content: flex-start;
//    height: auto;
//    align-items: center;
//    text-decoration: none;
//
//    &:hover,
//    &.nuxt-link-exact-active {
//        background-color: rgba(239, 242, 247, 0.05);
//        color: white;
//        text-decoration: none;
//    }
//}
//
//@media screen and (max-width: 1023px) {
//    .wiz-header {
//        padding-right: 0;
//        padding-left: 0;
//    }
//
//    .wit-header__locale-switcher,
//    .wit-header__theme-switcher {
//        border-right: var(--default-border);
//    }
//
//    .wit-header__user-dropdown {
//        margin-left: auto;
//        border-left: var(--default-border);
//    }
//
//    .bbbb {
//        display: block;
//    }
//}
</style>
