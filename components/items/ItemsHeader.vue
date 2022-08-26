<template>
  <HeaderPanel>
    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <Title :title="$t('Items_Title')" />

      <Description icon-name="view-grid">
        {{ $t('Wishlist_LastUpdate') }}: {{ itemsCount }}
      </Description>
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { HeaderActions, HeaderTitle, LastUpdate } from '@/components/offers/header'
import { UserAvatar } from '@/components/user'
import { HeaderPanel } from '@/components/basic'
import { Title, Description } from '@/components/basic/header'

export default {
    name: 'UserHeader',

    components: {
        HeaderTitle,
        HeaderActions,
        LastUpdate,
        UserAvatar,
        HeaderPanel,
        Title,
        Description
    },

    setup (props) {
        const { $itemsService } = useContext()
        const itemsCount = computed(() => $itemsService.count)

        // const authorizedUser = computed(() => store.state.user.user)
        // const profile = computed(() => store.state.offers.profile)

        return { itemsCount }
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
