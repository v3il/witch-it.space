<template>
  <div class="wit-flex wit-flex--justify-end wis-search">
    <b-input
      :value="searchQuery"
      maxlength="15"
      :has-counter="false"
      icon="magnify"
      icon-right="close"
      icon-right-clickable
      :placeholder="$t('Offers_SearchItem')"
      custom-class="wit-transition"
      class="wit-offset-right--xs wis-search__input wis-input"
      @icon-right-click="resetSearch"
      @input="triggerSearch"
    />

    <b-button type="is-transparent" class="wis-btn--rounded wit-flex__item--no-shrink wis-search__button" @click="openFilters">
      {{ $t('Filter') }}
    </b-button>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { computed, useStore } from '@nuxtjs/composition-api'

export default {
    name: 'Search',

    props: {
        storeModule: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const store = useStore()

        const searchQuery = computed(() => store.state[props.storeModule].filters.query)
        const openFilters = () => store.dispatch(props.storeModule + '/openFilters')
        const resetSearch = () => store.dispatch(props.storeModule + '/resetFilterParam', 'query')

        const triggerSearch = debounce((query) => {
            store.dispatch(props.storeModule + '/mergeFilters', { query })
        }, 500)

        return { openFilters, triggerSearch, resetSearch, searchQuery }
    }
}
</script>

<style scoped lang="scss">
.wis-search {
    padding: 24px;
}

.wis-search__input {
    max-width: 280px;
    width: 100%;
}

.wis-search__button {
    border-radius: 6px;
}
</style>
