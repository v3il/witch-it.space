<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
    <b-input
      :value="filtersData.query"
      maxlength="20"
      :placeholder="$t('Profiles_SearchByUsername')"
      custom-class="wit-transition wit-block--full-width1"
      style="flex: 0 0 300px;"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="onQueryChange"
      @icon-right-click="clearQuery"
    />

    <div>
      <b-button
        type="is-ghost1"
        style="background-color: #2e3648; border: 1px solid #36394c;"
      >
        <b-icon class="is-size-5 wit-color--muted" icon="filter" style="color: #dbdbdb;" />
      </b-button>

      <!--      <b-switch :value="filtersData.isSteamGuarded" @input="onIsSteamGuardedChange">-->
      <!--        {{ $t('Profiles_SteamGuardedOnly') }}-->
      <!--      </b-switch>-->
    </div>

    <!--    <div class="wit-flex wit-flex&#45;&#45;wrap wit-profiles-filter__container">-->
    <!--      <div class="wit-profiles-filter__input-container wit-block&#45;&#45;full-width">-->
    <!--        -->
    <!--      </div>-->

    <!--      -->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
    name: 'ProfilesFilter',

    props: {
        filtersData: {
            required: true,
            type: Object
        }
    },

    methods: {
        onQueryChange (query) {
            this.updateFilters({ query })
        },

        onIsSteamGuardedChange (isSteamGuarded) {
            this.updateFilters({ isSteamGuarded })
        },

        clearQuery () {
            this.updateFilters({ query: '' })
        },

        updateFilters (updatedFilters) {
            this.$emit('change', {
                ...this.filtersData,
                ...updatedFilters
            })
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-filter {
    //max-width: 800px;
}

.wit-profiles-filter__input-container {
    max-width: 350px;
    margin-right: var(--offset-md);
}

@media screen and (max-width: 850px) {
    .wit-profiles-filter__container {
        flex-direction: column;
    }

    .wit-profiles-filter__input-container {
        max-width: none;
        margin-bottom: var(--offset-sm);
        margin-right: 0;
    }
}

</style>
