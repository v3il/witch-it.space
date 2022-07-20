<template>
  <div class="wit-flex wit-flex__item--no-shrink wit-user-card__actions">
    <OwnProfileActions v-if="isOwnProfile" :profile="profile" :mode="mode" />
    <ForeignProfileActions v-else :profile="profile" />
  </div>
</template>

<script>
import OwnProfileActions from '@/components/offers/header/OwnProfileActions.vue'
import ForeignProfileActions from '@/components/offers/header/ForeignProfileActions.vue'

export default {
    name: 'HeaderActions',

    components: {
        OwnProfileActions,
        ForeignProfileActions
    },

    props: {
        profile: {
            required: true,
            type: Object
        },

        mode: {
            required: true,
            type: String
        },

        isOwnProfile: {
            required: true,
            type: Boolean
        }
    }
}
</script>

<style scoped lang="scss">
.wit-user-card__actions {
    margin: var(--offset-sm) 0 var(--offset-sm) var(--offset-sm);

    @media (max-width: 600px) {
        margin-bottom: 0;
        margin-left: 0;
    }
}
</style>
