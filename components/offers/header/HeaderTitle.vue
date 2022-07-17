<template>
  <h1 style="letter-spacing: -0.9px; font-size: 32px; line-height: 49.5px;">
    {{ userName }}'s {{ mode }}
  </h1>
</template>

<script>
export default {
    name: 'HeaderTitle',

    props: {
        profile: {
            required: true,
            type: Object
        },

        mode: {
            required: true,
            type: String
        }
    }
}
</script>

<style scoped>

</style>
