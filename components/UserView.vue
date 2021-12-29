<template>
  <div class="wis-user-view wit-background--content wit-position--relative">
    <div class="wis-user-view__section">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wis-user-view__avatar wit-offset-bottom--xs"
        :style="avatarStyles"
      >

      <h5 class="wit-offset-bottom--sm wit-font-size--sm wit-text--overflow wit-text--center">
        {{ profile.displayName }}
      </h5>

      <div v-if="!hideStatButtons" class="wit-offset-bottom--sm">
        <div class="wit-flex wit-block--full-width">
          <b-button
            type="is-link"
            tag="router-link"
            :to="marketUrl"
            class="wis-user-view__stat-button wit-padding-bottom--xxs wit-padding-top--xxs"
          >
            <div class="wit-flex wit-flex--column">
              <span class="wit-font-weight--700">{{ profile.userStat.marketSize }}</span>
              <span class="wit-color--muted">{{ $t('Profiles_StatButtonOrders') }}</span>
            </div>
          </b-button>

          <b-button
            type="is-link"
            tag="router-link"
            :to="wishlistUrl"
            class="wis-user-view__stat-button wit-padding-bottom--xxs wit-padding-top--xxs"
          >
            <div class="wit-flex wit-flex--column">
              <span class="wit-font-weight--700">{{ profile.userStat.wishlistSize }}</span>
              <span class="wit-color--muted">{{ $t('Profiles_StatButtonWishlist') }}</span>
            </div>
          </b-button>
        </div>
      </div>

      <ProfileScale :scale-data="profileScaleData" @click="onScaleClick" />
    </div>

    <div v-if="!hideTradeButton" class="wis-user-view__section">
      <b-button
        type="is-primary"
        tag="a"
        target="_blank"
        :href="profile.steamTradeLink"
        class="wit-transition"
        :disabled="!profile.steamTradeLink"
        expanded
      >
        {{ $t('UserView_SendTradeOffer') }}
      </b-button>
    </div>

    <div v-if="!hideSocialButtons" class="wis-user-view__section wis-user-view__section--xs">
      <div class="wit-flex wit-block--full-width">
        <b-button
          :disabled="!profile.steamProfileUrl"
          type="is-link"
          tag="a"
          :href="profile.steamProfileUrl"
          target="_blank"
          class="wis-user-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-steam mdi-24px" />
            <span class="wit-color--muted">Steam</span>
          </div>
        </b-button>

        <b-button
          :disabled="!profile.discordDMUrl"
          type="is-link"
          tag="a"
          :href="profile.discordDMUrl"
          target="_blank"
          class="wis-user-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-discord mdi-24px" />
            <span class="wit-color--muted">Discord</span>
          </div>
        </b-button>
      </div>
    </div>

    <div v-if="$slots.note && !hideNote" class="wis-user-view__section">
      <slot name="note" />
    </div>

    <div v-if="!hideIcons" class="wis-user-view__section">
      <UserIcons :profile="profile" />
    </div>
  </div>
</template>

<script>
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ProfileScale from '@/components/profiles/ProfileScale'
import { buildRarityFilterUrl } from '@/utils/buildUrls'
import UserIcons from '@/components/UserIcons'

export default {
    name: 'UserView',

    components: {
        ProfileScale,
        UserIcons
    },

    props: {
        profile: {
            required: true,
            type: Object
        },

        hideTradeButton: {
            required: false,
            type: Boolean,
            default: false
        },

        hideSocialButtons: {
            required: false,
            type: Boolean,
            default: false
        },

        hideIcons: {
            required: false,
            type: Boolean,
            default: false
        },

        hideStatButtons: {
            required: false,
            type: Boolean,
            default: false
        },

        hideNote: {
            required: false,
            type: Boolean,
            default: false
        },

        avatarSize: {
            required: false,
            type: Number,
            default: 75
        }
    },

    computed: {
        avatarUrl () {
            return buildAvatarUrl(this.profile.avatarId)
        },

        marketUrl () {
            return buildUserMarketUrl(this.profile.id)
        },

        wishlistUrl () {
            return buildUserWishlistUrl(this.profile.id)
        },

        avatarStyles () {
            return {
                '--avatar-size': `${this.avatarSize}px`
            }
        },

        // steamGuardStatusIcon () {
        //     return this.profile.isGuardProtected ? 'mdi-shield-check' : 'mdi-shield-remove'
        // },
        //
        // steamGuardStatusClass () {
        //     return this.profile.isGuardProtected ? 'wit-color--success' : 'wit-color--danger'
        // },
        //
        // steamGuardStatusTooltipText () {
        //     const id = this.profile.isGuardProtected ? 'UserView_SteamGuardEnabled' : 'UserView_SteamGuardDisabled'
        //     return this.$t(id)
        // },

        // allowMaterialsReplacementClass () {
        //     return this.profile.allowMaterialsReplacement ? 'wit-color--success' : 'wit-color--danger'
        // },
        //
        // allowMaterialsReplacementTooltipText () {
        //     const id = this.profile.allowMaterialsReplacement ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled'
        //     return this.$t(id)
        // },

        profileScaleData () {
            const stat = this.profile.userStat

            return {
                total: stat.marketSize,
                common: stat.marketSizeCommon,
                uncommon: stat.marketSizeUncommon,
                rare: stat.marketSizeRare,
                veryRare: stat.marketSizeVeryRare,
                whimsical: stat.marketSizeWhimsical
            }
        }
    },

    methods: {
        onScaleClick (rarity) {
            this.$router.push(buildRarityFilterUrl(this.profile.id, rarity))
        }
    }
}
</script>

<style scoped lang="scss">
.wis-user-view {
    padding: 0 var(--offset-md);
    border-radius: var(--offset-xxs);
}

.wis-user-view__section {
    padding: var(--offset-sm) 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--user-view-border);
    }
}

.wis-user-view__section--xs {
    padding: 4px 0;
}

.wis-user-view__avatar {
    border-radius: var(--offset-xxs);
    width: var(--avatar-size);
    height: var(--avatar-size);
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.wis-user-view__stat-button {
    padding: var(--offset-xxs);
    height: auto;
    transition: background-color var(--default-transition);
    flex: 1 0 50%;

    &,
    &:disabled {
        background-color: transparent;
    }

    &:hover {
        background-color: var(--dropdown-item-hover-background-color);
    }

    &:not(:last-child) {
        border-right: 1px solid var(--user-view-border);
    }
}
</style>
