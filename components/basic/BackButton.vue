<template>
  <NuxtLink :to="to">
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
