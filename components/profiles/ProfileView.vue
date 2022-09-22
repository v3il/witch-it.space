<template>
  <div class="wis-user-view">
    <div class="wis-user-view__section wit-flex wit-flex--align-center wit-flex--column">
      <UserAvatar :user="profile" class="wis-user-view__avatar wit-offset-bottom--sm" />

      <h5 class="wit-font-size--sm wit-text--overflow wit-offset-bottom--sm">
        {{ profile.displayName }}
      </h5>
    </div>

    <div class="wis-user-view__tags">
      <b-taglist class="wit-flex--justify-center">
        <b-tag class="wis-user-view__tag" :class="isVerifiedTagClass" rounded>
          <div class="wit-flex wit-flex--align-center">
            <i class="mdi wit-offset-right--xxs" :class="isVerifiedIconClass" /> {{ $t('Verification') }}
          </div>
        </b-tag>

        <b-tag class="wis-user-view__tag" :class="hasSteamGuardTagClass" rounded>
          <div class="wit-flex wit-flex--align-center">
            <i class="mdi wit-offset-right--xxs" :class="hasSteamGuardIconClass" /> Steam Guard
          </div>
        </b-tag>
      </b-taglist>
    </div>

    <div class="wit-flex wis-user-view_buttons">
      <b-button type="is-ghost" tag="nuxt-link" :to="marketUrl" class="wis-user-view_button">
        {{ $t('Market') }}
        <span v-if="profile.marketSize" class="wit-color--muted wit-font-size--xxs">({{ profile.marketSize }})</span>
      </b-button>

      <b-button type="is-ghost" tag="nuxt-link" :to="wishlistUrl" class="wis-user-view_button">
        {{ $t('Wishlist') }}
        <span v-if="profile.wishlistSize" class="wit-color--muted wit-font-size--xxs">({{ profile.wishlistSize }})</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
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
        UserAvatar
    },

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const isVerified = computed(() => props.profile.isVerified)
        const isVerifiedTagClass = computed(() => isVerified.value ? 'success' : 'danger')
        const isVerifiedIconClass = computed(() => isVerified.value ? 'mdi-check' : 'mdi-close')

        const hasSteamGuard = computed(() => props.profile.hasSteamGuard)
        const hasSteamGuardTagClass = computed(() => hasSteamGuard.value ? 'success' : 'danger')
        const hasSteamGuardIconClass = computed(() => hasSteamGuard.value ? 'mdi-check' : 'mdi-close')

        return { isVerifiedTagClass, isVerifiedIconClass, hasSteamGuardTagClass, hasSteamGuardIconClass }
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
}

.wis-user-view__section {
    padding: 32px 32px 0;
}

.wis-user-view__avatar {
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 16px;
}

.wis-user-view__tags {
    padding: 0 4px;
    margin-bottom: 24px;
}

.wis-user-view__tag {
    --icon-color: #fff;

    background-color: #334155;
    margin-left: 4px;
    margin-right: 4px !important;
    color: var(--muted-text-color);

    & .mdi {
        font-size: 16px;
        line-height: 16px;
        color: var(--icon-color);
    }

    &.success {
        --icon-color: var(--success);
    }

    &.danger {
        --icon-color: var(--danger);
    }
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
</style>
