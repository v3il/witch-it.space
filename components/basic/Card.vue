<template>
  <div class="wit-card wit-flex" :class="cardClass" @click="onClick">
    <div class="wit-card-body">
      <slot v-if="$slots.title" name="title" />

      <div v-if="$slots.description" class="wit-offset-bottom--sm wit-color--muted wit-line-height--md">
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

        verticalPaddings: {
            required: false,
            default: 'md',
            type: String
        },

        horizontalPaddings: {
            required: false,
            default: 'md',
            type: String
        }
    },

    computed: {
        cardClass () {
            return [
                this.type,
                `wit-card--horizontal-${this.horizontalPaddings}`,
                `wit-card--vertical-${this.verticalPaddings}`
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

// todo: refactor

.wit-card--horizontal-md .wit-card-body {
    padding-left: var(--offset-md);
    padding-right: var(--offset-md);

    @media (max-width: 878px) {
        padding-left: var(--offset-sm);
        padding-right: var(--offset-sm);
    }
}

.wit-card--vertical-md .wit-card-body {
    padding-top: var(--offset-md);
    padding-bottom: var(--offset-md);

    @media (max-width: 878px) {
        padding-top: var(--offset-sm);
        padding-bottom: var(--offset-sm);
    }
}

.wit-card--horizontal-sm .wit-card-body {
    padding-left: var(--offset-sm);
    padding-right: var(--offset-sm);
}

.wit-card--vertical-sm .wit-card-body {
    padding-top: var(--offset-sm);
    padding-bottom: var(--offset-sm);
}

.wit-card--horizontal-xs .wit-card-body {
    padding-left: var(--offset-xs);
    padding-right: var(--offset-xs);
}

.wit-card--vertical-xs .wit-card-body {
    padding-top: var(--offset-xs);
    padding-bottom: var(--offset-xs);
}

.wit-card-title {
    font-size: 16px;
    line-height: 1.2;
}
</style>
