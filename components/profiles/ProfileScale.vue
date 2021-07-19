<template>
  <div class="wit-profile-scale wit-flex">
    <div v-if="whimsicalScaleWidth" role="button" class="wit-profile-scale__item-scale wit-profile-scale__whimsical" :style="{ width: whimsicalScaleWidth + '%' }" @click="onWhimsicalClick" />
    <div v-if="veryRareScaleWidth" role="button" class="wit-profile-scale__item-scale wit-profile-scale__veryrare" :style="{ width: veryRareScaleWidth + '%' }" @click="onVeryRareClick" />
    <div v-if="rareScaleWidth" role="button" class="wit-profile-scale__item-scale wit-profile-scale__rare" :style="{ width: rareScaleWidth + '%' }" @click="onRareClick" />
    <div v-if="uncommonScaleWidth" role="button" class="wit-profile-scale__item-scale wit-profile-scale__uncommon" :style="{ width: uncommonScaleWidth + '%' }" @click="onUncommonClick" />
    <div v-if="commonScaleWidth" role="button" class="wit-profile-scale__item-scale wit-profile-scale__common" :style="{ width: commonScaleWidth + '%' }" @click="onCommonClick" />
  </div>
</template>

<script>
import { Rarity } from '@/shared/items'

export default {
    name: 'ProfileScale',

    props: {
        profile: {
            type: Object,
            required: true
        }
    },

    computed: {
        whimsicalScaleWidth () {
            return Math.floor(this.profile.whimsicals / this.profile.ordersCount * 100)
        },

        veryRareScaleWidth () {
            return Math.floor(this.profile.veryRares / this.profile.ordersCount * 100)
        },

        rareScaleWidth () {
            return Math.floor(this.profile.rares / this.profile.ordersCount * 100)
        },

        uncommonScaleWidth () {
            return Math.floor(this.profile.uncommons / this.profile.ordersCount * 100)
        },

        commonScaleWidth () {
            return 100 - (this.whimsicalScaleWidth + this.veryRareScaleWidth + this.rareScaleWidth + this.uncommonScaleWidth)
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
    background-color: var(--item-whimsical);
}

.wit-profile-scale__veryrare {
    background-color: var(--item-very-rare);
}

.wit-profile-scale__rare {
    background-color: var(--item-rare);
}

.wit-profile-scale__uncommon {
    background-color: var(--item-uncommon);
}

.wit-profile-scale__common {
    background-color: var(--item-common);
}
</style>
