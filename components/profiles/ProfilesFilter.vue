<template>
    <SidebarPanel :is-visible="isFiltersOpen" from="right" icon="filter" :title="$t('Filter')" @close="closeFilters">
        <div class="p-4">
            <SortsSelector
                class="pt-2 pb-4 mb-4 border-bottom-default"
                :sorts="sorts"
                :available-sorts="availableSorts"
                @update-order-by="updateOrderBy($event)"
                @toggle-order="toggleOrder"
                @reset-sorts="resetSortParams"
            />

            <Button class="bg-danger border-danger p-button-sm w-full justify-content-center" @click="fullReset">
                {{ $t('Clear') }}
            </Button>
        </div>
    </SidebarPanel>
</template>

<script setup>
const { $t } = useTranslate()

const {
    updateOrderBy,
    toggleOrder,
    resetSortParams,
    fullReset,
    closeFilters,
    sorts,
    isFiltersOpen
} = useFilters()

const availableSorts = [
    { value: 'marketSize', label: $t('Profiles_Sort_Market') },
    { value: 'name', label: $t('Profiles_Sort_Name') },
    { value: 'wishlistSize', label: $t('Profiles_Sort_Wishlist') }
]
</script>

<style scoped lang="scss">
.wis-wishlist-filters__search {
    display: none;
}

@media (max-width: 1200px) {
    .wis-wishlist-filters__search {
        display: flex;
    }
}
</style>
