<template>
  <div>{{ profile }}</div>
</template>

<script>
export default {
    name: 'ProfileView',

    props: {
        profile: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>
