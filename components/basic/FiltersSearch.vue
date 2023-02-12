<template>
    <div class="flex justify-content-end align-items-center wis-search">
        <InputText
            id="confirm-password"
            :value="searchQuery"
            type="text"
            :placeholder="$t('Login_PasswordInputPlaceholder')"
            class="w-full1 mr-3"
            @input="triggerSearch"
        />

        <!--    <b-input-->
        <!--      :value="searchQuery"-->
        <!--      maxlength="15"-->
        <!--      :has-counter="false"-->
        <!--      icon="magnify"-->
        <!--      icon-right="close"-->
        <!--      icon-right-clickable-->
        <!--      :placeholder="$t('Offers_SearchItem')"-->
        <!--      custom-class="wit-transition"-->
        <!--      class="wit-offset-right&#45;&#45;xs wis-search__input wis-input wis-input-right-icon"-->
        <!--      @icon-right-click="resetSearch"-->
        <!--      @input="triggerSearch"-->
        <!--    />-->

        <Button class="wis-btn--rounded wit-flex__item--no-shrink wis-search__button" @click="openFilters">
            {{ $t('Filter') }}
        </Button>
    </div>
</template>

<script setup>
import { debounce } from 'lodash'
import { useFiltersStore } from '~/store/filters'
// import { computed, useStore } from '@nuxtjs/composition-api'

const { $t } = useTranslate()

const filtersStore = useFiltersStore()

const searchQuery = computed(() => filtersStore.filter.query)

const triggerSearch = debounce((event) => {
    filtersStore.updateFilterProp('query', event.target.value)
}, 500)

const openFilters = () => {

}

// export default {
//     name: 'Search',
//
//     props: {
//         storeModule: {
//             required: true,
//             type: String
//         }
//     },
//
//     setup (props) {
//         const store = useStore()
//
//         const searchQuery = computed(() => store.state[props.storeModule].filters.query)
//         const openFilters = () => store.dispatch(props.storeModule + '/openFilters')
//         const resetSearch = () => store.dispatch(props.storeModule + '/resetFilterParam', 'query')
//
//         const triggerSearch = debounce((query) => {
//             store.dispatch(props.storeModule + '/mergeFilters', { query })
//         }, 500)
//
//         return { openFilters, triggerSearch, resetSearch, searchQuery }
//     }
// }
</script>

<style scoped lang="scss">
.wis-search {
    //padding: 24px;
}

.wis-search__input {
    max-width: 280px;
    width: 100%;
}

.wis-search__button {
    border-radius: 6px;
}
</style>
