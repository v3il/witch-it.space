<template>
  <div class="wis-user-card">
    <div class="wit-flex wit-flex--align-center wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <img :src="userAvatarUrl" alt="" style="width: 64px; height: 64px; border-radius: 8px;">

      <div class="wit-offset-left--sm wit-flex__item--grow">
        <HeaderTitle :mode="mode" :profile-name="profileName" />

        <p style="color: rgb(148, 163, 184); line-height: 24px;" class="wit-flex wit-flex--align-center">
          <i class="mdi mdi-bell mdi-18px wit-offset-right--xs" />
          {{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}
        </p>
      </div>

      <HeaderActions :profile="profile" :is-own-profile="isOwnUserProfile" :mode="mode" />

      <!--      <div class="wit-flex wit-flex__item&#45;&#45;no-shrink wit-offset-top&#45;&#45;sm wit-offset-bottom&#45;&#45;sm">-->
      <!--        <b-button v-if="isOwnUserProfile" type="is-primary" class="wis-btn&#45;&#45;rounded" tag="nuxt-link" :to="manageButtonUrl">-->
      <!--          <i class="mdi mdi-18px wit-offset-right&#45;&#45;xs" :class="manageButtonIconClass" />-->
      <!--          Manage {{ mode }}-->
      <!--        </b-button>-->

      <!--        <template v-else>-->
      <!--          <b-button-->
      <!--            v-tooltip="'Discord is not connected'"-->
      <!--            type="is-secondary"-->
      <!--            class="wit-offset-right&#45;&#45;xs wis-btn&#45;&#45;rounded"-->
      <!--            tag="a"-->
      <!--            target="_blank"-->
      <!--            :href="discordUrl"-->
      <!--            :disabled="!isDiscordConnected"-->
      <!--          >-->
      <!--            <i class="mdi mdi-discord mdi-18px wit-offset-right&#45;&#45;xs" />-->
      <!--            Message-->
      <!--          </b-button>-->

      <!--          <b-button type="is-primary" class="wis-btn&#45;&#45;rounded">-->
      <!--            <i class="mdi mdi-format-vertical-align-center mdi-18px wit-offset-right&#45;&#45;xs" />-->
      <!--            Send a trade offer-->
      <!--          </b-button>-->
      <!--        </template>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { buildAvatarUrl, buildUserManageMarketUrl, buildUserManageWishlistUrl } from '@/utils/index.js'
import { OfferTabModes } from '@/domain/index.js'
import { HeaderTitle, HeaderActions } from '@/components/offers/header'

export default {
    name: 'UserHeader',

    components: {
        HeaderTitle,
        HeaderActions
    },

    props: {
        mode: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const { $t } = useContext()
        const store = useStore()

        console.log($t)

        console.log($t('Wishlist_LastUpdate'))

        const isMarket = computed(() => props.mode === OfferTabModes.MARKET)
        const authorizedUser = computed(() => store.state.user.user)
        const profile = computed(() => store.state.offers.profile)

        const isOwnUserProfile = computed(() => authorizedUser.value.id === profile.value.id)
        const userAvatarUrl = computed(() => buildAvatarUrl(profile.value.avatarId))
        const profileName = computed(() => profile.value.displayName)

        const formattedLastUpdate = computed(() => {
            const updateTime = isMarket.value ? profile.value.marketUpdateTime : profile.value.wishlistUpdateTime

            if (!updateTime) {
                return $t('Time_Never')
            }

            const date = new Date(updateTime).toLocaleDateString()
            const time = new Date(updateTime).toLocaleTimeString()

            return date + ' ' + time
        })

        return {
            userAvatarUrl,
            profileName,
            isOwnUserProfile,
            profile,
            formattedLastUpdate
        }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card {
    background-color: var(--dark-gray);
    //height: 300px;
    border-bottom: 1px solid var(--border-color);
    padding: 40px 32px;
}
</style>
