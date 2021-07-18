<template>
  <div class="wit-profile-scale wit-flex">
    <div v-if="whimsicalWidth" class="wit-profile-scale__item-scale wit-profile-scale__whimsical" :style="{ width: whimsicalWidth + '%' }" />
    <div v-if="veryRaresWidth" class="wit-profile-scale__item-scale wit-profile-scale__veryrare" :style="{ width: veryRaresWidth + '%' }" />
    <div v-if="raresWidth" class="wit-profile-scale__item-scale wit-profile-scale__rare" :style="{ width: raresWidth + '%' }" />
    <div v-if="uncommonsWidth" class="wit-profile-scale__item-scale wit-profile-scale__uncommon" :style="{ width: uncommonsWidth + '%' }" />
    <div v-if="commonsWidth" class="wit-profile-scale__item-scale wit-profile-scale__common" :style="{ width: commonsWidth + '%' }" />
  </div>
</template>

<script>
export default {
    name: 'ProfileScale',

    props: {
        profile: {
            type: Object,
            required: true
        }
    },

    computed: {
        whimsicalWidth () {
            return Math.floor(this.profile.whimsicals / this.profile.ordersCount * 100)
        },

        veryRaresWidth () {
            return Math.floor(this.profile.veryRares / this.profile.ordersCount * 100)
        },

        raresWidth () {
            return Math.floor(this.profile.rares / this.profile.ordersCount * 100)
        },

        uncommonsWidth () {
            return Math.floor(this.profile.uncommons / this.profile.ordersCount * 100)
        },

        commonsWidth () {
            return 100 - (this.whimsicalWidth + this.veryRaresWidth + this.raresWidth + this.uncommonsWidth)
        }
    }
}
</script>

<style scoped lang="scss">
$borderRadius: 4px;

.wit-profile-scale {
    width: 100%;
    height: 5px;
}

.wit-profile-scale__item-scale {
    height: inherit;

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
