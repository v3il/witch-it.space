<template>
  <vue-final-modal v-slot="{ close }" :value="true" v-bind="$attrs" v-on="$listeners">
    <span class="modal__title">Hello, vue-final-modal</span>
    <div class="modal__content">
      <p>Vue Final Modal is a renderless, stackable, detachable and lightweight modal component.</p>
    </div>
    <b-button @click="close">
      Close
    </b-button>
  </vue-final-modal>
</template>

<script>
export default {
    name: 'Popup'
}
</script>

<style scoped>

</style>
