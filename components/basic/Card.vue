<template>
  <div class="wit-card wit-flex" :class="cardClass" @click="onClick">
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
        },

        paddings: {
            required: false,
            default: 'md',
            type: String
        }
    },

    computed: {
        cardClass () {
            return [
                this.type,
                `wit-card--${this.paddings}`
            ]
        },

        titleOffsetClass () {
            return {
                'wit-offset-bottom--xs': this.$slots.description,
                'wit-offset-bottom--sm': !this.$slots.description
            }
        }
    },

    methods: {
        onClick ({ target }) {
            this.$emit('click', target)
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

    //@media screen and (max-width: 1024px) {
    //    padding: var(--offset-sm);
    //}
}

.wit-card--md .wit-card-body {
    padding: var(--offset-md);
}

.wit-card--xs .wit-card-body {
    padding: var(--offset-xs);
}

.wit-card-title {
    font-size: 16px;
    line-height: 1.2;
}
</style>
