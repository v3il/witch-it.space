<template>
  <div class="wis-profile-view wit-flex--align-center wit-position--relative">
    <div class="wis-profile-view__icons">
      <b-tooltip :label="steamGuardStatusTooltipText" class="wis-profile-view__icon" square>
        <div class="wit-flex wit-flex--center wit-block--full-height">
          <i class="mdi mdi-18px" :class="[steamGuardStatusClass, steamGuardStatusIcon]" />
        </div>
      </b-tooltip>

      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-profile-view__icon" square>
        <div class="wit-flex wit-flex--center wit-block--full-height">
          <i class="mdi mdi-swap-horizontal-circle-outline mdi-18px" :class="allowMaterialsReplacementClass" />
        </div>
      </b-tooltip>
    </div>

    <img
      :src="avatarUrl"
      alt="Avatar"
      class="wit-offset-bottom--xs wis-profile-view__avatar wit-block wit-offset-left--auto wit-offset-right--auto"
    >

    <h5 class="wit-font-size--sm wit-text--overflow wit-text--center">
      {{ profile.displayName }}
    </h5>

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

    <ProfileScale :profile="profile" @click="onScaleClick" />
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
        },

        steamGuardStatusIcon () {
            return this.profile.isGuardProtected ? 'mdi-shield-check' : 'mdi-shield-remove'
        },

        steamGuardStatusClass () {
            return this.profile.isGuardProtected ? 'wit-color--success' : 'wit-color--danger'
        },

        steamGuardStatusTooltipText () {
            const id = this.profile.isGuardProtected ? 'UserView_SteamGuardEnabled' : 'UserView_SteamGuardDisabled'
            return this.$t(id)
        },

        allowMaterialsReplacementClass () {
            return this.profile.allowMaterialsReplacement ? 'wit-color--success' : 'wit-color--danger'
        },

        allowMaterialsReplacementTooltipText () {
            const id = this.profile.allowMaterialsReplacement ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled'
            return this.$t(id)
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
    padding: var(--offset-sm);
}

.wis-profile-view__avatar {
    $avatar-size: 50px;

    border-radius: var(--offset-xxs);
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

.wis-profile-view__icon {
    border: 1px solid var(--user-view-border);
    border-radius: 50%;
    width: var(--offset-lg);
    height: var(--offset-lg);
}

.wis-profile-view__icons {
    position: absolute;
    top: var(--offset-xs);
    right: var(--offset-xs);
    border-radius: var(--offset-md);
}
</style>
