<template>
  <div class="wit-item-view wit-paddings--xs1">
    <div class="wit-position--relative bbbb wit-block--full-height" :class="itemClass">
      <img
        :src="item.previewUrl"
        :alt="item.name"
        :title="item.name"
        class="wit-item-image__image wit-offset-bottom--xs"
      >
      <div class="wit-item-image__counter wit-font-size--xxs wit-none--mobile">
        x{{ itemCount }}
      </div>

      <p class="wit-text--center wit-offset-bottom--xs wit-paddings--xxs wit-line-height--sm">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ItemView',

    props: {
        item: {
            type: Object,
            required: true
        },

        itemCount: {
            required: false,
            default: null,
            type: Number
        }
    },

    computed: {
        itemClass () {
            return {
                veryrare: 'wit-item-image--very-rare',
                whimsical: 'wit-item-image--whimsical'
            }[this.item.tagRarity]
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-view {
    max-width: 150px;
}

.bbbb {
    border: 2px solid var(--item-whimsical);
    border-radius: 8px;
}

.wit-item-image__counter {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--white);
    padding: var(--offset-xxs);
    border-bottom-left-radius: var(--offset-xxs);
    background-color: var(--item-whimsical);
}

.wit-item-image__image {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--offset-xxs);
    border: 2px solid transparent;
}

.wit-item-image--very-rare {
    .wit-item-image__image {
        border-color: var(--item-very-rare);
    }

    .wit-item-image__counter {
        background-color: var(--item-very-rare);
    }
}

.wit-item-image--whimsical {
    .wit-item-image__image {
        border-color: var(--item-whimsical);
    }

    .wit-item-image__counter {
        background-color: var(--item-whimsical);
    }
}
</style>
