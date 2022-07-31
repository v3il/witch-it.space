<template>
  <HeaderPanel>
    <div class="wit-flex wit-flex--align-center wis-block--max-width-xs wis-user-card__container wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <div class="wit-flex wit-flex--align-center wit-flex__item--grow">
        <div class="wit-flex__item--grow wis-min-width--none">
          <HeaderTitle />
          <LastUpdate />
        </div>
      </div>

      <HeaderActions />
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { UserAvatar } from '@/components/user'
import { LastUpdate, HeaderTitle, HeaderActions } from '@/components/quests/header'
import { HeaderPanel } from '@/components/basic/index.js'

export default {
    name: 'QuestsHeader',

    components: {
        HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar,
        HeaderPanel
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
