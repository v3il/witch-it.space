<template>
  <div class="wis-toggle-list">
    <b-field v-for="item in items" :key="item.value">
      <b-checkbox :value="selectedItems" :native-value="item.value" @input="$emit('update', $event)">
        {{ item.label }}
      </b-checkbox>
    </b-field>
  </div>
</template>

<script>
export default {
    name: 'ToggleList',

    props: {
        selectedItems: {
            required: true,
            type: Array
        },

        items: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped lang="scss">
.wis-toggle-list {
    overflow-y: auto;
    overscroll-behavior: contain;
}
</style>
