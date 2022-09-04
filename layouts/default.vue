<template>
  <div class="layout">
    <LeftNavBar class="layout__left" />

    <SidebarPanel from="left" hide-header :is-visible="isSidebarOpen" @close="closeSidebar">
      <LeftNavBar @link-clicked="closeSidebar" />
    </SidebarPanel>

    <div class="layout__right">
      <TopNavBar @open-sidebar="openSidebar" />
      <Nuxt class="wit-flex__item--grow" />
      <ConfirmPopup />
      <ScrollToTopButton />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ref } from '@nuxtjs/composition-api'
import { User, Theme } from '@/store'
import LeftNavBar from '@/components/sidebar/LeftNavBar.vue'
import ConfirmPopup from '@/components/basic/offers/ConfirmPopup.vue'
import TopNavBar from '@/components/header/TopNavBar.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import { SidebarPanel } from '@/components/basic/index.js'

export default {
    name: 'Default',

    components: {
        LeftNavBar,
        ConfirmPopup,
        TopNavBar,
        ScrollToTopButton,
        SidebarPanel
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
        this.$eventBus.$on('showNotification', ({ type, message }) => {
            this.$buefy.snackbar.open({
                message,
                type: 'is-' + type,
                duration: 5000
            })
        })
    },

    setup () {
        const isSidebarOpen = ref(false)

        const openSidebar = () => isSidebarOpen.value = true
        const closeSidebar = () => isSidebarOpen.value = false

        return { isSidebarOpen, openSidebar, closeSidebar }
    }
}
</script>

<style scoped lang="scss">
    .layout__left {
        //position: fixed;
        width: var(--left-navbar-width);
        background: var(--left-navbar-bg);
        border-right: 1px solid var(--border-color);
        height: 100vh;
    }

    .layout {
        display: flex;
    }

    .layout,
    .layout__right {
        min-height: 100vh;
    }

    .layout__right {
        display: flex;
        flex-direction: column;
        flex: 1;
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
