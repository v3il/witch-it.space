<template>
  <div class="wis-profile-view wit-background--content" @click="onProfileClick">
    <div style="border-bottom: 1px solid #36394c; padding: 24px;">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wis-profile-view__avatar wit-offset-bottom--sm"
      >

      <h5 class="wit-color--primary1 wit-offset-bottom--xs1 wit-font-size--sm wit-text--overflow wit-text--center">
        {{ profile.displayName }}
      </h5>
    </div>

    <div class="wit-flex">
      <div class="wit-offset-right--xs wit-flex__item--grow wit-overflow--hidden">
        <!--        <p class="wit-offset-bottom&#45;&#45;xs">-->
        <!--          {{ $t('OffersAvailable', [profile.offersCount]) }}-->
        <!--        </p>-->
        <p class="wit-flex wit-flex--align-center">
          Steam Guard:
          <b-icon v-if="profile.isGuardProtected" size="is-small" class="is-size-6 wit-color--success wit-offset-left--xxs" icon="shield-check" />
          <b-icon v-else size="is-small" class="is-size-6 wit-color--danger wit-offset-left--xxs" icon="shield-remove" />
        </p>
      </div>

      <div class="wit-flex wit-flex--column">
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
    </div>
  </div>
</template>

<script>
// import Card from '@/components/Card'
import { buildAvatarUrl, buildUserMarketUrl } from '@/utils'

export default {
    name: 'UserView',

    components: {
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
</style>
