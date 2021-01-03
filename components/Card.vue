<template>
  <div class="wit-card wit-flex">
    <div class="wit-card-body">
      <h4 v-if="$slots.title" class="wit-card-title wit-font-family--secondary wit-font-weight--600 wit-offset-bottom--sm">
        <slot name="title" />
      </h4>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped lang="scss">
.wit-card {
    flex-direction: column;
    background-color: var(--card-bg-color);
    border-radius: var(--offset-xxs);
    box-shadow: 0 0.75rem 1.5rem var(--card-box-shadow-color);
}

.wit-card-body {
    flex: 1 1 auto;
    padding: 1.25rem 1.25rem;
}

.wit-card-title {
    font-size: 16px;
    line-height: 1.2;
}
</style>
