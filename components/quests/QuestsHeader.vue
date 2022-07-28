<template>
  <HeaderPanel>
    <div class="wit-flex wit-flex--align-center wis-block--max-width-xs wis-user-card__container wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <div class="wit-flex wit-flex--align-center wit-flex__item--grow">
        <div class="wit-flex__item--grow" style="min-width: 0;">
          <HeaderTitle />
          <LastUpdate :profile="profile" />
        </div>
      </div>

      <QuestActions />
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { HeaderActions } from '@/components/offers/header'
import { UserAvatar } from '@/components/user'
import HeaderTitle from '@/components/quests/HeaderTitle'
import LastUpdate from '@/components/quests/LastUpdate'
import { HeaderPanel } from '@/components/basic/index.js'
import QuestActions from '@/components/quests/QuestActions.vue'

export default {
    name: 'QuestsHeader',

    components: {
        HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar,
        HeaderPanel,
        QuestActions
    },

    setup () {
        const store = useStore()

        const authorizedUser = computed(() => store.state.user.user)
        const profile = computed(() => store.state.offers.profile)
        const isOwnUserProfile = computed(() => authorizedUser.value?.id === profile.value.id)

        return { isOwnUserProfile, profile }
    }
}
</script>

<style scoped lang="scss">
@media (max-width: 600px) {
    .wis-user-card__container {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
