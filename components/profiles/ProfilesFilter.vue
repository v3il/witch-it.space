<template>
  <div class="wit-profiles-filter wit-flex--justify-between wit-flex">
    <b-input
      class="wit-offset-right--xs"
      :value="filtersData.query"
      maxlength="20"
      :placeholder="$t('Profiles_SearchByUsername')"
      custom-class="wit-transition"
      style="flex: 1 1 300px;"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="onQueryChange"
      @icon-right-click="clearQuery"
    />

    <div>
      <b-dropdown
        animation="fade150"
        class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs"
        style="background-color: rgb(46, 54, 72); border: 1px solid rgb(54, 57, 76); border-radius: 4px; cursor: pointer;"
        position="is-bottom-left"
        @active-change="() => {}"
      >
        <template #trigger>
          <b-icon icon="filter" style="color: #dbdbdb; height: 100%; width: 36px;" />
        </template>

        <div style="width: 600px; height: 600px;">
          Filters
        </div>

        <!--            <b-dropdown-item class="wit-transition&#45;&#45;background">-->
        <!--                <nuxt-link to="/settings" class="wit-flex wit-flex&#45;&#45;align-center wit-color&#45;&#45;white">-->
        <!--                    <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
        <!--                    <span class="wit-inline-block username">{{ $t('Settings') }}</span>-->
        <!--                </nuxt-link>-->
        <!--            </b-dropdown-item>-->

        <!--            <b-dropdown-item class="wit-transition&#45;&#45;background" @click="logout">-->
        <!--                <div class="wit-flex wit-flex&#45;&#45;align-center wit-color&#45;&#45;danger">-->
        <!--                    <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="logout-variant" />-->
        <!--                    <span class="wit-inline-block">{{ $t('Logout') }}</span>-->
        <!--                </div>-->
        <!--            </b-dropdown-item>-->
      </b-dropdown>

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
