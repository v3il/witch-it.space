<template>
  <div class="wit-item-view wit-paddings--xs1">
    <div class="wit-position--relative bbbb wit-block--full-height" :class="itemClass">
      <img
        :src="item.previewUrl"
        :alt="item.name"
        :title="item.name"
        class="wit-item-image__image wit-offset-bottom--xxs"
      >
      <div class="wit-item-image__counter wit-font-size--xxs1 wit-none--mobile1">
        x{{ itemCount }}
      </div>

      <p class="wit-text--center wit-offset-bottom--xs ccc wit-line-height--sm">
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
                veryrare: 'wit-item--very-rare',
                whimsical: 'wit-item--whimsical'
            }[this.item.rarity]
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-view {
    //max-width: 150px;
}

.wit-item-image__counter {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--white);
    padding: var(--offset-xxs);
    border-bottom-left-radius: var(--offset-xxs);
}

.bbbb {
    border: 2px solid transparent;
    border-radius: 8px;

    &.wit-item--very-rare {
        border-color: var(--item-very-rare);

        .wit-item-image__counter {
            background-color: var(--item-very-rare);
        }
    }

    &.wit-item--whimsical {
        border-color: var(--item-whimsical);

        .wit-item-image__counter {
            background-color: var(--item-whimsical);
        }
    }
}

.ccc {
    padding: 0 8px;
}

.wit-item-image__image {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--offset-xs);
    //border: 2px solid transparent;
}

//.wit-item-image--very-rare {
//    .wit-item-image__image {
//        border-color: var(--item-very-rare);
//    }
//
//    .wit-item-image__counter {
//        background-color: var(--item-very-rare);
//    }
//}
//
//.wit-item-image--whimsical {
//    .wit-item-image__image {
//        border-color: var(--item-whimsical);
//    }
//
//    .wit-item-image__counter {
//        background-color: var(--item-whimsical);
//    }
//}
</style>
