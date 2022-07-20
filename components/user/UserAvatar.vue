<template>
  <img :src="userAvatarUrl">
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { buildAvatarUrl } from '@/utils/index.js'

export default {
    name: 'UserAvatar',

    props: {
        user: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const userAvatarUrl = computed(() => buildAvatarUrl(props.user.avatarId))

        return { userAvatarUrl }
    }
}
</script>
