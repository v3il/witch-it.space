<template>
  <div class="dropdown d-none d-md-block ms-2">
    <button
      type="button"
      class="btn header-item waves-effect show"
      @click="toggle"
    >
      <img v-if="selectedVariant.img" :src="selectedVariant.img" :alt="selectedVariant.label" class="me-1" height="12"> <span class="align-middle"> {{ selectedVariant.label }} </span> <span class="mdi mdi-chevron-down" />
    </button>
    <div v-show="isOpen" class="dropdown-menu dropdown-menu-end show" style="position: absolute; inset: 0 auto auto 0; margin: 0; transform: translate(-37px, 72px);">
      <button v-for="variant in variants" :key="variant.value" @click="onVariantSelected(variant)">
        <img v-if="variant.img" :src="variant.img" :alt="variant.label" class="me-1" height="12"> <span class="align-middle"> {{ variant.label }} </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Dropdown',

    props: {
        variants: {
            type: Array,
            required: true
        },

        value: {
            type: String,
            required: true
        }
    },

    data: () => ({
        isOpen: false
    }),

    computed: {
        selectedVariant () {
            return this.variants.find(({ value }) => value === this.value)
        }
    },

    methods: {
        toggle () {
            this.isOpen = !this.isOpen
        },

        onVariantSelected (variant) {

        }
    }
}
</script>

<style scoped>

</style>
