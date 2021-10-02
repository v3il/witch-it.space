<template>
  <div class="wit-dropdown" :class="dropdownClasses">
    <button type="button" class="wit-flex wit-flex--align-center wit-dropdown__trigger wit-transition--background" @click="toggle">
      <img v-if="selectedVariant.img" :src="selectedVariant.img" :alt="selectedVariant.label" class="wit-offset-right--xs" height="16">
      <span class="wit-inline-block wit-offset-right--xxs">{{ selectedVariant.label }}</span>
      <span class="mdi mdi-chevron-down" />
    </button>
    <div v-show="isOpen" class="wit-dropdown-menu">
      <button v-for="variant in variants" :key="variant.value" class="dropdown-item wit-transition--background wit-transition--color" @click="onVariantSelected(variant)">
        <img v-if="variant.img" :src="variant.img" :alt="variant.label" class="wit-offset-right--xxs" height="16">
        <span class="wit-inline-block">{{ variant.label }}</span>
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
        open () {
            this.isOpen = true
            document.body.addEventListener('click', this.outsideClickHandler)
        },

        close () {
            this.isOpen = false
            document.body.removeEventListener('click', this.outsideClickHandler)
        },

        outsideClickHandler (event) {
            if (!this.$el.contains(event.target)) {
                this.close()
            }
        },

        toggle () {
            this.isOpen ? this.close() : this.open()
        },

        onVariantSelected (variant) {
            this.$emit('change', variant.value)
            this.close()
        }
    }
}
</script>

<style lang="scss">
.wit-dropdown {
    display: inline-block;
    //height: 100%;
    position: relative;
    background: transparent;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    outline: none;
}

.wit-dropdown__trigger {
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--dropdown-btn-color);
    padding: 0.375rem 0.75rem;

    &:hover,
    &:focus,
    &:active {
        background-color: var(--dropdown-hover-background);
    }
}

.wit-dropdown--open .wit-dropdown__trigger {
    background-color: var(--dropdown-hover-background);
}

.wit-dropdown-menu {
    position: absolute;
    min-width: 10rem;
    top: calc(100% + 1px);
    display: flex;
    flex-direction: column;
    right: 0;
    color: #e9ecef;
    text-align: left;
    list-style: none;
    background-color: var(--dropdown-background);
    background-clip: padding-box;
    border: 1px solid var(--dropdown-border);
    border-radius: var(--offset-xxs);
    border-top-right-radius: 0;
    padding: var(--offset-xs) 0;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: var(--offset-xs) var(--offset-md);
    clear: both;
    font-weight: 400;
    color: var(--dropdown-item-color);
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
        color: var(--dropdown-item-hover-color);
        text-decoration: none;
        background-color: var(--dropdown-hover-background);
    }
}

.wit-dropdown--locale-switcher {
    --dropdown-btn-color: var(--locale-dropdown-btn-color);
    --dropdown-background: var(--locale-dropdown-background);
    --dropdown-hover-background: var(--locale-dropdown-hover-background);
    --dropdown-border: var(--locale-dropdown-border);
    --dropdown-item-color: var(--locale-dropdown-item-color);
    --dropdown-item-hover-color: var(--locale-dropdown-item-hover-color);
}
</style>
