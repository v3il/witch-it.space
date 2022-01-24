<template>
  <b-field label="Simple">
    <b-select placeholder="Select a name">
      <option
        v-for="option in data"
        :key="option.id"
        :value="option.id"
      >
        {{ option.user.first_name }}
      </option>
    </b-select>
  </b-field>
</template>

<script>
export default {
    name: 'PriceTypeSelector'
}
</script>

<style scoped>

</style>
