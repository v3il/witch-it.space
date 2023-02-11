<template>
    <header class="wis-header" :class="headerClasses">
        <Button class="p-button-link p-0 lg:hidden" @click="onBurgerClick">
            <Icon name="material-symbols:menu" size="28" />
        </Button>

        <div v-if="isAuthorized" class="ml-auto flex align-items-center">
            <!--      <LocaleSwitcher />-->
            <!--      <ThemeSwitcher />-->
            <Notifications />
            <UserDropdown />
        </div>
    </header>
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
