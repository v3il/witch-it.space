<template>
  <div class="wit-card wit-flex" :class="cardClass">
    <div class="wit-card-body">
      <h4 v-if="$slots.title" class="wit-card-title wit-font-family--secondary wit-font-weight--600" :class="titleOffsetClass">
        <slot name="title" />
      </h4>
      <div v-if="$slots.description" class="wit-offset-bottom--sm wit-color--muted wit-line-height--sm">
        <slot name="description" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card',

    props: {
        type: {
            required: false,
            default: '',
            type: String
        }
    },

    computed: {
        cardClass () {
            return this.type
        },

        titleOffsetClass () {
            return {
                'wit-offset-bottom--xs': this.$slots.description,
                'wit-offset-bottom--sm': !this.$slots.description
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-card {
    flex-direction: column;
    background-color: var(--card-bg-color);
    border-radius: var(--offset-xxs);
    box-shadow: 0 0.75rem 1.5rem var(--card-box-shadow-color);

    &.error {
        border: 1px solid var(--danger);
    }
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
