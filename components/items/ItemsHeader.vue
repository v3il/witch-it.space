<template>
  <HeaderPanel>
    <div class="wit-flex1 wit-flex--align-center wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <!--      <div class="wit-flex wit-flex&#45;&#45;align-center wit-flex__item&#45;&#45;grow">-->
      <h1 class="wis-user-card__title wit-text--overflow">
        {{ $t('Items_Title') }}
      </h1>

      <p class="wis-user-card__last-update wit-color--muted">
        <i class="mdi mdi-update mdi-18px wit-offset-right--xs" />
        <span class="wit-text--overflow">{{ $t('Wishlist_LastUpdate') }}: {{ 0 }}</span>
      </p>
    </div>
    <!--    </div>-->
  </HeaderPanel>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { HeaderActions, HeaderTitle, LastUpdate } from '@/components/offers/header'
import { UserAvatar } from '@/components/user'
import { HeaderPanel } from '@/components/basic'

export default {
    name: 'UserHeader',

    components: {
        HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar,
        HeaderPanel
    },

    setup (props) {
        const store = useStore()

        // const authorizedUser = computed(() => store.state.user.user)
        // const profile = computed(() => store.state.offers.profile)

        return { }
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
