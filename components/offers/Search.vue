<template>
  <div class="wit-flex wit-flex--justify-end wis-offers-search">
    <b-input
      :value="searchQuery"
      maxlength="15"
      :has-counter="false"
      icon="magnify"
      icon-right="close"
      icon-right-clickable
      :placeholder="$t('Offers_SearchItem')"
      custom-class="wit-transition rounded"
      class="wit-offset-right--xs wis-offers-search__input wis-input"
      @icon-right-click="resetSearch"
      @input="triggerSearch"
    />

    <b-button type="is-transparent" class="wis-btn--rounded wit-flex__item--no-shrink" @click="openFilters">
      <i class="mdi mdi-filter mdi-20px wit-offset-right--xs wit-color--muted" />
      {{ $t('Offers_FilterItems') }}
    </b-button>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
    name: 'Search',

    props: {
        searchQuery: {
            required: true,
            type: String
        }
    },

    setup (_, { emit }) {
        const openFilters = () => emit('open')
        const resetSearch = () => emit('reset')
        const triggerSearch = debounce(value => emit('search', value), 250)

        return { openFilters, triggerSearch, resetSearch }
    }
}
</script>

<style scoped lang="scss">
.wis-offers-search {
    padding: 24px;
}

.wis-offers-search__input {
    max-width: 280px;
    width: 100%;
}
</style>
