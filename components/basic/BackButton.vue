<template>
  <NuxtLink :to="to" class="wis-back-button">
    <i class="mdi mdi-24px mdi-chevron-left wit-color--white" />
  </NuxtLink>
</template>

<script>
export default {
    name: 'BackButton',

    props: {
        to: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.wis-back-button {
    margin-top: 2px;
}
</style>
