<template>
  <div class="wit-dropdown" :class="dropdownClasses">
    <button type="button" class="wit-flex wit-flex--align-center wit-dropdown__trigger" @click="toggle">
      <img v-if="selectedVariant.img" :src="selectedVariant.img" :alt="selectedVariant.label" class="wit-offset-right--xs" height="16">
      <span class="wit-inline-block wit-offset-right--xs">{{ selectedVariant.label }}</span>
      <span class="mdi mdi-chevron-down" />
    </button>
    <div v-show="isOpen" class="dropdown-menu dropdown-menu-end show">
      <button v-for="variant in variants" :key="variant.value" class="dropdown-item" @click="onVariantSelected(variant)">
        <img
          v-if="variant.img"
          :src="variant.img"
          :alt="variant.label"
          height="16"
          class="wit-offset-right--xs"
        > <span class="wit-inline-block"> {{ variant.label }} </span>
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
        },

        dropdownClasses () {
            return {
                'wit-dropdown--open': this.isOpen,
                'wit-dropdown--closed': !this.isOpen
            }
        }
    },

    methods: {
        toggle () {
            this.isOpen = !this.isOpen
        },

        onVariantSelected (variant) {
            this.$emit('change', variant.value)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-dropdown {
    display: inline-block;
    height: 100%;
    position: relative;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
    font-weight: 400;
    line-height: 1.5;
    //color: var(--dropdown-color);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;

    &--open .wit-dropdown__trigger {
        background: var(--dropdown-hover-background);
    }

    .wit-dropdown__trigger {
        height: 100%;
        //background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        color: var(--dropdown-btn-color);
        padding: 0.375rem 0.75rem;

        &:hover,
        &:active {
            background: var(--dropdown-hover-background);
        }
    }

    .dropdown-menu {
        position: absolute;
        min-width: 10rem;
        top: 100%;
        display: flex;
        flex-direction: column;
        right: 0;
        color: #e9ecef;
        text-align: left;
        list-style: none;
        background-color: var(--dropdown-background);
        background-clip: padding-box;
        border: 1px solid var(--dropdown-border);
        border-radius: 0.25rem;
        padding: 8px 0;
    }

    .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.35rem 1.5rem;
        clear: both;
        font-weight: 400;
        color: var(--dropdown-item-color);
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;

        &:hover {
            color: var(--dropdown-item-hover-color);
            text-decoration: none;
            background-color: var(--dropdown-hover-background);
        }
    }
}
</style>
