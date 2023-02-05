<template>
    <div class="layout">
        <LeftNavBar class="layout__left" />

        <SidebarPanel from="left" hide-header :is-visible="isSidebarOpen" @close="closeSidebar" @drawer-clicked="closeSidebar">
            <LeftNavBar />
        </SidebarPanel>

        <div class="layout__right min-h-full">
            <TopNavBar @open-sidebar="openSidebar" />

            <slot class="wit-flex__item--grow" />
            <!--            <ConfirmPopup />-->
            <ScrollToTopButton />
        </div>
    </div>
</template>

<script setup>
import LeftNavBar from '~/components/sidebar/LeftNavBar'
import SidebarPanel from '~/components/basic/SidebarPanel'
import TopNavBar from '~/components/header/TopNavBar'

const isSidebarOpen = ref(false)

const openSidebar = () => (isSidebarOpen.value = true)
const closeSidebar = () => (isSidebarOpen.value = false)

useHead({
    bodyAttrs: {
        class: 'body body--dark'
    }

    // link: [
    //     { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inter:wght@100,500,600,700,800,900|Roboto:400,500|Sarabun:400,600,700&display=swap' }
    // ]
})
</script>

<style scoped lang="scss">
.layout__left {
    //position: fixed;
    width: var(--left-navbar-width);
    background: var(--left-navbar-bg);
    border-right: 1px solid var(--border-color);
    height: 100vh;
    position: sticky;
    top: 0;
}

.layout {
    display: flex;
}

.layout,
.layout__right {
    //min-height: 100%;
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
