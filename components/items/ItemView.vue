<template>
  <div class="wit-item-view wit-paddings--xs1 wit-cursor--pointer" @click="onItemClicked">
    <div class="wit-position--relative bbbb wit-block--full-height wit-flex wit-flex--column" :class="itemClass">
      <img
        :src="itemPreviewURL"
        :alt="item.name"
        :title="item.name"
        class="wit-item-image__image wit-block"
      >
      <div v-if="itemCount > 0" class="wit-item-image__counter wit-font-size--xxs1 wit-none--mobile1">
        x{{ itemCount }}
      </div>

      <p v-if="isItemShown" class="wit-text--center wit-offset-bottom--xs wit-offset-top--xs ccc wit-line-height--sm">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { buildItemUrl } from '@/utils'

export default {
    name: 'ItemView',

    props: {
        item: {
            type: Object,
            required: true
        },

        itemCount: {
            required: false,
            default: Math.floor(Math.random() * 10),
            type: Number
        },

        isItemShown: {
            required: false,
            type: Boolean,
            default: true
        }
    },

    computed: {
        itemClass () {
            return {
                veryrare: 'wit-item--very-rare',
                whimsical: 'wit-item--whimsical',
                rare: 'wit-item--rare',
                common: 'wit-item--common',
                uncommon: 'wit-item--uncommon',
                unlock: 'wit-item--unlock',
                promo: 'wit-item--promo',
                eventrarity: 'wit-item--eventrarity'
            }[this.item.rarity]
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.name)
        }
    },

    methods: {
        onItemClicked () {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-view {
    width: 100%;
    //max-width: 150px;
}

.wit-item-image__counter {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--white);
    padding: var(--offset-xxs);
    border-bottom-left-radius: var(--offset-xxs);
    font-weight: bold;
}

.bbbb {
    border: 2px solid transparent;
    border-radius: 8px;

    &.wit-item--common {
        border-color: var(--item-common);

        .wit-item-image__counter {
            background-color: var(--item-common);
            color: var(--black);
        }
    }

    &.wit-item--uncommon {
        border-color: var(--item-uncommon);

        .wit-item-image__counter {
            background-color: var(--item-uncommon);
            color: var(--black);
        }
    }

    &.wit-item--promo {
        border-color: var(--item-promo);

        .wit-item-image__counter {
            background-color: var(--item-promo);
            color: var(--black);
        }
    }

    &.wit-item--eventrarity {
        border-color: var(--item-event);

        .wit-item-image__counter {
            background-color: var(--item-event);
            color: var(--black);
        }
    }

    &.wit-item--unlock {
        border-color: var(--item-unlock);

        .wit-item-image__counter {
            background-color: var(--item-unlock);
            color: var(--black);
        }
    }

    &.wit-item--rare {
        border-color: var(--item-rare);

        .wit-item-image__counter {
            background-color: var(--item-rare);
            color: var(--black);
        }
    }

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
    aspect-ratio: 1;
    min-height: 50px;
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
