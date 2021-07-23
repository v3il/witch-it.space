<template>
  <div class="wit-overflow--hidden wis-profile-view wit-flex--align-center">
    <img
      :src="avatarUrl"
      alt="Avatar"
      class="wit-offset-bottom--xs wis-profile-view__avatar wit-block wit-offset-left--auto wit-offset-right--auto"
    >

    <div class="wit-flex wit-flex--center wit-offset-bottom--xs">
      <h5 class="wit-font-size--sm wit-text--overflow">
        {{ profile.displayName }}
      </h5>

      <b-icon v-if="profile.isGuardProtected" size="is-small" class="is-size-61 wit-color--success wit-offset-left--xxs wit-flex__item--no-shrink" icon="shield-check" />
      <b-icon v-else size="is-small" class="is-size-61 wit-color--danger wit-offset-left--xxs wit-flex__item--no-shrink wit-offset-top--xxs" icon="shield-remove" />
    </div>

    <div class="wit-flex wit-block--full-width wit-offset-bottom--xs">
      <b-button
        type="is-link"
        tag="router-link"
        :to="marketUrl"
        class="wis-profile-view__stat-button"
      >
        <div class="wit-flex wit-flex--column">
          <span class="wit-font-weight--700">{{ profile.ordersCount }}</span>
          <span class="wit-color--muted">{{ $t('Profiles_StatButtonOrders') }}</span>
        </div>
      </b-button>

      <b-button
        type="is-link"
        tag="router-link"
        :to="wishlistUrl"
        class="wis-profile-view__stat-button"
      >
        <div class="wit-flex wit-flex--column">
          <span class="wit-font-weight--700">{{ profile.wishlistCount }}</span>
          <span class="wit-color--muted">{{ $t('Profiles_StatButtonWishlist') }}</span>
        </div>
      </b-button>
    </div>

    <ProfileScale :profile="profile" class="wit-offset-bottom--sm" @click="onScaleClick" />

    <div class="wit-flex wit-flex--justify-center">
      <b-button
        v-if="profile.steamProfileUrl"
        type="is-link"
        tag="a"
        size="is-small"
        :href="profile.steamProfileUrl"
        target="_blank"
        class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
      >
        <div class="wit-flex wit-flex--align-center">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs1" icon="steam" />
          <!--          Steam-->
        </div>
      </b-button>

      <b-button
        v-if="profile.discordDMUrl"
        type="is-link"
        tag="a"
        size="is-small"
        :href="profile.discordDMUrl"
        target="_blank"
        class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
      >
        <div class="wit-flex wit-flex--align-center">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs1" icon="discord" />
          <!--          Discord-->
        </div>
      </b-button>

      <b-button
        v-if="profile.steamTradeLink"
        type="is-link"
        tag="a"
        size="is-small"
        :href="profile.steamTradeLink"
        target="_blank"
        class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
      >
        <div class="wit-flex wit-flex--align-center">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="arrow-decision" />
          {{ $t('Profiles_Trade') }}
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ProfileScale from '@/components/profiles/ProfileScale'
import { buildRarityFilterUrl } from '@/utils/buildUrls'

export default {
    name: 'ProfileView',

    components: {
        ProfileScale
    },

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    computed: {
        marketUrl () {
            return buildUserMarketUrl(this.profile.id)
        },

        wishlistUrl () {
            return buildUserWishlistUrl(this.profile.id)
        },

        avatarUrl () {
            return buildAvatarUrl(this.profile.avatarId)
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
.wis-profile-view {
    border-radius: var(--offset-xs);
    border: 1px solid #36394c;
    padding: var(--offset-xs) var(--offset-sm);
}

.wis-profile-view__avatar {
    $avatar-size: 50px;

    border-radius: var(--offset-sm);
    width: $avatar-size;
    height: $avatar-size;
}

.wis-profile-view__social-btn {
    $button-size: var(--offset-lg);

    width: $button-size;
    height: $button-size;
    border-radius: 50%;
}

.wis-profile-view__stat-button {
    padding: var(--offset-xs);
    height: auto;
    background-color: transparent;
    transition: background-color var(--default-transition);
    flex: 1 0 50%;

    &:hover {
        background-color: var(--dropdown-item-hover-background-color);
    }

    &:not(:last-child) {
        border-right: 1px solid #2e3648;
    }
}
</style>
