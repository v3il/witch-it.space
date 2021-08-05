<template>
  <div class="wis-user-view wit-position--relative">
    <div class="wis-user-view__section">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wis-user-view__avatar wit-offset-bottom--sm"
      >

      <h5 class="wit-offset-bottom--sm wit-font-size--sm wit-text--overflow wit-text--center">
        {{ profile.displayName }}
      </h5>

      <ProfileScale :profile="profile" @click="onScaleClick" />
    </div>

    <div class="wis-user-view__section">
      <b-button
        type="is-primary"
        tag="a"
        target="_blank"
        :href="profile.steamTradeLink"
        class="wit-transition"
        expanded
      >
        {{ $t('UserView_SendTradeOffer') }}
      </b-button>
    </div>

    <div class="wis-user-view__section wis-user-view__section--xs">
      <div class="wit-flex wit-block--full-width">
        <b-button
          type="is-link"
          tag="router-link"
          :to="marketUrl"
          class="wis-user-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-steam mdi-24px" />
            <span class="wit-color--muted">Steam</span>
          </div>
        </b-button>

        <b-button
          type="is-link"
          tag="router-link"
          :to="wishlistUrl"
          class="wis-user-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-discord mdi-24px" />
            <span class="wit-color--muted">Discord</span>
          </div>
        </b-button>
      </div>
    </div>

    <div v-if="profile.wishlistNote" class="wis-user-view__section">
      <h5 class="wit-font-weight--700 wit-font-size--sm wit-offset-bottom--xs">
        {{ $t('UserView_NoteTitle') }}
      </h5>

      <p class="wit-line-height--md wit-color--muted">
        {{ profile.wishlistNote }}
      </p>
    </div>

    <div class="wis-user-view__icons">
      <b-tooltip :label="steamGuardStatusTooltipText" class="wis-user-view__icon" square>
        <div class="wit-flex wit-flex--center wit-block--full-height">
          <i class="mdi mdi-24px" :class="[steamGuardStatusClass, steamGuardStatusIcon]" />
        </div>
      </b-tooltip>

      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-user-view__icon" square>
        <div class="wit-flex wit-flex--center wit-block--full-height">
          <i class="mdi mdi-swap-horizontal-circle-outline mdi-24px" :class="allowMaterialsReplacementClass" />
        </div>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ProfileScale from '@/components/profiles/ProfileScale'
import { buildRarityFilterUrl } from '@/utils/buildUrls'

export default {
    name: 'UserView',

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
        avatarUrl () {
            return buildAvatarUrl(this.profile.avatarId)
        },

        marketUrl () {
            return buildUserMarketUrl(this.profile.id)
        },

        wishlistUrl () {
            return buildUserWishlistUrl(this.profile.id)
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
.wis-user-view {
    padding: 0 var(--offset-md);
    border-radius: var(--offset-xxs);
}

.wis-user-view__section {
    padding: var(--offset-md) 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--user-view-border);
    }
}

.wis-user-view__section--xs {
    padding: 4px 0;
}

.wis-user-view__avatar {
    $avatar-size: 75px;

    border-radius: var(--offset-xs);
    width: $avatar-size;
    height: $avatar-size;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.wis-user-view__social-btn {
    $button-size: var(--offset-lg);

    width: $button-size;
    height: $button-size;
    border-radius: 50%;
}

.wis-user-view__stat-button {
    padding: 0;
    height: auto;
    background-color: transparent;
    transition: background-color var(--default-transition);
    flex: 1 0 50%;

    &:hover {
        background-color: var(--dropdown-item-hover-background-color);
    }

    &:not(:last-child) {
        border-right: 1px solid var(--user-view-border);
    }
}

.wis-user-view__icon {
    border: 1px solid var(--user-view-border);
    border-radius: 50%;
    width: var(--offset-xlg);
    height: var(--offset-xlg);
}

.wis-user-view__icons {
    position: absolute;
    top: var(--offset-xs);
    right: var(--offset-xs);
    border-radius: var(--offset-md);
}

</style>
