<template>
  <div class="wis-user-view wit-background--content wit-position--relative">
    <div class="wis-user-view__section wit-flex wit-flex--align-center wit-padding-top--none">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wis-user-view__avatar"
        :style="avatarStyles"
      >

      <div class="wit-offset-left--sm" style="min-width: 0;">
        <h5 class="wit-font-size--sm wit-text--overflow wit-text--center1 wit-offset-bottom--xxs wit-flex" :class="titleOffsetClass">
          <span class="wit-flex__item--grow1">{{ profile.displayName }}</span>
          <i class="mdi mdi-shield-check mdi-16px wit-offset-left--xs wit-flex__item--no-shrink wit-color--success" />
        </h5>

        <p v-tooltip="$t('Wishlist_LastUpdate')" class="wit-color--muted wit-line-height--sm wit-flex wit-flex--align-center">
          <i class="mdi mdi-update mdi-18px wit-offset-right--xxs" />
          {{ formattedLastUpdate }}
        </p>
      </div>
    </div>

    <!--    <div v-if="!hideSocialButtons" class="wis-user-view__section wis-user-view__section&#45;&#45;xs wis-user-view__section1">-->
    <!--      <div class="wit-flex wit-block&#45;&#45;full-width">-->
    <!--        <b-button-->
    <!--          :disabled="!steamProfileURL"-->
    <!--          type="is-link"-->
    <!--          tag="a"-->
    <!--          :href="steamProfileURL"-->
    <!--          target="_blank"-->
    <!--          class="wis-user-view__stat-button"-->
    <!--        >-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;column1 wit-flex&#45;&#45;align-center">-->
    <!--            <i class="mdi mdi-steam mdi-20px wit-offset-right&#45;&#45;xs" />-->
    <!--            <span class="wit-color&#45;&#45;muted">Steam</span>-->
    <!--          </div>-->
    <!--        </b-button>-->

    <!--        <b-button-->
    <!--          :disabled="!discordURL"-->
    <!--          type="is-link"-->
    <!--          tag="a"-->
    <!--          :href="discordURL"-->
    <!--          target="_blank"-->
    <!--          class="wis-user-view__stat-button"-->
    <!--        >-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;colum1n wit-flex&#45;&#45;align-center">-->
    <!--            <i class="mdi mdi-discord mdi-20px wit-offset-right&#45;&#45;xs" />-->
    <!--            <span class="wit-color&#45;&#45;muted">Discord</span>-->
    <!--          </div>-->
    <!--        </b-button>-->
    <!--      </div>-->
    <!--  </div>-->

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

  <!--    <div v-if="!hideIcons" class="wis-user-view__section">-->
  <!--      <UserIcons :profile="profile" />-->
  <!--    </div>-->

  <!--    <div v-if="note && !hideNote" class="wis-user-view__section">-->
  <!--      <h5 class="wit-font-weight&#45;&#45;700 wit-font-size&#45;&#45;xs wit-offset-bottom&#45;&#45;xs">-->
  <!--        {{ $t('UserView_NoteTitle') }}-->
  <!--      </h5>-->

  <!--      <p class="wit-line-height&#45;&#45;md" style="white-space: pre-line; margin-top: -1em;">-->
  <!--        {{ note }}-->
  <!--      </p>-->
  <!--    </div>-->
  </div>
</template>

<script>
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils/index.js'
import ProfileScale from '@/components/profiles/ProfileScale.vue'
import { buildRarityFilterUrl } from '@/utils/buildUrls.js'
import UserIcons from '@/components/user/UserIcons.vue'

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
            default: 60
        },

        mode: {
            required: true,
            type: String
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

        discordURL () {
            return this.profile.discordId ? `discord:///channels/@me/${this.profile.discordId}` : null
        },

        steamProfileURL () {
            return this.profile.steamId ? `https://steamcommunity.com/profiles/${this.profile.steamId}` : null
        },

        avatarStyles () {
            return {
                '--avatar-size': `${this.avatarSize}px`
            }
        },

        titleOffsetClass () {
            return {
                'wit-offset-top--xs1 wit-offset-bottom--xs1': this.avatarSize <= 50,
                'wit-offset-top--sm1 wit-offset-bottom--sm1': this.avatarSize > 50
            }
        },

        profileScaleData () {
            const stat = this.profile

            if (this.isMarketMode) {
                return {
                    total: stat.marketSize,
                    common: stat.marketSizeCommon,
                    uncommon: stat.marketSizeUncommon,
                    rare: stat.marketSizeRare,
                    veryRare: stat.marketSizeVeryRare,
                    whimsical: stat.marketSizeWhimsical
                }
            }

            return {
                total: stat.wishlistSize,
                common: stat.wishlistSizeCommon,
                uncommon: stat.wishlistSizeUncommon,
                rare: stat.wishlistSizeRare,
                veryRare: stat.wishlistSizeVeryRare,
                whimsical: stat.wishlistSizeWhimsical
            }
        },

        isMarketMode () {
            return this.mode === 'market'
        },

        note () {
            return this.isMarketMode ? this.profile.marketNote : this.profile.wishlistNote
        },

        formattedLastUpdate () {
            const updateTime = this.isMarketMode ? this.profile.marketUpdateTime : this.profile.wishlistUpdateTime

            if (!updateTime) {
                return this.$t('Time_Never')
            }

            const date = new Date(updateTime).toLocaleDateString()
            const time = new Date(updateTime).toLocaleTimeString()

            return date + ' ' + time
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
    //padding: 0 var(--offset-md);
    border-radius: var(--offset-xxs);
}

.wis-user-view__section {
    padding: var(--offset-sm) 0;

    &:first-child {
        padding-top: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--user-view-border);
    }
}

.wis-user-view__section--xs {
    padding: var(--offset-xxs) 0;
}

.wis-user-view__avatar {
    border-radius: var(--offset-xxs);
    width: var(--avatar-size);
    height: var(--avatar-size);
    //margin-left: auto;
    //margin-right: auto;
    display: block;
}

.wis-user-view__stat-button {
    padding: var(--offset-xs) var(--offset-xs);
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
