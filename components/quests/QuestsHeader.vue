<template>
  <div class="wis-user-card">
    <div class="wit-flex wit-flex--align-center wis-block--max-width-xs wis-user-card__container wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <div class="wit-flex wit-flex--align-center wit-flex__item--grow">
        <div class="wit-offset-left--sm wit-flex__item--grow" style="min-width: 0;">
          <HeaderTitle />
          <LastUpdate :profile="profile" />
        </div>
      </div>

      <b-button type="is-primary" class="wis-btn--rounded">
        <i class="mdi mdi-18px wit-offset-right--xs mdi-refresh" />
        {{ $t('Quests_UpdateQuests') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { HeaderActions } from '@/components/offers/header'
import { UserAvatar } from '@/components/user'
import HeaderTitle from '@/components/quests/HeaderTitle'
import LastUpdate from '@/components/quests/LastUpdate'

export default {
    name: 'QuestsHeader',

    components: {
        HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar
    },

    setup (props) {
        const store = useStore()

        const authorizedUser = computed(() => store.state.user.user)
        const profile = computed(() => store.state.offers.profile)
        const isOwnUserProfile = computed(() => authorizedUser.value?.id === profile.value.id)

        // const panelClasses = computed(() => ({ compact: props.compact }))

        return { isOwnUserProfile, profile }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card {
    background-color: var(--dark-gray);
    border-bottom: 1px solid var(--border-color);
    padding: 40px 32px;
}

.wis-user-card__avatar {
    width: 64px;
    height: 64px;
    border-radius: 8px;
}

.wis-user-card.compact {
    position: sticky;
    top: 0;
    z-index: 22;
    padding: 8px 24px;

    .wis-user-card__avatar {
        width: 48px;
        height: 48px;
    }
}

@media (max-width: 769px) {
    .wis-user-card {
        padding: 24px;
    }

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
