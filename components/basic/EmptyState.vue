<template>
  <div class="wit-color--muted wit-flex wit-flex--column wit-flex--align-center">
    <img
      src="https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/Witch_fD00VUVeX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662496853199"
      alt="empty state"
      class="wis-empty-state__image"
    >
    <p class="wit-text--center wit-line-height--md wis-empty-state__text wit-font-size--xsplus" v-html="'There are ' + text.toLowerCase() + ' here'" />
    <slot />
  </div>
</template>

<script>
export default {
    name: 'EmptyState',

    props: {
        text: {
            required: true,
            type: String
        },

        icon: {
            required: true,
            type: String
        }
    }
}
</script>

<style scoped lang="scss">
.wis-empty-state__image {
    max-height: 450px;
    height: 100%;
}

.wis-empty-state__text {
    //margin-top: -70px;
}
</style>
