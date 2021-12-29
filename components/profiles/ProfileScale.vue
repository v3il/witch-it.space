<template>
  <div class="wit-profile-scale wit-flex">
    <div
      v-if="whimsicalScaleWidth"
      role="button"
      class="wit-profile-scale__item-scale wit-profile-scale__whimsical"
      :class="extraClass"
      :style="{ width: whimsicalScaleWidth + '%' }"
      @click="onWhimsicalClick"
    />
    <div
      v-if="veryRareScaleWidth"
      role="button"
      class="wit-profile-scale__item-scale wit-profile-scale__veryrare"
      :class="extraClass"
      :style="{ width: veryRareScaleWidth + '%' }"
      @click="onVeryRareClick"
    />
    <div
      v-if="rareScaleWidth"
      role="button"
      class="wit-profile-scale__item-scale wit-profile-scale__rare"
      :class="extraClass"
      :style="{ width: rareScaleWidth + '%' }"
      @click="onRareClick"
    />
    <div
      v-if="uncommonScaleWidth"
      role="button"
      class="wit-profile-scale__item-scale wit-profile-scale__uncommon"
      :class="extraClass"
      :style="{ width: uncommonScaleWidth + '%' }"
      @click="onUncommonClick"
    />
    <div
      v-if="commonScaleWidth"
      role="button"
      class="wit-profile-scale__item-scale wit-profile-scale__common"
      :class="extraClass"
      :style="{ width: commonScaleWidth + '%' }"
      @click="onCommonClick"
    />
  </div>
</template>

<script>
import { Rarity } from '@/shared/items'

const NO_DATA_SCALE_WIDTH = 20

export default {
    name: 'ProfileScale',

    props: {
        scaleData: {
            type: Object,
            required: true
        }
    },

    computed: {
        hasAnyData () {
            return this.scaleData.total > 0
        },

        whimsicalScaleWidth () {
            if (!this.hasAnyData) {
                return NO_DATA_SCALE_WIDTH
            }

            return Math.floor(this.scaleData.whimsical / this.scaleData.total * 100)
        },

        veryRareScaleWidth () {
            if (!this.hasAnyData) {
                return NO_DATA_SCALE_WIDTH
            }

            return Math.floor(this.scaleData.veryRare / this.scaleData.total * 100)
        },

        rareScaleWidth () {
            if (!this.hasAnyData) {
                return NO_DATA_SCALE_WIDTH
            }

            return Math.floor(this.scaleData.rare / this.scaleData.total * 100)
        },

        uncommonScaleWidth () {
            if (!this.hasAnyData) {
                return NO_DATA_SCALE_WIDTH
            }

            return Math.floor(this.scaleData.uncommon / this.scaleData.total * 100)
        },

        commonScaleWidth () {
            if (!this.hasAnyData) {
                return NO_DATA_SCALE_WIDTH
            }

            return 100 - (this.whimsicalScaleWidth + this.veryRareScaleWidth + this.rareScaleWidth + this.uncommonScaleWidth)
        },

        extraClass () {
            return { empty: !this.hasAnyData }
        }
    },

    methods: {
        onWhimsicalClick () {
            this.$emit('click', Rarity.WHIMSICAL)
        },

        onVeryRareClick () {
            this.$emit('click', Rarity.VERY_RARE)
        },

        onRareClick () {
            this.$emit('click', Rarity.RARE)
        },

        onUncommonClick () {
            this.$emit('click', Rarity.UNCOMMON)
        },

        onCommonClick () {
            this.$emit('click', Rarity.COMMON)
        }
    }
}
</script>

<style scoped lang="scss">
$borderRadius: 4px;

.wit-profile-scale {
    width: 100%;
    height: 6px;
}

.wit-profile-scale__item-scale {
    height: inherit;
    transition: transform var(--default-transition);
    transform-origin: center;
    cursor: pointer;
    border: 1px solid transparent;

    &.empty {
        opacity: 0.5;
    }

    &:hover {
        transform: scale(1.1);
    }

    &:first-child {
        border-top-left-radius: $borderRadius;
        border-bottom-left-radius: $borderRadius;
    }

    &:last-child {
        border-top-right-radius: $borderRadius;
        border-bottom-right-radius: $borderRadius;
    }
}

.wit-profile-scale__whimsical {
    border-color: var(--item-whimsical);
    background-color: var(--item-whimsical);
}

.wit-profile-scale__veryrare {
    border-color: var(--item-very-rare);
    background-color: var(--item-very-rare);
}

.wit-profile-scale__rare {
    border-color: var(--item-rare);
    background-color: var(--item-rare);
}

.wit-profile-scale__uncommon {
    border-color: var(--item-uncommon);
    background-color: var(--item-uncommon);
}

.wit-profile-scale__common {
    border-color: var(--item-common);
    background-color: var(--item-common);
}
</style>
