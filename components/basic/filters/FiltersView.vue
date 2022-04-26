<template>
  <div class="wis-wishlist-filters">
    <div class="wis-wishlist-filters__content">
      <slot />

      <b-button type="is-danger" expanded class="wit-offset-bottom--xs" @click="$emit('reset')">
        {{ $t('Clear') }}
      </b-button>

      <b-button type="is-danger is-light" expanded @click="$emit('close')">
        {{ $t('Close') }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default { name: 'FiltersView' }
</script>

<style scoped lang="scss">
.wis-wishlist-filters {
    border-radius: var(--offset-xxs);
    width: 275px;
    background-color: var(--content-bg);
    margin-left: var(--offset-sm);
    position: sticky;
    top: var(--offset-sm);
    height: auto;
    padding: var(--offset-sm);
    align-self: flex-start;
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: calc(100vh - 60px - 32px);
}

.wis-wishlist-filters__search,
.wis-wishlist-filters__close {
    display: none;
}

@media (max-width: 1100px) {
    .wis-wishlist-filters {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: calc(var(--navbar-z) + 1);
        margin: 0;
        width: auto;
        min-height: 100vh;
        max-height: 100vh;
        padding: var(--offset-sm);
        background-color: rgba(0, 0, 0, 0.7);
    }

    .wis-wishlist-filters__content {
        width: 300px;
        background-color: var(--content-bg);
        padding: var(--offset-sm);
        border-radius: var(--offset-xxs);
        height: 100%;
        margin: 0 auto;
    }

    .wis-wishlist-filters__search,
    .wis-wishlist-filters__close {
        display: flex;
    }
}
</style>
