<template>
  <div class="wit-flex wit-flex--align-center">
    <b-input
      :value="query"
      :placeholder="$t('Items_SearchByItemName')"
      class="wit-flex__item--grow wit-offset-right--xs"
      @input="$emit('update', $event)"
    />

    <b-button type="is-ghost" size="is-small" class="wit-flex__item--no-shrink" @click="$emit('reset')">
      <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
    </b-button>
  </div>
</template>

<script>
export default {
    name: 'QueryEditor',

    props: {
        query: {
            required: true,
            type: String
        }
    }
}
</script>
