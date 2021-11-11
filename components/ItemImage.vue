<template>
  <div class="wit-position--relative" :class="itemClass">
    <img
      :src="item.iconUrl"
      :alt="item.name"
      :title="item.name"
      class="wit-item-image__image"
    >
    <div v-if="itemCount" class="wit-item-image__counter wit-font-size--xxs wit-none--mobile">
      x{{ itemCount }}
    </div>
  </div>
</template>

<script>
export default {
    name: 'ItemName',

    props: {
        item: {
            required: true,
            type: Object
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
.wit-item-image__counter {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--white);
    padding: var(--offset-xxs);
    border-bottom-left-radius: var(--offset-xxs);
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
