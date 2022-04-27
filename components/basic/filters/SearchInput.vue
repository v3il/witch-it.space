<template>
  <div class="wit-flex">
    <b-input
      class="wit-flex__item--grow"
      :value="query"
      maxlength="20"
      :placeholder="placeholder"
      custom-class="wit-transition wit-split-part--left"
      :has-counter="false"
      icon-right="close"
      icon-right-clickable
      @input="$emit('update', $event)"
      @icon-right-click="$emit('reset', 'query')"
    />

    <b-button class="wit-flex wit-flex--center wit-filter__filter-button wit-split-part--right" @click="$emit('toggle')">
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
.wit-filter__filter-button {
    background-color: rgb(46, 54, 72);
    border: var(--default-border);
    color: var(--body-color);
    padding: 0 var(--offset-xs);
}
</style>
