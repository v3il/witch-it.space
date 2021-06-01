<template>
  <div>{{ filtersData }}</div>
</template>

<script>
export default {
    name: 'ProfilesFilter',

    props: {
        filtersData: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>
