<template>
  <div class="wit-item-view wit-cursor--pointer" @click="onItemClicked">
    <div class="wit-position--relative wit-item-view__container wit-block--full-height wit-flex wit-flex--column" :class="itemClass">
      <img
        :src="itemPreviewURL"
        :alt="item.name"
        :title="item.name"
        class="wit-item-image__image wit-block"
      >
      <div v-if="itemCount > 0" class="wit-item-image__counter">
        x{{ itemCount }}
      </div>

      <p v-if="isTitleShown" class="wit-text--center wit-offset-bottom--xs wit-offset-top--xs ccc wit-line-height--sm">
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

        isTitleShown: {
            required: false,
            type: Boolean,
            default: true
        }
    },

    computed: {
        itemClass () {
            const rarity = {
                veryrare: 'very-rare',
                whimsical: 'whimsical',
                rare: 'rare',
                common: 'common',
                uncommon: 'uncommon',
                unlock: 'unlock',
                promo: 'promo',
                eventrarity: 'eventrarity'
            }[this.item.rarity]

            return `wit-item-view--${rarity}`
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.name)
        }
    },

    methods: {
        onItemClicked () {
            this.$emit('clicked', this.item)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-view {
    width: 100%;
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

.wit-item-view__container {
    border: 2px solid transparent;
    border-radius: 8px;

    &.wit-item-view--common {
        border-color: var(--item-common);

        .wit-item-image__counter {
            background-color: var(--item-common);
            color: var(--black);
        }
    }

    &.wit-item-view--uncommon {
        border-color: var(--item-uncommon);

        .wit-item-image__counter {
            background-color: var(--item-uncommon);
            color: var(--black);
        }
    }

    &.wit-item-view--promo {
        border-color: var(--item-promo);

        .wit-item-image__counter {
            background-color: var(--item-promo);
            color: var(--black);
        }
    }

    &.wit-item-view--eventrarity {
        border-color: var(--item-event);

        .wit-item-image__counter {
            background-color: var(--item-event);
            color: var(--black);
        }
    }

    &.wit-item-view--unlock {
        border-color: var(--item-unlock);

        .wit-item-image__counter {
            background-color: var(--item-unlock);
            color: var(--black);
        }
    }

    &.wit-item-view--rare {
        border-color: var(--item-rare);

        .wit-item-image__counter {
            background-color: var(--item-rare);
            color: var(--black);
        }
    }

    &.wit-item-view--very-rare {
        border-color: var(--item-very-rare);

        .wit-item-image__counter {
            background-color: var(--item-very-rare);
        }
    }

    &.wit-item-view--whimsical {
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
