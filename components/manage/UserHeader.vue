<template>
  <HeaderPanel :compact="compact" :class="panelClasses">
    <div class="wit-flex wit-flex--align-center wis-block--max-width wis-user-card__container wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <div class="wit-flex wit-flex--align-center wit-flex__item--grow">
        <UserAvatar :user="profile" class="wis-user-card__avatar" />

        <div class="wit-offset-left--sm wit-flex__item--grow wis-min-width--none">
          <HeaderTitle :compact="compact" :mode="mode" />
          <LastUpdate :mode="mode" :profile="profile" />
        </div>
      </div>

      <HeaderActions :profile="profile" :is-own-profile="isOwnUserProfile" :mode="mode" />
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { HeaderTitle, HeaderActions } from './header'
import { UserAvatar } from '@/components/user'
import { HeaderPanel } from '@/components/basic'
import { LastUpdate } from '@/components/offers/header'

export default {
    name: 'UserHeader',

    components: {
        // HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar,
        HeaderPanel,
        HeaderTitle
    },

    props: {
        mode: {
            required: true,
            type: String
        },

        compact: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    setup (props) {
        const store = useStore()

        const authorizedUser = computed(() => store.state.user.user)
        const profile = computed(() => store.state.user.user)
        const isOwnUserProfile = computed(() => true)

        const panelClasses = computed(() => ({ compact: props.compact }))

        return { isOwnUserProfile, profile, panelClasses }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card__avatar {
    width: 64px;
    height: 64px;
    border-radius: 8px;
}

.compact {
    .wis-user-card__avatar {
        width: 48px;
        height: 48px;
    }
}

@media (max-width: 769px) {
    .wis-user-card__avatar {
        width: 48px;
        height: 48px;
    }
}

@media (max-width: 600px) {
    .wis-user-card__container {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
