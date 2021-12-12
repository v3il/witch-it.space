<template>
  <div class=" wit-overflow--hidden wis-profile-view wit-background--content wit-position--relative wit-cursor--pointer wit-flex wit-flex--column wit-flex--align-center">
    <img
      :src="avatarUrl"
      alt="Avatar"
      class="wit-offset-bottom--xs wit-flex--align-self-start1 wis-profile-view__avatar"
    >

    <h5 class="wit-color--primary wit-offset-bottom--xs wit-font-size--sm wit-text--overflow">
      {{ profile.displayName }}
      <b-icon v-if="profile.isGuardProtected" size="is-small" class="is-size-6 wit-color--success wit-offset-left--xxs" icon="shield-check" />
      <b-icon v-else size="is-small" class="is-size-6 wit-color--danger wit-offset-left--xxs" icon="shield-remove" />
    </h5>

    <div class="wit-flex wit-block--full-width wit-offset-bottom--xs">
      <b-button
        type="is-link"
        tag="router-link"
        :to="marketUrl"
        class="wit-transition--background"
        style="padding: 8px; height: auto; background: transparent; border-right: 1px solid #2e3648; flex: 1 0 50%;"
      >
        <div class="wit-flex wit-flex--column">
          <span class="wit-font-weight--700">{{ profile.ordersCount }}</span>
          <span class="wit-color--muted">Orders</span>
        </div>
      </b-button>

      <b-button
        type="is-link"
        tag="router-link"
        :to="wishlistUrl"
        class="wit-transition--background wit-flex wit-flex--center"
        style="padding: 8px; height: auto; background: transparent; flex: 1 0 50%;"
      >
        <div class="wit-flex wit-flex--column">
          <span class="wit-font-weight--700">{{ profile.wishlistCount }}</span>
          <span class="wit-color--muted">Wishlisted</span>
        </div>
      </b-button>
    </div>

    <ProfileScale :profile="profile" class="wit-offset-bottom--sm" />

    <div class="wit-flex">
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
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="steam" />
          Steam
        </div>
      </b-button>

      <b-button
        type="is-link"
        tag="a"
        size="is-small"
        :href="profile.discordDMUrl"
        target="_blank"
        class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
      >
        <div class="wit-flex wit-flex--align-center">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="arrow-decision" />
          Send offer
        </div>
      </b-button>

      <b-button
        v-if="profile.discordDMUrl"
        type="is-link"
        tag="a"
        size="is-small"
        :href="profile.discordDMUrl"
        target="_blank"
        class="wit-transition--background wit-flex wit-flex--center"
      >
        <div class="wit-flex wit-flex--align-center">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="discord" />
          Discord
        </div>
      </b-button>
    </div>

    <!--    <div class="wit-flex">-->
    <!--      <div class="wit-offset-right&#45;&#45;xs wit-flex__item&#45;&#45;grow wit-overflow&#45;&#45;hidden">-->
    <!--        <h5 class="wit-color&#45;&#45;primary wit-offset-bottom&#45;&#45;xs wit-font-size&#45;&#45;sm wit-text&#45;&#45;overflow">-->
    <!--          {{ profile.displayName }}-->
    <!--        </h5>-->
    <!--        <p class="wit-offset-bottom&#45;&#45;xs">-->
    <!--          {{ $t('OffersAvailable', [profile.offersCount]) }}-->
    <!--        </p>-->
    <!--        <p class="wit-flex wit-flex&#45;&#45;align-center">-->
    <!--          Steam Guard:-->
    <!--          <b-icon v-if="profile.isGuardProtected" size="is-small" class="is-size-6 wit-color&#45;&#45;success wit-offset-left&#45;&#45;xxs" icon="shield-check" />-->
    <!--          <b-icon v-else size="is-small" class="is-size-6 wit-color&#45;&#45;danger wit-offset-left&#45;&#45;xxs" icon="shield-remove" />-->
    <!--        </p>-->
    <!--      </div>-->

    <!--      <div class="wit-flex wit-flex&#45;&#45;column">-->
    <!--        <b-button-->
    <!--          v-if="profile.steamProfileUrl"-->
    <!--          type="is-link"-->
    <!--          tag="a"-->
    <!--          :href="profile.steamProfileUrl"-->
    <!--          target="_blank"-->
    <!--          class="wit-offset-bottom&#45;&#45;xs wit-transition&#45;&#45;background wit-flex wit-flex&#45;&#45;center wis-profile-view__social-btn"-->
    <!--          @click.stop-->
    <!--        >-->
    <!--          <b-icon size="is-small" class="is-size-5" icon="steam" />-->
    <!--        </b-button>-->

    <!--        <b-button-->
    <!--          v-if="profile.discordDMUrl"-->
    <!--          type="is-link"-->
    <!--          tag="a"-->
    <!--          :href="profile.discordDMUrl"-->
    <!--          target="_blank"-->
    <!--          class="wit-transition&#45;&#45;background wit-flex wit-flex&#45;&#45;center wis-profile-view__social-btn"-->
    <!--          @click.stop-->
    <!--        >-->
    <!--          <b-icon size="is-small" class="is-size-5" icon="discord" />-->
    <!--        </b-button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
// import Card from '@/components/Card'
import { buildAvatarUrl, buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import ProfileScale from '@/components/profiles/ProfileScale'

export default {
    name: 'ProfileView',

    components: {
        ProfileScale
        // Card
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
        onProfileClick () {
            this.$router.push(buildUserMarketUrl(this.profile.id))
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profile-view {
    border-radius: var(--offset-xs);
    min-height: 110px;
    border: 1px solid #36394c;
    padding: var(--offset-xs) var(--offset-sm);
}

.wis-profile-view__avatar {
    $avatar-size: 50px;

    border-radius: 16px;
    //padding: var(--offset-xxs);
    //background-color: var(--gray-200);
    //border: 1px solid var(--gray-300);
    width: $avatar-size;
    height: $avatar-size;
}

.wis-profile-view__social-btn {
    $button-size: var(--offset-lg);

    width: $button-size;
    height: $button-size;
    border-radius: 50%;
}
</style>
