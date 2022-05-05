<template>
  <div class="layout">
    <LeftNavBar v-if="user" :links="navbarLinks" class="layout__left" />

    <div class="layout__right">
      <Nuxt />
      <ConfirmPopup />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { User, Theme } from '@/store'
import { getNavbarLinks } from '@/shared'
import LeftNavBar from '@/components/sidebar/LeftNavBar.vue'
import ConfirmPopup from '@/components/basic/offers/ConfirmPopup.vue'

export default {
    name: 'Default',

    components: {
        LeftNavBar,
        ConfirmPopup
    },

    head () {
        return {
            bodyAttrs: {
                class: `body--${this.theme}`
            }
        }
    },

    computed: {
        ...mapState(Theme.PATH, [Theme.State.THEME]),
        ...mapState(User.PATH, [User.State.USER])
    },

    created () {
        this.navbarLinks = getNavbarLinks(this.user)

        this.$eventBus.$on('showNotification', ({ type, message }) => {
            this.$buefy.snackbar.open({
                message,
                type: 'is-' + type,
                duration: 5000
            })
        })
    }
}
</script>

<style scoped lang="scss">
    .layout__left {
        position: fixed;
        width: var(--left-navbar-width);
        background: var(--left-navbar-bg);
        height: 100vh;
    }

    .layout__left + .layout__right {
        margin-left: var(--left-navbar-width);
    }

    .layout__main {
        padding: 0 var(--offset-md) var(--offset-md);
    }

    @media screen and (max-width: 1024px) {
        .layout__main {
            padding: 0 var(--offset-sm) var(--offset-sm);
        }

        .layout__left {
            display: none;
        }

        .layout__right {
            margin-left: 0 !important;
        }
    }
</style>
