<template>
  <div class="wit-flex wit-flex__item--no-shrink wit-offset-top--sm wit-offset-bottom--sm">
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
