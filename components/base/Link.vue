<template>
  <NuxtLink :to="to" class="wit-link">
    <slot />
  </NuxtLink>
</template>

<script>
export default {
    name: 'Link',

    props: {
        to: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.wit-link {
    color: var(--bs-primary);
}
</style>
