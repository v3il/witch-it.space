<template>
  <div class="wis-user-view">
    <!--    <div class="wis-user-view__indicators">-->
    <!--      <i class="mdi mdi-18px mdi-check-decagram-outline wis-user-view__indicator wit-offset-right&#45;&#45;xxs" />-->
    <!--      <i class="mdi mdi-18px mdi-lock-check-outline wis-user-view__indicator" />-->
    <!--    </div>-->

    <div class="wis-user-view__section wit-flex wit-flex--align-center wit-flex--column">
      <UserAvatar :user="profile" class="wis-user-view__avatar wit-offset-bottom--sm" />

      <h5 class="wit-font-size--sm wit-text--overflow wit-offset-bottom--xsm">
        {{ profile.displayName }}
      </h5>

      <span class="wit-color--muted wit-font-size--xxs wit-flex wit-flex--align-center">
        <i class="mdi mdi-16px mdi-check wit-offset-right--xxs wit-color--success" />Verified
        <i class="mdi mdi-16px mdi-close wit-offset-left--xsm wit-offset-right--xxs wit-color--danger" />Steam Guard
      </span>

      <!--      <a type="is-primary is-small" href="/" class="wit-font-size&#45;&#45;xxs">-->
      <!--        Send a trade-->
      <!--      </a>-->
    </div>

    <div class="wit-flex wis-user-view_buttons">
      <b-button type="is-ghost" tag="nuxt-link" :to="marketUrl" class="wis-user-view_button">
        Market
        <span v-if="profile.marketSize" class="wit-color--muted wit-font-size--xxs">({{ profile.marketSize }})</span>
      </b-button>

      <b-button type="is-ghost" tag="nuxt-link" :to="wishlistUrl" class="wis-user-view_button">
        Wishlist
        <span v-if="profile.wishlistSize" class="wit-color--muted wit-font-size--xxs">({{ profile.wishlistSize }})</span>
      </b-button>
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
    <!--    </div>-->

    <!--    <div v-if="!hideTradeButton" class="wis-user-view__section">-->
    <!--      <b-button-->
    <!--        type="is-primary"-->
    <!--        tag="a"-->
    <!--        target="_blank"-->
    <!--        :href="profile.steamTradeLink"-->
    <!--        class="wit-transition"-->
    <!--        :disabled="!profile.steamTradeLink"-->
    <!--        expanded-->
    <!--      >-->
    <!--        {{ $t('UserView_SendTradeOffer') }}-->
    <!--      </b-button>-->
    <!--    </div>-->

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
import { Card } from '@/components/basic/index.js'
import { UserAvatar } from '@/components/user/index.js'
import { User } from '@/domain/models/index.js'

export default {
    name: 'UserView',

    components: {
        // ProfileScale,
        // UserIcons,
        Card,
        UserAvatar
    },

    props: {
        profile: {
            required: true,
            type: Object
        }

        // hideTradeButton: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // },
        //
        // hideSocialButtons: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // },
        //
        // hideIcons: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // },
        //
        // hideStatButtons: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // },
        //
        // hideNote: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // },
        //
        // avatarSize: {
        //     required: false,
        //     type: Number,
        //     default: 60
        // },
        //
        // mode: {
        //     required: true,
        //     type: String
        // }
    },

    setup (props) {
        console.error(props.profile instanceof User)
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
    border-radius: 8px;
    background-color: var(--card-bg-color);
    overflow: hidden;
    position: relative;

    //border: 1px solid #36404f;
    //background-color: rgb(0 0 0 / 0.05);
}

.wis-user-view__section {
    padding: 32px;
}

.wis-user-view__avatar {
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 16px;
}

.wis-user-view_buttons {
    border-top: 1px solid rgba(241, 245, 249, 0.12);
    width: 100%;
}

.wis-user-view_button {
    padding: 16px 0;
    flex-basis: 50%;
    height: auto;
    border-radius: 0;
    color: white !important;
    text-decoration: none !important;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &:first-child {
        border-bottom-left-radius: inherit;
        border-right: 1px solid rgba(241, 245, 249, 0.12);
    }

    &:last-child {
        border-bottom-right-radius: inherit;
    }
}

.wis-user-view__indicators {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 16px;
}

.wis-user-view__indicator {
    color: #2dd4bf;
}
</style>
