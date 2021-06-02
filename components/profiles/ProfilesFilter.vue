<template>
  <Card class="wit-profiles-filter">
    <div class="wit-flex wit-flex--wrap wit-profiles-filter__container">
      <div class="wit-profiles-filter__input-container wit-block--full-width">
        <b-input
          :value="filtersData.query"
          maxlength="20"
          :placeholder="$t('Profiles_SearchByUsername')"
          custom-class="wit-transition wit-block--full-width"
          lazy
          :has-counter="false"
          @input="onQueryChange"
        />
      </div>

      <b-switch :value="filtersData.query">
        {{ $t('Profiles_SteamGuardedOnly') }}
      </b-switch>
    </div>
  </Card>
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
        onQueryChange (value) {
            console.log(value)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profiles-filter {
    max-width: 800px;
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
