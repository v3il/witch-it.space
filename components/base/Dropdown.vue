<template>
  <div class="dropdown d-none d-md-block ms-2">
    <button
      type="button"
      class="btn header-item waves-effect show"
      @click="toggle"
    >
      <img v-if="selectedVariant.img" :src="selectedVariant.img" :alt="selectedVariant.label" class="wit-offset-right--xs" height="16"> <span class="align-middle"> {{ selectedVariant.label }} </span> <span class="mdi mdi-chevron-down" />
    </button>
    <div v-show="isOpen" class="dropdown-menu dropdown-menu-end show">
      <button v-for="variant in variants" :key="variant.value" class="dropdown-item" @click="onVariantSelected(variant)">
        <img
          v-if="variant.img"
          :src="variant.img"
          :alt="variant.label"
          height="16"
          class="wit-offset-right--xs"
        > <span class="align-middle"> {{ variant.label }} </span>
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

<style scoped lang="scss">
.dropdown {
    display: inline-block;
    height: 100%;
    position: relative;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
    font-weight: 400;
    line-height: 1.5;
    color: #e9ecef;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;

    button {
        height: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        color: #dee2e6;
        padding: 0.375rem 0.75rem;

        &:hover,
        &:active {
            background: rgba(239, 242, 247, 0.05);
        }
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        display: flex;
        flex-direction: column;
        right: 0;
        color: #e9ecef;
        text-align: left;
        list-style: none;
        background-color: #2e3648;
        background-clip: padding-box;
        border: 1px solid #3a425a;
        border-radius: 0.25rem;
        padding: 8px 0;
    }

    .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.35rem 1.5rem;
        clear: both;
        font-weight: 400;
        color: #9ca8b3;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;

        &:hover {
            color: #e9ecef;
            text-decoration: none;
            background-color: #323a4e;
        }
    }
}
</style>
