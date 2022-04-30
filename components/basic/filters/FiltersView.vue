<template>
  <div class="wis-wishlist-filters" :class="filtersClasses">
    <b-button v-if="isVisible" type="is-primary" class="wis-wishlist-filters__open" @click="close">
      <i class="mdi mdi-20px mdi-close" />
    </b-button>

    <div class="wis-wishlist-filters__content">
      <slot />

      <b-button type="is-danger" expanded @click="$emit('reset')">
        {{ $t('Clear') }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FiltersView',

    props: {
        isVisible: {
            required: true,
            type: Boolean
        }
    },

    computed: {
        filtersClasses () {
            return { open: this.isVisible }
        }
    },

    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="scss">
.wis-wishlist-filters {
    border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
    width: 300px;
    background-color: var(--content-bg);
    height: auto;
    padding: var(--offset-sm);
    align-self: flex-start;
    max-height: calc(100vh - 60px - 32px);
    position: fixed;
    top: 72px;
    right: var(--offset-sm);
    z-index: calc(var(--navbar-z) + 1);
    margin: 0;
    transition: transform var(--default-transition);
    transform: translateX(calc(100% + 16px));
}

.wis-wishlist-filters__open {
    background-color: var(--content-bg) !important;
    border: var(--default-border) !important;
    border-right: transparent;
    color: var(--body-color);
    padding: var(--offset-xs) var(--offset-xxs) var(--offset-xs) var(--offset-xs);
    position: absolute;
    top: 20px;
    left: -34px;
    border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
    box-shadow: -2px 0 11px 3px rgb(0 0 0 / 40%) !important;
}

.wis-wishlist-filters__content {
    overscroll-behavior: contain;
    height: auto;
    overflow-y: auto;
}

.wis-wishlist-filters.open {
    transform: translateX(0);
    box-shadow: -6px 0 11px 3px rgb(0 0 0 / 70%);

    .wis-wishlist-filters__open {
        background-color: var(--primary) !important;
    }
}

@media (max-width: 1100px) {
    .wis-wishlist-filters {
        top: var(--offset-sm);
        bottom: var(--offset-sm);
        right: 0;
        height: calc(100vh - var(--offset-lg));
        max-height: calc(100vh - var(--offset-lg));
        padding: var(--offset-sm) var(--offset-xs) var(--offset-sm) var(--offset-sm);
    }

    .wis-wishlist-filters__content {
        background-color: var(--content-bg);
        border-radius: var(--offset-xxs);
        height: 100%;
        overflow-y: auto;
        padding-right: var(--offset-xs);
    }
}
</style>
