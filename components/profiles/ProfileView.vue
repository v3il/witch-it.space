<template>
  <div class=" wit-overflow--hidden wis-profile-view wit-background--content wit-position--relative wit-cursor--pointer wit-flex wit-flex--column wit-flex--align-center" @click="onProfileClick">
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

    <div>
      <b-button
        v-if="profile.steamProfileUrl"
        type="is-link"
        tag="a"
        :href="profile.steamProfileUrl"
        target="_blank"
        class="wit-offset-bottom--xs wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
        @click.stop
      >
        <b-icon size="is-small" class="is-size-5" icon="steam" />
      </b-button>

      <b-button
        v-if="profile.discordDMUrl"
        type="is-link"
        tag="a"
        :href="profile.discordDMUrl"
        target="_blank"
        class="wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
        @click.stop
      >
        <b-icon size="is-small" class="is-size-5" icon="discord" />
      </b-button>
    </div>

    <ProfileScale :profile="profile" />

    <div>
      <b-button
        v-if="profile.steamProfileUrl"
        type="is-link"
        tag="a"
        :href="profile.steamProfileUrl"
        target="_blank"
        class="wit-offset-bottom--xs wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
        @click.stop
      >
        <div class="wit-flex wit-flex--column">
          {{ profile.ordersCount }}
          Orders
        </div>
      </b-button>

      <b-button
        v-if="profile.discordDMUrl"
        type="is-link"
        tag="a"
        :href="profile.discordDMUrl"
        target="_blank"
        class="wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
        @click.stop
      >
        <div class="wit-flex wit-flex--column">
          {{ profile.wishlistCount }}
          Wishlisted
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
import { buildAvatarUrl, buildUserMarketUrl } from '@/utils'
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
