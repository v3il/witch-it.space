<template>
    <div class="flex justify-content-end align-items-center wis-search">
        <div class="p-input-icon-right p-input-icon-left mr-3">
            <i class="pi pi-search" />
            <i class="pi pi-times cursor-pointer" @click="resetQuery" />
            <InputText
                :value="searchQuery"
                type="text"
                :placeholder="$t('SearchProfile')"
                class="wis-search__input"
                @input="triggerSearch"
            />
        </div>

        <Button class="flex-0 wis-search__button" @click="openFilters">
            {{ $t('Filter') }}
        </Button>
    </div>
</template>

<script setup>
import { debounce } from 'lodash'

const { $t } = useTranslate()

const { filterStore, openFilters } = useFilters()
const searchQuery = computed(() => filterStore.filter.query)

const resetQuery = () => filterStore.resetFilterProp('query')

const triggerSearch = debounce((event) => {
    filterStore.updateFilterProp('query', event.target.value)
}, 300)
</script>

<style scoped lang="scss">
.wis-search__input {
    max-width: 280px;
    width: 100%;
}

.wis-search__button {
    border-radius: 6px;
}
</style>
