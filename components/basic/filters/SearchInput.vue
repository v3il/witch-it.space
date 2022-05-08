<template>
  <div class="wit-flex wis-search-input">
    <b-input
      class="wit-flex__item--grow wis-search-input__input"
      :value="query"
      maxlength="20"
      :placeholder="placeholder"
      custom-class="wit-transition"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="$emit('update', $event)"
      @icon-right-click="$emit('reset', 'query')"
    />

    <b-button class="wit-flex wit-flex--center wis-search-input__button" @click="$emit('toggle')">
      <i class="mdi mdi-20px mdi-filter wit-color--muted" />
    </b-button>
  </div>
</template>

<script>
export default {
    name: 'SearchInput',

    props: {
        query: {
            required: true,
            type: String
        },

        placeholder: {
            required: true,
            type: String
        }
    }
}
</script>

<style scoped lang="scss">
.wis-search-input__button {
    background-color: rgb(46, 54, 72);
    border: var(--default-border);
    color: var(--body-color);
    padding: 0 var(--offset-xs);
    display: none;
}

@media (max-width: 1200px) {
    .wis-search-input__input {
        display: none;
    }

    .wis-search-input__button {
        display: flex;
        border-radius: var(--offset-xxs);
    }
}
</style>
