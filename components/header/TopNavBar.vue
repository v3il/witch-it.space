<template>
    <header class="wis-header" :class="headerClasses">
        <Button class="p-button-link p-0 lg:hidden" @click="onBurgerClick">
            <Icon name="material-symbols:menu" size="28" />
        </Button>

        <div v-if="isAuthorized" class="ml-auto flex align-items-center">
            <!--      <LocaleSwitcher />-->
            <!--      <ThemeSwitcher />-->
            <Notifications class="mr-1" />
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

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'

const store = useCurrentUserStore()

const emit = defineEmits(['open-sidebar'])

const isAuthorized = computed(() => store.isAuthorized)

const headerClasses = computed(() => ({ 'wis-header--empty': !isAuthorized.value }))

const onBurgerClick = () => emit('open-sidebar')
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

.wis-header--empty {
    @media (min-width: 1024px) {
        display: none !important;
    }
}
</style>
