<template>
  <v-popover ref="popover" :placement="position">
    <slot name="trigger" />

    <div slot="popover" class="wit-paddings--xs">
      <slot />
    </div>
  </v-popover>
</template>

<script>
export default {
    name: 'Dropdown',

    props: {
        position: {
            required: true,
            type: String
        }
    }
}
</script>

<style scoped>

</style>
