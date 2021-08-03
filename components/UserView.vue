<template>
  <div class="wis-profile-view wit-background--content wit-position--relative">
    <div style="border-bottom: 1px solid #36394c; padding: 24px;">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wis-profile-view__avatar wit-offset-bottom--sm"
      >

      <h5 class="wit-offset-bottom--sm wit-font-size--sm wit-text--overflow wit-text--center">
        {{ profile.displayName }}
      </h5>

      <ProfileScale :profile="profile" @click="onScaleClick" />
    </div>

    <div style="border-bottom: 1px solid #36394c; padding: 24px;">
      <b-button type="is-primary" class="wit-transition wit-offset-bottom--sm1" expanded @click="() => {}">
        Send trade offer
      </b-button>
    </div>

    <div style="border-bottom: 1px solid #36394c; padding: 4px;">
      <div class="wit-flex wit-block--full-width wit-offset-bottom--xs1">
        <b-button
          type="is-link"
          tag="router-link"
          :to="marketUrl"
          class="wis-profile-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-steam mdi-24px" />
            <!--            <b-icon size="is-small1" class="is-size-41 wit-offset-right&#45;&#45;none wit-offset-bottom&#45;&#45;xxs" icon="steam" />-->
            <span class="wit-color--muted">Steam</span>
          </div>
        </b-button>

        <b-button
          type="is-link"
          tag="router-link"
          :to="wishlistUrl"
          class="wis-profile-view__stat-button"
        >
          <div class="wit-flex wit-flex--column wit-flex--align-center">
            <i class="mdi mdi-discord mdi-24px" />
            <!--            <b-icon size="is-small1" class="is-size-41 wit-offset-right&#45;&#45;none wit-offset-bottom&#45;&#45;xxs" icon="discord" />-->
            <span class="wit-color--muted">Discord</span>
          </div>
        </b-button>
      </div>
    </div>

    <div v-if="profile.wishlistNote" style="padding: 24px;">
      <h5 class="wit-font-weight--700 wit-font-size--sm wit-offset-bottom--xs">
        Wishlist note
      </h5>

      <p class="wit-line-height--md wit-color--muted">
        {{ profile.wishlistNote }}
      </p>
    </div>

    <div class="tttttt">
      <b-tooltip :label="steamGuardStatusTooltipText" class="ttt" square>
        <i class="mdi mdi-24px" :class="[steamGuardStatusClass, steamGuardStatusIcon]" />
      </b-tooltip>

      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="ttt" square>
        <i class="mdi mdi-swap-horizontal-circle-outline mdi-24px" :class="allowMaterialsReplacementClass" />
      </b-tooltip>
    </div>
  </div>
</template>

<script>
// import Card from '@/components/Card'
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ProfileScale from '@/components/profiles/ProfileScale'
import { buildRarityFilterUrl } from '@/utils/buildUrls'

export default {
    name: 'UserView',

    components: {
        // Card
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
.wis-profile-view {
    border-radius: var(--offset-xxs);
    min-height: 110px;
}

.wis-profile-view__avatar {
    $avatar-size: 75px;

    border-radius: var(--offset-xs);
    width: $avatar-size;
    height: $avatar-size;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.wis-profile-view__social-btn {
    $button-size: var(--offset-lg);

    width: $button-size;
    height: $button-size;
    border-radius: 50%;
}

.wis-profile-view__stat-button {
    padding: 0;
    height: auto;
    background-color: transparent;
    transition: background-color var(--default-transition);
    flex: 1 0 50%;

    &:hover {
        background-color: var(--dropdown-item-hover-background-color);
    }

    &:not(:last-child) {
        border-right: 1px solid #36394c;
    }
}

.ttt {
    border: 1px solid #36394c;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.tttttt {
    position: absolute;
    top: 8px;
    right: 8px;
    border-radius: 24px;
}

</style>

<style>
.ttt .tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
